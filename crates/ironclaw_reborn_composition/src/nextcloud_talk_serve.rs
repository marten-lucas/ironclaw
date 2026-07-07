use std::num::{NonZeroU32, NonZeroU64};
use std::sync::Arc;

use async_trait::async_trait;
use axum::{
    Json, Router,
    body::Bytes,
    extract::State,
    http::{HeaderMap, StatusCode},
    response::{IntoResponse, Response},
    routing::post,
};
use chrono::Utc;
use hmac::{Hmac, Mac};
use ironclaw_conversations::InMemoryConversationServices;
use ironclaw_host_api::{AgentId, NetworkMethod, ProjectId, TenantId, UserId};
use ironclaw_host_api::ingress::{
    AllowedEffectPath, AuditTraceClass, BodyLimitPolicy, CorsPolicy, IngressAuthPolicy,
    IngressAuthScheme, IngressPolicy, IngressPolicyParts, IngressRouteDescriptor,
    IngressScopeSource, ListenerClass, RateLimitPolicy, RateLimitScope, StreamingMode,
    WebSocketOriginPolicy,
};
use ironclaw_product_adapters::auth::mark_request_signature_verified;
use ironclaw_product_adapters::external::{
    ExternalActorRef, ExternalConversationRef, ExternalEventId,
};
use ironclaw_product_adapters::identity::{AdapterInstallationId, ProductAdapterId};
use ironclaw_product_adapters::inbound::{
    ParsedProductInbound, ProductInboundEnvelope, ProductInboundPayload, TrustedInboundContext,
    UserMessagePayload,
};
use ironclaw_product_adapters::{ProductTriggerReason, ProductWorkflow};
use ironclaw_product_workflow::{
    DefaultInboundTurnService, DefaultProductWorkflow, InMemoryIdempotencyLedger,
    ProductActorUserResolutionRequest, ProductActorUserResolver, ProductConversationBindingService,
    ProductInstallationKey, ProductInstallationScope, ProductWorkflowError,
    StaticProductInstallationResolver,
};
use regex::Regex;
use secrecy::{ExposeSecret, SecretString};
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use subtle::ConstantTimeEq;
use thiserror::Error;

use crate::RebornRuntime;
use crate::webui_serve::PublicRouteMount;

const NEXTCLOUD_SIGNATURE_HEADER: &str = "X-Nextcloud-Talk-Signature";
const NEXTCLOUD_RANDOM_HEADER: &str = "X-Nextcloud-Talk-Random";
const NEXTCLOUD_ROUTE_ID: &str = "nextcloud_talk.events";
const NEXTCLOUD_BODY_LIMIT_BYTES: NonZeroU64 = NonZeroU64::new(512 * 1024).unwrap();
const NEXTCLOUD_MAX_REQUESTS: NonZeroU32 = NonZeroU32::new(6_000).unwrap();
const NEXTCLOUD_RATE_WINDOW_SECONDS: NonZeroU32 = NonZeroU32::new(60).unwrap();

type HmacSha256 = Hmac<Sha256>;

#[derive(Clone)]
pub struct NextcloudTalkRouteConfig {
    pub tenant_id: TenantId,
    pub agent_id: AgentId,
    pub project_id: Option<ProjectId>,
    pub user_id: UserId,
    pub extension_id: String,
    pub webhook_path: String,
    pub bot_name: String,
    pub mention_regex: Option<String>,
    pub shared_secret: SecretString,
}

#[derive(Debug, Error)]
pub enum NextcloudTalkBuildError {
    #[error("nextcloud talk route requires local runtime services")]
    DurableHostStateUnavailable,
    #[error("invalid nextcloud configuration ({field}): {reason}")]
    InvalidConfig { field: &'static str, reason: String },
}

pub fn build_nextcloud_talk_route_mount(
    runtime: &RebornRuntime,
    config: NextcloudTalkRouteConfig,
) -> Result<PublicRouteMount, NextcloudTalkBuildError> {
    let _local_runtime = runtime
        .services()
        .local_runtime
        .as_ref()
        .ok_or(NextcloudTalkBuildError::DurableHostStateUnavailable)?;

    let adapter_id = ProductAdapterId::new(&format!("{}/inbound", config.extension_id)).map_err(
        |err| NextcloudTalkBuildError::InvalidConfig {
            field: "extension_id",
            reason: err.to_string(),
        },
    )?;
    let installation_id = AdapterInstallationId::new(config.extension_id.clone()).map_err(|err| {
        NextcloudTalkBuildError::InvalidConfig {
            field: "extension_id",
            reason: format!("invalid installation id from extension id: {err}"),
        }
    })?;

    let conversations = Arc::new(InMemoryConversationServices::default());
    let conversation_port: Arc<dyn ironclaw_conversations::ConversationBindingService> =
        conversations.clone();
    let actor_pairings: Arc<dyn ironclaw_conversations::ConversationActorPairingService> =
        conversations.clone();

    let scope = ProductInstallationScope::with_default_scope(
        config.tenant_id.clone(),
        config.agent_id.clone(),
        config.project_id.clone(),
    )
    .with_default_subject_user_id(config.user_id.clone())
    .with_actor_user_resolver(
        Arc::new(StaticNextcloudActorResolver::new(config.user_id.clone())),
        actor_pairings,
    );
    let installation_resolver = StaticProductInstallationResolver::new([(
        ProductInstallationKey::new(adapter_id.clone(), installation_id.clone()),
        scope,
    )]);
    let binding = ProductConversationBindingService::new(conversation_port, installation_resolver);

    let workflow_binding = binding.clone();

    let inbound = Arc::new(DefaultInboundTurnService::new(
        binding,
        runtime.webui_thread_service(),
        runtime.webui_turn_coordinator(),
    ));
    let workflow: Arc<dyn ProductWorkflow> = Arc::new(DefaultProductWorkflow::new(
        inbound,
        Arc::new(InMemoryIdempotencyLedger::default()),
        Arc::new(workflow_binding),
    ));

    let mention_regex = config
        .mention_regex
        .as_ref()
        .map(|value| {
            Regex::new(value).map_err(|err| NextcloudTalkBuildError::InvalidConfig {
                field: "mention_regex",
                reason: err.to_string(),
            })
        })
        .transpose()?;

    let state = NextcloudTalkRouteState {
        adapter_id,
        installation_id,
        workflow,
        webhook_path: config.webhook_path.clone(),
        bot_name: config.bot_name,
        mention_regex,
        shared_secret: config.shared_secret,
    };

    let descriptor = IngressRouteDescriptor::new(
        NEXTCLOUD_ROUTE_ID,
        NetworkMethod::Post,
        &config.webhook_path,
        nextcloud_talk_policy(),
    )
    .map_err(|err| NextcloudTalkBuildError::InvalidConfig {
        field: "webhook_path",
        reason: err.to_string(),
    })?;

    Ok(PublicRouteMount::new(
        Router::new()
            .route(&config.webhook_path, post(nextcloud_talk_handler))
            .with_state(state),
        vec![descriptor],
    ))
}

#[derive(Clone)]
struct NextcloudTalkRouteState {
    adapter_id: ProductAdapterId,
    installation_id: AdapterInstallationId,
    workflow: Arc<dyn ProductWorkflow>,
    webhook_path: String,
    bot_name: String,
    mention_regex: Option<Regex>,
    shared_secret: SecretString,
}

fn nextcloud_talk_policy() -> IngressPolicy {
    IngressPolicy::new(IngressPolicyParts {
        listener_class: ListenerClass::PublicWebhook,
        auth: IngressAuthPolicy::Required {
            schemes: vec![IngressAuthScheme::WebhookSignature],
        },
        scope_source: IngressScopeSource::HostResolved,
        body_limit: BodyLimitPolicy::Limited {
            max_bytes: NEXTCLOUD_BODY_LIMIT_BYTES,
        },
        rate_limit: RateLimitPolicy::Limited {
            scope: RateLimitScope::Global,
            max_requests: NEXTCLOUD_MAX_REQUESTS,
            window_seconds: NEXTCLOUD_RATE_WINDOW_SECONDS,
        },
        cors: CorsPolicy::NotApplicable,
        websocket_origin: WebSocketOriginPolicy::NotApplicable,
        streaming: StreamingMode::None,
        audit: AuditTraceClass::PublicCallback,
        effect_path: AllowedEffectPath::ProductWorkflow,
    })
    .expect("nextcloud talk ingress policy must validate")
}

#[derive(Debug, Serialize)]
struct NextcloudErrorBody {
    error: &'static str,
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
}

async fn nextcloud_talk_handler(
    State(state): State<NextcloudTalkRouteState>,
    headers: HeaderMap,
    body: Bytes,
) -> Response {
    let Some(signature) = headers
        .get(NEXTCLOUD_SIGNATURE_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return (
            StatusCode::UNAUTHORIZED,
            Json(NextcloudErrorBody {
                error: "missing_signature",
            }),
        )
            .into_response();
    };

    let Some(random) = headers
        .get(NEXTCLOUD_RANDOM_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return (
            StatusCode::UNAUTHORIZED,
            Json(NextcloudErrorBody {
                error: "missing_signature",
            }),
        )
            .into_response();
    };

    if !verify_nextcloud_signature(
        state.shared_secret.expose_secret(),
        random,
        body.as_ref(),
        signature,
    ) {
        return (
            StatusCode::UNAUTHORIZED,
            Json(NextcloudErrorBody {
                error: "invalid_signature",
            }),
        )
            .into_response();
    }

    let event = match serde_json::from_slice::<TalkEvent>(body.as_ref()) {
        Ok(value) => value,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(NextcloudErrorBody {
                    error: "invalid_json",
                }),
            )
                .into_response();
        }
    };

    let parsed = match parse_talk_event(&event, &state.bot_name, state.mention_regex.as_ref()) {
        Ok(Some(value)) => value,
        Ok(None) => return (StatusCode::OK, "ok").into_response(),
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(NextcloudErrorBody {
                    error: "invalid_payload",
                }),
            )
                .into_response();
        }
    };

    let evidence = mark_request_signature_verified(
        NEXTCLOUD_SIGNATURE_HEADER,
        Some(NEXTCLOUD_RANDOM_HEADER.to_string()),
        state.installation_id.as_str(),
    );
    let context = match TrustedInboundContext::from_verified_evidence(
        state.adapter_id.clone(),
        state.installation_id.clone(),
        Utc::now(),
        &evidence,
    ) {
        Ok(value) => value,
        Err(_) => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(NextcloudErrorBody {
                    error: "invalid_auth_context",
                }),
            )
                .into_response();
        }
    };
    let envelope = match ProductInboundEnvelope::from_trusted_parse(context, parsed) {
        Ok(value) => value,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(NextcloudErrorBody {
                    error: "invalid_inbound_envelope",
                }),
            )
                .into_response();
        }
    };

    match state.workflow.submit_inbound(envelope).await {
        Ok(_) => (StatusCode::OK, "ok").into_response(),
        Err(error) => {
            tracing::warn!(
                target = "ironclaw::reborn::nextcloud_talk",
                webhook_path = %state.webhook_path,
                error = %error,
                "nextcloud talk webhook rejected",
            );
            (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(NextcloudErrorBody {
                    error: "workflow_unavailable",
                }),
            )
                .into_response()
        }
    }
}

fn verify_nextcloud_signature(secret: &str, random: &str, body: &[u8], signature: &str) -> bool {
    let Some(provided) = normalize_nextcloud_signature(signature) else {
        return false;
    };

    let mut mac = match HmacSha256::new_from_slice(secret.as_bytes()) {
        Ok(value) => value,
        Err(_) => return false,
    };
    mac.update(random.trim().as_bytes());
    mac.update(body);
    let expected = format!("{:x}", mac.finalize().into_bytes());

    if expected.len() != provided.len() {
        return false;
    }

    bool::from(expected.as_bytes().ct_eq(provided.as_bytes()))
}

fn normalize_nextcloud_signature(signature: &str) -> Option<String> {
    let mut normalized = signature.trim().trim_matches('"').to_ascii_lowercase();
    if let Some(rest) = normalized.strip_prefix("sha256=") {
        normalized = rest.to_string();
    }
    if normalized.len() != 64 || !normalized.bytes().all(|byte| byte.is_ascii_hexdigit()) {
        return None;
    }
    Some(normalized)
}

fn parse_talk_event(
    event: &TalkEvent,
    bot_name: &str,
    mention_regex: Option<&Regex>,
) -> Result<Option<ParsedProductInbound>, ProductWorkflowError> {
    if event.event_type != "Create" || is_bot_authored(event) {
        return Ok(None);
    }

    let room_token = match extract_room_token(event) {
        Some(value) => value,
        None => return Ok(None),
    };
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|actor| actor.id.clone())
        .unwrap_or_else(|| "unknown-actor".to_string());
    let actor_name = event.actor.as_ref().and_then(|actor| actor.name.clone());

    let raw_content = event
        .object
        .as_ref()
        .and_then(|value| value.content.clone())
        .unwrap_or_default();
    let rendered = parse_message_content(&raw_content).trim().to_string();
    if rendered.is_empty() {
        return Ok(None);
    }

    let is_mention = mention_regex
        .map(|re| re.is_match(&rendered))
        .unwrap_or_else(|| is_mention_for_bot(&rendered, bot_name));
    if !is_mention {
        return Ok(None);
    }

    let prompt = strip_mention(&rendered, bot_name);
    let text = if prompt.is_empty() { rendered } else { prompt };
    let message_id = event.object.as_ref().and_then(|obj| obj.id.clone());
    let event_id = message_id
        .clone()
        .unwrap_or_else(|| format!("create:{room_token}:{actor_id}"));

    let payload = ProductInboundPayload::UserMessage(
        UserMessagePayload::new(text, vec![], ProductTriggerReason::BotMention)
            .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            })?,
    );
    let parsed = ParsedProductInbound::new(
        ExternalEventId::new(event_id).map_err(|error| ProductWorkflowError::InvalidBindingRequest {
            reason: error.to_string(),
        })?,
        ExternalActorRef::new("nextcloud_user", actor_id, actor_name)
            .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            })?,
        ExternalConversationRef::new(None::<&str>, room_token, None::<&str>, message_id.as_deref())
            .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            })?,
        payload,
    )
    .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
        reason: error.to_string(),
    })?;

    Ok(Some(parsed))
}

fn extract_room_token(event: &TalkEvent) -> Option<String> {
    event
        .target
        .as_ref()
        .and_then(|value| value.id.clone())
        .or_else(|| event.object.as_ref().and_then(|value| value.id.clone()))
}

fn is_bot_authored(event: &TalkEvent) -> bool {
    let actor_type = event
        .actor
        .as_ref()
        .and_then(|actor| actor.actor_type.as_ref())
        .map(|value| value.to_ascii_lowercase())
        .unwrap_or_default();
    let actor_id = event
        .actor
        .as_ref()
        .and_then(|actor| actor.id.as_ref())
        .map(|value| value.to_ascii_lowercase())
        .unwrap_or_default();
    actor_type == "application" || actor_id.starts_with("bots/")
}

fn parse_message_content(content: &str) -> String {
    let parsed: Result<TalkContent, _> = serde_json::from_str(content);
    if let Ok(content_json) = parsed {
        return content_json.message.unwrap_or_default();
    }
    content.to_string()
}

fn is_mention_for_bot(text: &str, bot_name: &str) -> bool {
    let lower_text = text.to_ascii_lowercase();
    let lower_bot = bot_name.to_ascii_lowercase();
    lower_text.contains(&format!("@{lower_bot}")) || lower_text.contains(&lower_bot)
}

fn strip_mention(text: &str, bot_name: &str) -> String {
    let mut cleaned = text.replace(&format!("@{bot_name}"), "");
    cleaned = cleaned.replace(&format!("@{}", bot_name.to_ascii_lowercase()), "");
    cleaned = cleaned.replace(bot_name, "");
    cleaned.trim().to_string()
}

struct StaticNextcloudActorResolver {
    user_id: UserId,
}

impl StaticNextcloudActorResolver {
    fn new(user_id: UserId) -> Self {
        Self { user_id }
    }
}

#[async_trait]
impl ProductActorUserResolver for StaticNextcloudActorResolver {
    async fn resolve_product_actor_user(
        &self,
        _request: ProductActorUserResolutionRequest,
    ) -> Result<Option<UserId>, ProductWorkflowError> {
        Ok(Some(self.user_id.clone()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn sign(secret: &str, random: &str, body: &[u8]) -> String {
        let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).expect("hmac init");
        mac.update(random.as_bytes());
        mac.update(body);
        format!("{:x}", mac.finalize().into_bytes())
    }

    #[test]
    fn verifies_valid_signature() {
        let secret = "bot-secret";
        let random = "nextcloud-random-abc123";
        let body = br#"{"type":"Create","object":{"content":"hello"}}"#;
        let signature = sign(secret, random, body);

        assert!(verify_nextcloud_signature(secret, random, body, &signature));
    }

    #[test]
    fn accepts_sha256_prefixed_and_quoted_signature() {
        let secret = "bot-secret";
        let random = "nextcloud-random-abc123";
        let body = br#"{"type":"Create","object":{"content":"hello"}}"#;
        let signature = sign(secret, random, body);
        let prefixed = format!("\"sha256={}\"", signature.to_uppercase());

        assert!(verify_nextcloud_signature(secret, random, body, &prefixed));
    }

    #[test]
    fn rejects_non_hex_signature() {
        let secret = "bot-secret";
        let random = "nextcloud-random-abc123";
        let body = br#"{"type":"Create","object":{"content":"hello"}}"#;

        assert!(!verify_nextcloud_signature(secret, random, body, "not-a-valid-signature"));
    }
}
