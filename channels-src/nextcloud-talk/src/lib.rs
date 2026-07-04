#![allow(dead_code)]

wit_bindgen::generate!({
    world: "sandboxed-channel",
    path: "../../wit/channel.wit",
});

use std::collections::HashMap;

use hmac::{Hmac, Mac};
use rand::RngCore;
use serde::{Deserialize, Serialize};
use sha2::Sha256;

use exports::near::agent::channel::{
    AgentResponse, ChannelConfig, Guest, HttpEndpointConfig, IncomingHttpRequest,
    OutgoingHttpResponse, StatusUpdate,
};
use near::agent::channel_host::{self, EmittedMessage};

type HmacSha256 = Hmac<Sha256>;

const CONFIG_PATH: &str = "state/config.json";

#[derive(Debug, Deserialize, Serialize, Clone, Default)]
struct NextcloudConfig {
    base_url: Option<String>,
    bot_secret: Option<String>,
    backend_allowlist_raw: Option<String>,
    bot_display_name: Option<String>,
    require_mention: Option<bool>,
}

#[derive(Debug, Deserialize)]
struct TalkEvent {
    #[serde(rename = "type")]
    event_type: String,
    #[serde(default)]
    actor: Option<TalkActor>,
    #[serde(default)]
    object: Option<TalkObject>,
    #[serde(default)]
    target: Option<TalkTarget>,
}

#[derive(Debug, Deserialize)]
struct TalkActor {
    #[serde(default)]
    #[serde(rename = "type")]
    actor_type: Option<String>,
    #[serde(default)]
    id: Option<String>,
    #[serde(default)]
    name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkObject {
    #[serde(default)]
    id: Option<String>,
    #[serde(default)]
    name: Option<String>,
    #[serde(default)]
    content: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkTarget {
    #[serde(default)]
    id: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkContent {
    #[serde(default)]
    message: Option<String>,
    #[serde(default)]
    parameters: Option<HashMap<String, TalkParameter>>,
}

#[derive(Debug, Deserialize)]
struct TalkParameter {
    #[serde(default)]
    name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct NextcloudMetadata {
    room_token: String,
    #[serde(default)]
    message_id: Option<u64>,
    #[serde(default)]
    actor_id: Option<String>,
}

struct NextcloudTalkChannel;

impl Guest for NextcloudTalkChannel {
    fn on_start(config_json: String) -> Result<ChannelConfig, String> {
        let config: NextcloudConfig = serde_json::from_str(&config_json).unwrap_or_default();

        if config
            .base_url
            .as_ref()
            .is_none_or(|v| v.trim().is_empty())
        {
            channel_host::log(
                channel_host::LogLevel::Warn,
                "nextcloud-talk: base_url not configured; on_respond will fail",
            );
        }
        if config
            .bot_secret
            .as_ref()
            .is_none_or(|v| v.trim().is_empty())
        {
            channel_host::log(
                channel_host::LogLevel::Warn,
                "nextcloud-talk: bot_secret not configured; webhook auth and replies will fail",
            );
        }

        let to_store = serde_json::to_string(&config).unwrap_or_else(|_| "{}".to_string());
        let _ = channel_host::workspace_write(CONFIG_PATH, &to_store);

        Ok(ChannelConfig {
            display_name: "Nextcloud Talk".to_string(),
            http_endpoints: vec![HttpEndpointConfig {
                path: "/webhook/nextcloud-talk".to_string(),
                methods: vec!["POST".to_string()],
                require_secret: false,
            }],
            poll: None,
        })
    }

    fn on_http_request(req: IncomingHttpRequest) -> OutgoingHttpResponse {
        if req.method != "POST" {
            return json_response(405, serde_json::json!({"error": "Method not allowed"}));
        }

        let config = load_config();
        let bot_secret = match config.bot_secret.as_ref().map(|s| s.trim()) {
            Some(v) if !v.is_empty() => v,
            _ => {
                return json_response(
                    500,
                    serde_json::json!({"error": "Missing bot_secret in channel config"}),
                );
            }
        };

        let headers = parse_headers(&req.headers_json);
        if !backend_allowed(&headers, &config) {
            return json_response(401, serde_json::json!({"error": "Backend origin not allowed"}));
        }

        if !verify_nextcloud_signature(&headers, &req.body, bot_secret) {
            return json_response(401, serde_json::json!({"error": "Invalid Nextcloud signature"}));
        }

        let body_text = match std::str::from_utf8(&req.body) {
            Ok(v) => v,
            Err(_) => {
                return json_response(400, serde_json::json!({"error": "Invalid UTF-8 body"}));
            }
        };

        let event: TalkEvent = match serde_json::from_str(body_text) {
            Ok(v) => v,
            Err(err) => {
                channel_host::log(
                    channel_host::LogLevel::Warn,
                    &format!("nextcloud-talk: failed to parse event: {}", err),
                );
                return json_response(400, serde_json::json!({"error": "Invalid event payload"}));
            }
        };

        if event.event_type != "Create" {
            return json_response(200, serde_json::json!({"ok": true, "ignored": event.event_type}));
        }

        if is_bot_authored(&event) {
            return json_response(200, serde_json::json!({"ok": true, "ignored": "bot-authored"}));
        }

        let room_token = match extract_room_token(&event) {
            Some(v) => v,
            None => {
                return json_response(200, serde_json::json!({"ok": true, "ignored": "missing-room-token"}));
            }
        };

        let raw_content = event
            .object
            .as_ref()
            .and_then(|obj| obj.content.clone())
            .unwrap_or_default();

        let rendered = parse_message_content(&raw_content).trim().to_string();
        if rendered.is_empty() {
            return json_response(200, serde_json::json!({"ok": true, "ignored": "empty-message"}));
        }

        let mention_required = config.require_mention.unwrap_or(true);
        let bot_name = config
            .bot_display_name
            .as_deref()
            .filter(|v| !v.trim().is_empty())
            .unwrap_or("ironclaw");

        if mention_required && !is_mention_for_bot(&rendered, bot_name) {
            return json_response(200, serde_json::json!({"ok": true, "ignored": "no-mention"}));
        }

        let prompt = if mention_required {
            strip_mention(&rendered, bot_name)
        } else {
            rendered.clone()
        };

        let actor_id = event.actor.as_ref().and_then(|a| a.id.clone());
        let actor_name = event.actor.as_ref().and_then(|a| a.name.clone());
        let message_id = event
            .object
            .as_ref()
            .and_then(|obj| obj.id.as_deref())
            .and_then(|id| id.parse::<u64>().ok());

        let metadata = NextcloudMetadata {
            room_token: room_token.clone(),
            message_id,
            actor_id: actor_id.clone(),
        };

        let metadata_json = match serde_json::to_string(&metadata) {
            Ok(v) => v,
            Err(err) => {
                channel_host::log(
                    channel_host::LogLevel::Error,
                    &format!("nextcloud-talk: metadata encode failed: {}", err),
                );
                return json_response(500, serde_json::json!({"error": "metadata encode failed"}));
            }
        };

        channel_host::emit_message(&EmittedMessage {
            user_id: format!(
                "nc:{}",
                actor_id.clone().unwrap_or_else(|| "unknown".to_string())
            ),
            user_name: actor_name,
            content: if prompt.trim().is_empty() {
                rendered
            } else {
                prompt
            },
            thread_id: Some(format!("nextcloud:room:{}", room_token)),
            metadata_json,
            attachments: vec![],
        });

        json_response(200, serde_json::json!({"ok": true, "queued": "create"}))
    }

    fn on_poll() {}

    fn on_respond(response: AgentResponse) -> Result<(), String> {
        let metadata: NextcloudMetadata = serde_json::from_str(&response.metadata_json)
            .map_err(|e| format!("Failed to parse response metadata: {}", e))?;

        let config = load_config();
        let base_url = config
            .base_url
            .as_ref()
            .map(|s| s.trim().trim_end_matches('/').to_string())
            .filter(|s| !s.is_empty())
            .ok_or_else(|| "Missing base_url in channel config".to_string())?;

        let bot_secret = config
            .bot_secret
            .as_ref()
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .ok_or_else(|| "Missing bot_secret in channel config".to_string())?;

        send_bot_message(
            &base_url,
            &bot_secret,
            &metadata.room_token,
            &response.content,
            metadata.message_id,
        )
    }

    fn on_status(_update: StatusUpdate) {}

    fn on_broadcast(_user_id: String, _response: AgentResponse) -> Result<(), String> {
        Err("broadcast not implemented for nextcloud-talk channel".to_string())
    }

    fn on_shutdown() {
        channel_host::log(
            channel_host::LogLevel::Info,
            "nextcloud-talk channel shutting down",
        );
    }
}

fn load_config() -> NextcloudConfig {
    channel_host::workspace_read(CONFIG_PATH)
        .and_then(|raw| serde_json::from_str::<NextcloudConfig>(&raw).ok())
        .unwrap_or_default()
}

fn parse_headers(raw: &str) -> HashMap<String, String> {
    serde_json::from_str::<HashMap<String, String>>(raw)
        .unwrap_or_default()
        .into_iter()
        .map(|(k, v)| (k.to_ascii_lowercase(), v))
        .collect()
}

fn backend_allowed(headers: &HashMap<String, String>, config: &NextcloudConfig) -> bool {
    let Some(raw_allowlist) = config.backend_allowlist_raw.as_ref() else {
        return true;
    };

    let allowlist: Vec<String> = raw_allowlist
        .split(',')
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .map(str::to_ascii_lowercase)
        .collect();

    if allowlist.is_empty() {
        return true;
    }

    let backend = headers
        .get("x-nextcloud-talk-backend")
        .map(|s| s.trim())
        .unwrap_or("");

    if backend.is_empty() {
        return false;
    }

    if let Ok(parsed) = url::Url::parse(backend) {
        if let Some(host) = parsed.host_str() {
            return allowlist.iter().any(|entry| entry == &host.to_ascii_lowercase());
        }
    }

    allowlist.iter().any(|entry| entry == &backend.to_ascii_lowercase())
}

fn verify_nextcloud_signature(
    headers: &HashMap<String, String>,
    body: &[u8],
    bot_secret: &str,
) -> bool {
    let random = match headers.get("x-nextcloud-talk-random") {
        Some(v) if !v.trim().is_empty() => v.trim(),
        _ => return false,
    };

    let signature = match headers.get("x-nextcloud-talk-signature") {
        Some(v) if !v.trim().is_empty() => v.trim().to_ascii_lowercase(),
        _ => return false,
    };

    let mut payload = Vec::with_capacity(random.len() + body.len());
    payload.extend_from_slice(random.as_bytes());
    payload.extend_from_slice(body);

    let expected = hmac_sha256_hex(bot_secret, &payload);
    constant_time_eq_ascii(&expected, &signature)
}

fn hmac_sha256_hex(secret: &str, payload: &[u8]) -> String {
    let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).unwrap_or_else(|_| {
        HmacSha256::new_from_slice(&[]).expect("HMAC can be initialized with empty key")
    });
    mac.update(payload);
    hex::encode(mac.finalize().into_bytes())
}

fn constant_time_eq_ascii(a: &str, b: &str) -> bool {
    if a.len() != b.len() {
        return false;
    }

    let mut diff = 0u8;
    for (x, y) in a.as_bytes().iter().zip(b.as_bytes().iter()) {
        diff |= x ^ y;
    }
    diff == 0
}

fn extract_room_token(event: &TalkEvent) -> Option<String> {
    event.target
        .as_ref()
        .and_then(|v| v.id.clone())
        .or_else(|| event.object.as_ref().and_then(|v| v.id.clone()))
}

fn is_bot_authored(event: &TalkEvent) -> bool {
    let actor_type = event
        .actor
        .as_ref()
        .and_then(|a| a.actor_type.as_ref())
        .map(|s| s.to_ascii_lowercase())
        .unwrap_or_default();
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|a| a.id.as_ref())
        .map(|s| s.to_ascii_lowercase())
        .unwrap_or_default();

    actor_type == "application" || actor_id.starts_with("bots/")
}

fn parse_message_content(content: &str) -> String {
    let parsed: Result<TalkContent, _> = serde_json::from_str(content);
    if let Ok(content_json) = parsed {
        let message = content_json.message.unwrap_or_default();
        if message.is_empty() {
            return String::new();
        }
        return render_parameters(&message, content_json.parameters.unwrap_or_default());
    }
    content.to_string()
}

fn render_parameters(message: &str, parameters: HashMap<String, TalkParameter>) -> String {
    let mut rendered = String::with_capacity(message.len());
    let mut chars = message.chars().peekable();

    while let Some(ch) = chars.next() {
        if ch == '{' {
            let mut key = String::new();
            while let Some(next) = chars.peek().copied() {
                chars.next();
                if next == '}' {
                    break;
                }
                key.push(next);
            }
            if let Some(value) = parameters.get(&key).and_then(|p| p.name.as_ref()) {
                rendered.push_str(value);
            } else {
                rendered.push('{');
                rendered.push_str(&key);
                rendered.push('}');
            }
            continue;
        }
        rendered.push(ch);
    }

    rendered
}

fn is_mention_for_bot(text: &str, bot_name: &str) -> bool {
    let lower_text = text.to_ascii_lowercase();
    let lower_bot = bot_name.to_ascii_lowercase();
    lower_text.contains(&format!("@{}", lower_bot)) || lower_text.contains(&lower_bot)
}

fn strip_mention(text: &str, bot_name: &str) -> String {
    let mut cleaned = text.replace(&format!("@{}", bot_name), "");
    cleaned = cleaned.replace(&format!("@{}", bot_name.to_ascii_lowercase()), "");
    cleaned = cleaned.replace(bot_name, "");
    cleaned.trim().to_string()
}

fn send_bot_message(
    base_url: &str,
    bot_secret: &str,
    room_token: &str,
    message: &str,
    reply_to: Option<u64>,
) -> Result<(), String> {
    let endpoint = format!(
        "{}/ocs/v2.php/apps/spreed/api/v1/bot/{}/message",
        base_url, room_token
    );

    let payload = if let Some(reply_to) = reply_to {
        serde_json::json!({
            "message": message,
            "replyTo": reply_to,
        })
    } else {
        serde_json::json!({
            "message": message,
        })
    };

    let payload_bytes = serde_json::to_vec(&payload)
        .map_err(|e| format!("Failed to serialize Nextcloud payload: {}", e))?;

    let mut random_bytes = [0u8; 32];
    rand::thread_rng().fill_bytes(&mut random_bytes);
    let random = hex::encode(random_bytes);

    let mut signature_payload = Vec::with_capacity(random.len() + payload_bytes.len());
    signature_payload.extend_from_slice(random.as_bytes());
    signature_payload.extend_from_slice(&payload_bytes);
    let signature = hmac_sha256_hex(bot_secret, &signature_payload);

    let headers = serde_json::json!({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "OCS-APIRequest": "true",
        "X-Nextcloud-Talk-Bot-Random": random,
        "X-Nextcloud-Talk-Bot-Signature": signature,
    });

    let response = channel_host::http_request(
        "POST",
        &endpoint,
        &headers.to_string(),
        Some(&payload_bytes),
        None,
    )
    .map_err(|e| format!("Nextcloud send request failed: {}", e))?;

    if response.status >= 200 && response.status < 300 {
        return Ok(());
    }

    let body = String::from_utf8_lossy(&response.body);
    Err(format!(
        "Nextcloud bot send failed: HTTP {} {}",
        response.status, body
    ))
}

fn json_response(status: u16, body: serde_json::Value) -> OutgoingHttpResponse {
    let bytes = serde_json::to_vec(&body).unwrap_or_else(|_| b"{}".to_vec());
    OutgoingHttpResponse {
        status,
        headers_json: r#"{"Content-Type":"application/json"}"#.to_string(),
        body: bytes,
    }
}

export!(NextcloudTalkChannel);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn renders_parameterized_message() {
        let input = r#"{"message":"Hi {user}","parameters":{"user":{"name":"Marten"}}}"#;
        assert_eq!(parse_message_content(input), "Hi Marten");
    }

    #[test]
    fn signature_hash_matches_for_known_input() {
        let sig = hmac_sha256_hex("secret", b"abcd");
        assert_eq!(sig, "3057ecbaeceffb90b97394a97267236eca9f9e5520dfe387831a22a0eb7709d2");
    }
}
