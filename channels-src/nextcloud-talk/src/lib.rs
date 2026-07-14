#![allow(dead_code)]

wit_bindgen::generate!({
    world: "product-adapter-component",
    path: "../../crates/ironclaw_wasm_product_adapters/wit/product_adapter.wit",
});

use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use exports::near::product_adapter::product_adapter::{
    AdapterManifest, AuthEvidence, AuthRequirement, AuthRequirementKind, DeclaredEgressTarget,
    Guest, OutboundEnvelope, OutboundRender, ParsedInbound,
};

const ADAPTER_ID: &str = "nextcloud_talk";
const INSTALLATION_ID: &str = "nextcloud_talk_default";
const DEFAULT_BOT_NAME: &str = "ironclaw";

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

struct NextcloudTalkAdapter;

impl Guest for NextcloudTalkAdapter {
    fn manifest() -> AdapterManifest {
        let capabilities_json = serde_json::json!({
            "flags": [
                "inbound_messages",
                "external_final_reply_push",
                "delivery_status_reporting"
            ]
        })
        .to_string();

        AdapterManifest {
            adapter_id: ADAPTER_ID.to_string(),
            installation_id: INSTALLATION_ID.to_string(),
            capabilities_json,
            declared_egress_targets: vec![DeclaredEgressTarget {
                host: "nextcloud.local".to_string(),
                credential_handle: Some("nextcloud_talk_app_password".to_string()),
            }],
            declared_auth_requirements: vec![AuthRequirement {
                kind: AuthRequirementKind::RequestSignature,
                header_name: Some("X-Nextcloud-Talk-Signature".to_string()),
                timestamp_header_name: Some("X-Nextcloud-Talk-Random".to_string()),
                cookie_name: None,
            }],
        }
    }

    fn parse_inbound(raw_payload: Vec<u8>, _evidence: AuthEvidence) -> Result<ParsedInbound, String> {
        let body_text = std::str::from_utf8(&raw_payload)
            .map_err(|_| "nextcloud-talk: inbound payload is not valid UTF-8".to_string())?;

        let event: TalkEvent = serde_json::from_str(body_text)
            .map_err(|err| format!("nextcloud-talk: failed to parse event payload: {err}"))?;

        let parsed = if event.event_type != "Create" || is_bot_authored(&event) {
            build_noop_inbound(&event)?
        } else {
            let room_token = match extract_room_token(&event) {
                Some(v) => v,
                None => return Ok(ParsedInbound { parsed_json: build_noop_inbound(&event)? }),
            };

            let raw_content = event
                .object
                .as_ref()
                .and_then(|obj| obj.content.clone())
                .unwrap_or_default();

            let rendered = parse_message_content(&raw_content).trim().to_string();
            if rendered.is_empty() {
                return Ok(ParsedInbound { parsed_json: build_noop_inbound(&event)? });
            }

            let prompt = sanitize_prompt(&rendered, DEFAULT_BOT_NAME);
            let text = if prompt.is_empty() { rendered } else { prompt };
            build_user_message_inbound(&event, room_token, text)?
        };

        Ok(ParsedInbound {
            parsed_json: parsed,
        })
    }

    fn render_outbound(envelope: OutboundEnvelope) -> Result<OutboundRender, String> {
        let parsed: serde_json::Value = serde_json::from_str(&envelope.outbound_json)
            .map_err(|err| format!("nextcloud-talk: outbound envelope JSON is invalid: {err}"))?;

        let payload = parsed
            .get("payload")
            .ok_or_else(|| "nextcloud-talk: outbound envelope missing payload".to_string())?;

        if payload == "keep_alive" {
            return Ok(OutboundRender {
                egress_request_json: serde_json::json!({
                    "egress_target_index": 0,
                    "method": "POST",
                    "path": "/ocs/v2.php/apps/spreed/api/v1/bot/noop/message",
                    "headers": [],
                    "body": []
                })
                .to_string(),
            });
        }

        let final_reply = payload
            .get("final_reply")
            .ok_or_else(|| "nextcloud-talk: payload is not final_reply".to_string())?;
        let text = final_reply
            .get("text")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "nextcloud-talk: final_reply payload missing text".to_string())?;

        let target = parsed
            .get("target")
            .ok_or_else(|| "nextcloud-talk: outbound envelope missing target".to_string())?;
        let conversation = target
            .get("external_conversation_ref")
            .ok_or_else(|| "nextcloud-talk: target missing external_conversation_ref".to_string())?;
        let room_token = conversation
            .get("conversation_id")
            .and_then(|v| v.as_str())
            .ok_or_else(|| "nextcloud-talk: missing room token in conversation_id".to_string())?;

        let reply_to = conversation
            .get("reply_target_message_id")
            .and_then(|v| v.as_str())
            .and_then(|v| v.parse::<u64>().ok())
            .unwrap_or(0);

        let body_value = serde_json::json!({ "message": text, "replyTo": reply_to });
        let body = serde_json::to_vec(&body_value)
            .map_err(|err| format!("nextcloud-talk: failed to encode outbound body: {err}"))?;

        let path = format!("/ocs/v2.php/apps/spreed/api/v1/chat/{room_token}");
        let request = serde_json::json!({
            "egress_target_index": 0,
            "method": "POST",
            "path": path,
            "headers": [
                { "name": "Content-Type", "value": "application/json" },
                { "name": "Accept", "value": "application/json" },
                { "name": "OCS-APIRequest", "value": "true" }
            ],
            "body": body
        });

        Ok(OutboundRender {
            egress_request_json: request.to_string(),
        })
    }
}

#[derive(Debug, Serialize)]
struct ParsedInboundJson {
    external_event_id: String,
    external_actor_ref: ExternalActorRefJson,
    external_conversation_ref: ExternalConversationRefJson,
    payload: InboundPayloadJson,
}

#[derive(Debug, Serialize)]
struct ExternalActorRefJson {
    kind: String,
    id: String,
    display_name: Option<String>,
}

#[derive(Debug, Serialize)]
struct ExternalConversationRefJson {
    space_id: Option<String>,
    conversation_id: String,
    topic_id: Option<String>,
    reply_target_message_id: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
enum InboundPayloadJson {
    UserMessage(UserMessagePayloadJson),
    NoOp,
}

#[derive(Debug, Serialize)]
struct UserMessagePayloadJson {
    text: String,
    attachments: Vec<serde_json::Value>,
    trigger: TriggerReasonJson,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
enum TriggerReasonJson {
    DirectChat,
    BotMention,
}

fn build_noop_inbound(event: &TalkEvent) -> Result<String, String> {
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|a| non_empty_trimmed(a.id.as_deref()))
        .unwrap_or_else(|| "unknown-actor".to_string());
    let room_token = extract_room_token(event).unwrap_or_else(|| "unknown-room".to_string());
    let event_id = event
        .object
        .as_ref()
        .and_then(|obj| non_empty_trimmed(obj.id.as_deref()))
        .unwrap_or_else(|| format!("event:{}:{room_token}:{actor_id}", event.event_type));

    let payload = ParsedInboundJson {
        external_event_id: event_id,
        external_actor_ref: ExternalActorRefJson {
            kind: "nextcloud_user".to_string(),
            id: actor_id,
            display_name: event
                .actor
                .as_ref()
                .and_then(|a| non_empty_trimmed(a.name.as_deref())),
        },
        external_conversation_ref: ExternalConversationRefJson {
            space_id: None,
            conversation_id: room_token,
            topic_id: None,
            reply_target_message_id: None,
        },
        payload: InboundPayloadJson::NoOp,
    };
    serde_json::to_string(&payload)
        .map_err(|err| format!("nextcloud-talk: failed to encode no-op inbound payload: {err}"))
}

fn build_user_message_inbound(
    event: &TalkEvent,
    room_token: String,
    text: String,
) -> Result<String, String> {
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|a| non_empty_trimmed(a.id.as_deref()))
        .unwrap_or_else(|| "unknown-actor".to_string());
    let message_id = event
        .object
        .as_ref()
        .and_then(|obj| non_empty_trimmed(obj.id.as_deref()));
    let event_id = message_id
        .clone()
        .unwrap_or_else(|| format!("create:{room_token}:{actor_id}"));

    let payload = ParsedInboundJson {
        external_event_id: event_id,
        external_actor_ref: ExternalActorRefJson {
            kind: "nextcloud_user".to_string(),
            id: actor_id,
            display_name: event
                .actor
                .as_ref()
                .and_then(|a| non_empty_trimmed(a.name.as_deref())),
        },
        external_conversation_ref: ExternalConversationRefJson {
            space_id: None,
            conversation_id: room_token,
            topic_id: None,
            reply_target_message_id: message_id,
        },
        payload: InboundPayloadJson::UserMessage(UserMessagePayloadJson {
            text,
            attachments: vec![],
            trigger: TriggerReasonJson::DirectChat,
        }),
    };
    serde_json::to_string(&payload)
        .map_err(|err| format!("nextcloud-talk: failed to encode parsed inbound payload: {err}"))
}

fn extract_room_token(event: &TalkEvent) -> Option<String> {
    event.target
        .as_ref()
        .and_then(|v| non_empty_trimmed(v.id.as_deref()))
        .or_else(|| event.object.as_ref().and_then(|v| non_empty_trimmed(v.id.as_deref())))
}

fn non_empty_trimmed(value: Option<&str>) -> Option<String> {
    value
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(str::to_string)
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

fn mention_token(bot_name: &str) -> Option<String> {
    let trimmed = bot_name.trim();
    if trimmed.is_empty() {
        return None;
    }
    Some(format!("@{trimmed}"))
}

fn sanitize_prompt(text: &str, bot_name: &str) -> String {
    let stripped_bot_prefix = strip_leading_bot_addressing(text, bot_name);
    let stripped_mentions = strip_leading_mentions(&stripped_bot_prefix);
    strip_leading_bot_addressing(&stripped_mentions, bot_name)
        .trim()
        .to_string()
}

fn strip_leading_bot_addressing(text: &str, bot_name: &str) -> String {
    let trimmed = text.trim();
    if trimmed.is_empty() {
        return String::new();
    }

    let mut prefixes = Vec::new();
    if let Some(token) = mention_token(bot_name) {
        prefixes.push(token);
    }
    let normalized = bot_name.trim().replace(['_', '-'], " ");
    if !normalized.trim().is_empty() {
        prefixes.push(normalized.trim().to_string());
    }

    for prefix in prefixes {
        if let Some(stripped) = strip_prefix_case_insensitive(trimmed, &prefix) {
            return stripped
                .trim_start_matches(|ch: char| ch.is_whitespace() || matches!(ch, ':' | ',' | '-'))
                .trim()
                .to_string();
        }
    }

    trimmed.to_string()
}

fn strip_leading_mentions(text: &str) -> String {
    let mut current = text.trim();
    loop {
        let Some(rest) = current.strip_prefix('@') else {
            break;
        };
        let boundary = rest.find(char::is_whitespace).unwrap_or(rest.len());
        current = rest[boundary..].trim_start();
        if current.is_empty() {
            break;
        }
    }
    current.to_string()
}

fn strip_prefix_case_insensitive<'a>(value: &'a str, prefix: &str) -> Option<&'a str> {
    let prefix_len = prefix.len();
    if value.len() < prefix_len {
        return None;
    }
    let head = value.get(..prefix_len)?;
    if head.eq_ignore_ascii_case(prefix) {
        value.get(prefix_len..)
    } else {
        None
    }
}

export!(NextcloudTalkAdapter);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn renders_parameterized_message() {
        let input = r#"{"message":"Hi {user}","parameters":{"user":{"name":"Marten"}}}"#;
        assert_eq!(parse_message_content(input), "Hi Marten");
    }

    #[test]
    fn strips_mentions() {
        assert_eq!(sanitize_prompt("@ironclaw hello", "ironclaw"), "hello");
        assert_eq!(
            sanitize_prompt("@KI Gerda @ki_assistant Hallo", "KI Gerda"),
            "Hallo"
        );
    }

    #[test]
    fn render_outbound_sets_ocs_and_json_headers() {
        let envelope = OutboundEnvelope {
            outbound_json: serde_json::json!({
                "payload": {
                    "final_reply": {
                        "text": "Hello from Ironclaw"
                    }
                },
                "target": {
                    "external_conversation_ref": {
                        "conversation_id": "room-alpha",
                        "reply_target_message_id": "123"
                    }
                }
            })
            .to_string(),
        };

        let rendered = NextcloudTalkAdapter::render_outbound(envelope).expect("render outbound");
        let payload: serde_json::Value =
            serde_json::from_str(&rendered.egress_request_json).expect("rendered json");

        let headers = payload
            .get("headers")
            .and_then(serde_json::Value::as_array)
            .expect("headers array");

        assert!(headers.iter().any(|h| {
            h.get("name").and_then(serde_json::Value::as_str) == Some("Content-Type")
                && h.get("value").and_then(serde_json::Value::as_str)
                    == Some("application/json")
        }));
        assert!(headers.iter().any(|h| {
            h.get("name").and_then(serde_json::Value::as_str) == Some("Accept")
                && h.get("value").and_then(serde_json::Value::as_str)
                    == Some("application/json")
        }));
        assert!(headers.iter().any(|h| {
            h.get("name").and_then(serde_json::Value::as_str) == Some("OCS-APIRequest")
                && h.get("value").and_then(serde_json::Value::as_str) == Some("true")
        }));
    }

    #[test]
    fn render_outbound_reply_to_defaults_to_zero_without_message_id() {
        let envelope = OutboundEnvelope {
            outbound_json: serde_json::json!({
                "payload": {
                    "final_reply": {
                        "text": "Hello from Ironclaw"
                    }
                },
                "target": {
                    "external_conversation_ref": {
                        "conversation_id": "room-alpha"
                    }
                }
            })
            .to_string(),
        };

        let rendered = NextcloudTalkAdapter::render_outbound(envelope).expect("render outbound");
        let payload: serde_json::Value =
            serde_json::from_str(&rendered.egress_request_json).expect("rendered json");
        let body = payload
            .get("body")
            .and_then(serde_json::Value::as_array)
            .expect("body bytes");

        let bytes = body
            .iter()
            .map(|v| v.as_u64().expect("byte") as u8)
            .collect::<Vec<_>>();
        let body_json: serde_json::Value = serde_json::from_slice(&bytes).expect("body json");
        assert_eq!(body_json.get("replyTo"), Some(&serde_json::Value::from(0_u64)));
    }
}
