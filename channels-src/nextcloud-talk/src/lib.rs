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
    #[serde(alias = "eventId")]
    event_id: Option<String>,
    #[serde(default)]
    actor: Option<TalkActor>,
    #[serde(default)]
    object: Option<TalkObject>,
    #[serde(default)]
    target: Option<TalkTarget>,
    #[serde(default)]
    #[serde(alias = "bridgeMessage")]
    bridge_message: Option<TalkBridgeMessage>,
    #[serde(default)]
    reply_context: Option<serde_json::Value>,
    #[serde(default)]
    reaction: Option<TalkReaction>,
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
    #[serde(default)]
    #[serde(alias = "replyTo")]
    reply_to: Option<u64>,
    #[serde(default)]
    attachments: Option<Vec<serde_json::Value>>,
    #[serde(default)]
    #[serde(alias = "attachmentErrors")]
    attachment_errors: Option<Vec<serde_json::Value>>,
    #[serde(default)]
    #[serde(alias = "replyContext")]
    reply_context: Option<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
struct TalkTarget {
    #[serde(default)]
    id: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkBridgeMessage {
    #[serde(default)]
    raw: Option<String>,
    #[serde(default)]
    attachments: Option<Vec<serde_json::Value>>,
    #[serde(default)]
    #[serde(alias = "attachmentErrors")]
    attachment_errors: Option<Vec<serde_json::Value>>,
    #[serde(default)]
    #[serde(alias = "replyContext")]
    reply_context: Option<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
struct TalkReaction {
    #[serde(default)]
    emoji: Option<String>,
    #[serde(default)]
    #[serde(alias = "eventType")]
    event_type: Option<String>,
    #[serde(default)]
    #[serde(alias = "targetMessageId")]
    target_message_id: Option<u64>,
    #[serde(default)]
    semantic: Option<String>,
    #[serde(default)]
    #[serde(alias = "uiAction")]
    ui_action: Option<String>,
    #[serde(default)]
    #[serde(alias = "requiresAuthorization")]
    requires_authorization: Option<bool>,
    #[serde(default)]
    #[serde(alias = "isAuthorized")]
    is_authorized: Option<bool>,
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

        let parsed = match event.event_type.as_str() {
            "Create" => {
                if is_bot_authored(&event) {
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
                        .or_else(|| {
                            event
                                .bridge_message
                                .as_ref()
                                .and_then(|bridge| bridge.raw.clone())
                        })
                        .unwrap_or_default();

                    let rendered = parse_message_content(&raw_content).trim().to_string();
                    let mut attachments = extract_attachments(&event);
                    if let Some(reply_context) = extract_reply_context(&event) {
                        attachments.push(reply_context);
                    }

                    if rendered.is_empty() && attachments.is_empty() {
                        return Ok(ParsedInbound { parsed_json: build_noop_inbound(&event)? });
                    }

                    let prompt = sanitize_prompt(&rendered, DEFAULT_BOT_NAME);
                    let text = if !prompt.is_empty() {
                        prompt
                    } else if !rendered.is_empty() {
                        rendered
                    } else {
                        "Please analyze the provided attachment context.".to_string()
                    };

                    build_user_message_inbound(&event, room_token, text, attachments)?
                }
            }
            "ReactionAdded" | "ReactionRemoved" => {
                if is_bot_authored(&event) {
                    build_noop_inbound(&event)?
                } else {
                    let room_token = match extract_room_token(&event) {
                        Some(v) => v,
                        None => return Ok(ParsedInbound { parsed_json: build_noop_inbound(&event)? }),
                    };
                    build_reaction_inbound(&event, room_token)?
                }
            }
            _ => build_noop_inbound(&event)?,
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
        .event_id
        .clone()
        .or_else(|| {
            event
                .object
                .as_ref()
                .and_then(|obj| non_empty_trimmed(obj.id.as_deref()))
        })
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
    attachments: Vec<serde_json::Value>,
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
    let event_id = event
        .event_id
        .clone()
        .or_else(|| message_id.clone())
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
            attachments,
            trigger: TriggerReasonJson::DirectChat,
        }),
    };
    serde_json::to_string(&payload)
        .map_err(|err| format!("nextcloud-talk: failed to encode parsed inbound payload: {err}"))
}

fn build_reaction_inbound(event: &TalkEvent, room_token: String) -> Result<String, String> {
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|a| non_empty_trimmed(a.id.as_deref()))
        .unwrap_or_else(|| "unknown-actor".to_string());

    let message_id = event
        .object
        .as_ref()
        .and_then(|obj| non_empty_trimmed(obj.id.as_deref()))
        .unwrap_or_else(|| "0".to_string());

    let reaction = event.reaction.as_ref();
    let emoji = reaction
        .and_then(|r| non_empty_trimmed(r.emoji.as_deref()))
        .unwrap_or_else(|| "?".to_string());
    let semantic = reaction
        .and_then(|r| non_empty_trimmed(r.semantic.as_deref()))
        .unwrap_or_else(|| "reaction_event".to_string());
    let ui_action = reaction
        .and_then(|r| non_empty_trimmed(r.ui_action.as_deref()))
        .unwrap_or_else(|| "informational".to_string());
    let requires_authorization = reaction
        .and_then(|r| r.requires_authorization)
        .unwrap_or(false);
    let is_authorized = reaction.and_then(|r| r.is_authorized).unwrap_or(true);
    let event_type = reaction
        .and_then(|r| non_empty_trimmed(r.event_type.as_deref()))
        .unwrap_or_else(|| event.event_type.clone());
    let target_message_id = reaction
        .and_then(|r| r.target_message_id)
        .unwrap_or(0);

    let text = match semantic.as_str() {
        "helpful_feedback" => "User marked the bot answer as helpful (thumbs up).".to_string(),
        "needs_rephrase" => {
            "User gave thumbs down. Offer a rephrased answer or a different focus.".to_string()
        }
        "regenerate_same_context" => "User requested regeneration with the same context.".to_string(),
        "human_approved" => {
            if is_authorized {
                "Authorized human approval received for the pending action.".to_string()
            } else {
                "A non-authorized actor attempted to approve a pending action.".to_string()
            }
        }
        "human_not_approved" => {
            if is_authorized {
                "Authorized human rejection received for the pending action.".to_string()
            } else {
                "A non-authorized actor attempted to reject a pending action.".to_string()
            }
        }
        "escalation_flag" => "User requested escalation or human review for this response.".to_string(),
        _ => format!("Reaction event received: {emoji}"),
    };

    let payload = ParsedInboundJson {
        external_event_id: event
            .event_id
            .clone()
            .or_else(|| event.object.as_ref().and_then(|obj| non_empty_trimmed(obj.id.as_deref())))
            .unwrap_or_else(|| format!("reaction:{room_token}:{actor_id}:{emoji}")),
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
            reply_target_message_id: Some(message_id),
        },
        payload: InboundPayloadJson::UserMessage(UserMessagePayloadJson {
            text,
            attachments: vec![serde_json::json!({
                "kind": "reaction_signal",
                "emoji": emoji,
                "semantic": semantic,
                "ui_action": ui_action,
                "event_type": event_type,
                "requires_authorization": requires_authorization,
                "is_authorized": is_authorized,
                "target_message_id": target_message_id
            })],
            trigger: TriggerReasonJson::DirectChat,
        }),
    };

    serde_json::to_string(&payload)
        .map_err(|err| format!("nextcloud-talk: failed to encode reaction inbound payload: {err}"))
}

fn extract_attachments(event: &TalkEvent) -> Vec<serde_json::Value> {
    let mut items = Vec::new();
    if let Some(object_attachments) = event
        .object
        .as_ref()
        .and_then(|obj| obj.attachments.as_ref())
    {
        items.extend(object_attachments.iter().cloned());
    }
    if let Some(bridge_attachments) = event
        .bridge_message
        .as_ref()
        .and_then(|bridge| bridge.attachments.as_ref())
    {
        items.extend(bridge_attachments.iter().cloned());
    }
    if let Some(object_errors) = event
        .object
        .as_ref()
        .and_then(|obj| obj.attachment_errors.as_ref())
    {
        items.extend(
            object_errors
                .iter()
                .cloned()
                .map(|value| serde_json::json!({ "kind": "attachment_error", "value": value })),
        );
    }
    if let Some(bridge_errors) = event
        .bridge_message
        .as_ref()
        .and_then(|bridge| bridge.attachment_errors.as_ref())
    {
        items.extend(
            bridge_errors
                .iter()
                .cloned()
                .map(|value| serde_json::json!({ "kind": "attachment_error", "value": value })),
        );
    }
    items
}

fn extract_reply_context(event: &TalkEvent) -> Option<serde_json::Value> {
    let value = event
        .reply_context
        .as_ref()
        .or_else(|| {
            event
                .object
                .as_ref()
                .and_then(|object| object.reply_context.as_ref())
        })
        .or_else(|| {
            event
                .bridge_message
                .as_ref()
                .and_then(|bridge| bridge.reply_context.as_ref())
        })
        .cloned()
        .or_else(|| {
            event.object.as_ref().and_then(|object| {
                object
                    .reply_to
                    .map(|reply_to| serde_json::json!({ "parentMessageId": reply_to }))
            })
        })?;

    Some(serde_json::json!({
        "kind": "reply_context",
        "value": value,
    }))
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

    #[test]
    fn extracts_reply_context_from_reply_to_fallback() {
        let event: TalkEvent = serde_json::from_str(
            r#"{
                "type": "Create",
                "object": {
                    "id": "10",
                    "replyTo": 42
                }
            }"#,
        )
        .expect("event json");

        let context = extract_reply_context(&event).expect("reply context");
        assert_eq!(context.get("kind").and_then(serde_json::Value::as_str), Some("reply_context"));
        assert_eq!(
            context
                .get("value")
                .and_then(|value| value.get("parentMessageId"))
                .and_then(serde_json::Value::as_u64),
            Some(42)
        );
    }

    #[test]
    fn extracts_attachments_from_object_and_bridge_message() {
        let event: TalkEvent = serde_json::from_str(
            r#"{
                "type": "Create",
                "object": {
                    "id": "10",
                    "attachments": [{"name": "report.pdf"}]
                },
                "bridgeMessage": {
                    "attachments": [{"name": "image.png"}]
                }
            }"#,
        )
        .expect("event json");

        let attachments = extract_attachments(&event);
        assert_eq!(attachments.len(), 2);
        assert_eq!(
            attachments[0].get("name").and_then(serde_json::Value::as_str),
            Some("report.pdf")
        );
        assert_eq!(
            attachments[1].get("name").and_then(serde_json::Value::as_str),
            Some("image.png")
        );
    }

    #[test]
    fn maps_attachment_errors_into_attachment_context() {
        let event: TalkEvent = serde_json::from_str(
            r#"{
                "type": "Create",
                "object": {
                    "id": "10",
                    "attachmentErrors": [{"code": "attachment_too_large"}]
                }
            }"#,
        )
        .expect("event json");

        let attachments = extract_attachments(&event);
        assert_eq!(attachments.len(), 1);
        assert_eq!(
            attachments[0].get("kind").and_then(serde_json::Value::as_str),
            Some("attachment_error")
        );
        assert_eq!(
            attachments[0]
                .get("value")
                .and_then(|v| v.get("code"))
                .and_then(serde_json::Value::as_str),
            Some("attachment_too_large")
        );
    }

    #[test]
    fn builds_reaction_signal_attachment() {
        let event: TalkEvent = serde_json::from_str(
            r#"{
                "type": "ReactionAdded",
                "eventId": "ev-r-1",
                "actor": {"id": "alice", "name": "Alice"},
                "object": {"id": "19"},
                "target": {"id": "room-alpha"},
                "reaction": {
                    "emoji": "👎",
                    "semantic": "needs_rephrase",
                    "uiAction": "offer_rephrase",
                    "eventType": "ReactionAdded",
                    "targetMessageId": 19,
                    "requiresAuthorization": false,
                    "isAuthorized": true
                }
            }"#,
        )
        .expect("event json");

        let parsed = build_reaction_inbound(&event, "room-alpha".to_string()).expect("reaction inbound");
        let payload: serde_json::Value = serde_json::from_str(&parsed).expect("payload json");
        assert_eq!(payload.get("external_event_id"), Some(&serde_json::Value::from("ev-r-1")));
        assert_eq!(
            payload
                .get("payload")
                .and_then(|v| v.get("user_message"))
                .and_then(|v| v.get("attachments"))
                .and_then(serde_json::Value::as_array)
                .and_then(|arr| arr.first())
                .and_then(|v| v.get("semantic"))
                .and_then(serde_json::Value::as_str),
            Some("needs_rephrase")
        );
    }
}
