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
use ironclaw_auth::{
    AuthProductError, AuthProductScope, AuthProviderId, AuthSurface,
    CredentialAccountSelectionRequest,
};
use ironclaw_conversations::InMemoryConversationServices;
use ironclaw_host_api::{
    AgentId, ExtensionId, InvocationId, NetworkMethod, ProjectId, ResourceScope,
    RuntimeCredentialAccountSetup, TenantId, UserId,
};
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
use secrecy::ExposeSecret;
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use subtle::ConstantTimeEq;
use thiserror::Error;
use ironclaw_secrets::{SecretStore, SecretStoreError};

use crate::RebornRuntime;
use crate::nextcloud_delivery::{NextcloudTalkFinalReplyDriver, RuntimeCredentialNextcloudEgressProvider};
use crate::nextcloud_egress::NextcloudProtocolHttpEgress;
use crate::product_auth_runtime_credentials::{
    RuntimeCredentialAccountSelectionRequest, RuntimeCredentialAccountSelectionService,
};
use crate::webui_serve::PublicRouteMount;
use ironclaw_product_adapters::{DeclaredEgressHost, DeclaredEgressTarget, EgressCredentialHandle};
use ironclaw_wasm_product_adapters::EgressPolicy;

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
    /// Hostname of the Nextcloud instance (e.g. `next.cloud.example.tld`).
    /// Used to construct outbound egress requests. When `None`, outbound
    /// delivery is disabled and only inbound webhook parsing is active.
    pub nextcloud_host: Option<String>,
}

#[derive(Debug, Error)]
pub enum NextcloudTalkBuildError {
    #[error("nextcloud talk route requires local runtime services")]
    DurableHostStateUnavailable,
    #[error("nextcloud talk route requires product auth services")]
    ProductAuthUnavailable,
    #[error("invalid nextcloud configuration ({field}): {reason}")]
    InvalidConfig { field: &'static str, reason: String },
}

pub fn build_nextcloud_talk_route_mount(
    runtime: &RebornRuntime,
    config: NextcloudTalkRouteConfig,
) -> Result<PublicRouteMount, NextcloudTalkBuildError> {
    let local_runtime = runtime
        .services()
        .local_runtime
        .as_ref()
        .ok_or(NextcloudTalkBuildError::DurableHostStateUnavailable)?;
    let product_auth = runtime
        .services()
        .product_auth
        .as_ref()
        .ok_or(NextcloudTalkBuildError::ProductAuthUnavailable)?
        .clone();
    let runtime_credential_accounts = product_auth.runtime_credential_account_selection_service();
    let secret_store = runtime.services().secret_store();

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
    let requester_extension = ExtensionId::new(config.extension_id.clone()).map_err(|err| {
        NextcloudTalkBuildError::InvalidConfig {
            field: "extension_id",
            reason: format!("invalid requester extension id: {err}"),
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
    let delivery_binding: Arc<dyn ironclaw_product_workflow::ConversationBindingService> =
        Arc::new(binding.clone());

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

    // Build the outbound delivery driver if a Nextcloud host is configured.
    let delivery_driver = if let Some(nextcloud_host_str) = config.nextcloud_host.clone() {
        let nextcloud_host = DeclaredEgressHost::new(&nextcloud_host_str).map_err(|err| {
            NextcloudTalkBuildError::InvalidConfig {
                field: "nextcloud_host",
                reason: err.to_string(),
            }
        })?;
        let app_password_handle =
            EgressCredentialHandle::new("nextcloud_talk_app_password").map_err(|err| {
                NextcloudTalkBuildError::InvalidConfig {
                    field: "nextcloud_talk_app_password",
                    reason: err.to_string(),
                }
            })?;
        let credential_provider = Arc::new(RuntimeCredentialNextcloudEgressProvider::new(
            Arc::clone(&runtime_credential_accounts),
            Arc::clone(&secret_store),
            requester_extension.clone(),
            config.tenant_id.clone(),
            config.agent_id.clone(),
            config.project_id.clone(),
            config.user_id.clone(),
        ));
        let egress_policy = EgressPolicy::new([DeclaredEgressTarget::new(
            nextcloud_host.clone(),
            Some(app_password_handle.clone()),
        )]);
        let host_egress_port = local_runtime
            .host_runtime_http_egress
            .clone()
            .ok_or(NextcloudTalkBuildError::DurableHostStateUnavailable)?;
        let egress = Arc::new(NextcloudProtocolHttpEgress::new(
            host_egress_port,
            credential_provider,
            egress_policy,
            ironclaw_host_api::ResourceScope::system(),
        ));
        let driver = NextcloudTalkFinalReplyDriver::new(
            runtime.webui_turn_coordinator(),
            runtime.webui_thread_service(),
            delivery_binding,
            egress,
        );
        Some((Arc::new(driver), nextcloud_host, app_password_handle))
    } else {
        None
    };

    let state = NextcloudTalkRouteState {
        adapter_id,
        installation_id,
        workflow,
        webhook_path: config.webhook_path.clone(),
        bot_name: config.bot_name,
        runtime_credential_accounts,
        secret_store,
        requester_extension,
        tenant_id: config.tenant_id,
        agent_id: config.agent_id,
        project_id: config.project_id,
        user_id: config.user_id,
        delivery_driver,
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
    runtime_credential_accounts: Arc<dyn RuntimeCredentialAccountSelectionService>,
    secret_store: Arc<dyn SecretStore>,
    requester_extension: ExtensionId,
    tenant_id: TenantId,
    agent_id: AgentId,
    project_id: Option<ProjectId>,
    user_id: UserId,
    /// Outbound delivery driver: (driver, nextcloud_host, credential_handle).
    /// `None` when no Nextcloud host is configured (inbound-only mode).
    delivery_driver: Option<(Arc<NextcloudTalkFinalReplyDriver>, DeclaredEgressHost, EgressCredentialHandle)>,
}

enum NextcloudSecretResolutionError {
    Missing,
    Backend,
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
    let shared_secret = match resolve_nextcloud_webhook_secret(&state).await {
        Ok(secret) => secret,
        Err(NextcloudSecretResolutionError::Missing) => None,
        Err(NextcloudSecretResolutionError::Backend) => {
            return (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(NextcloudErrorBody {
                    error: "secret_backend_unavailable",
                }),
            )
                .into_response();
        }
    };

    if let Some(shared_secret) = shared_secret.as_deref() {
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

        if !verify_nextcloud_signature(shared_secret, random, body.as_ref(), signature) {
            return (
                StatusCode::UNAUTHORIZED,
                Json(NextcloudErrorBody {
                    error: "invalid_signature",
                }),
            )
                .into_response();
        }
    } else {
        tracing::warn!(
            target = "ironclaw::reborn::nextcloud_talk",
            webhook_path = %state.webhook_path,
            "nextcloud talk webhook signature secret is not configured; running in transitional allowlist/rate-limit mode"
        );
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

    let parsed = match parse_talk_event(&event, &state.bot_name) {
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

    match state.workflow.submit_inbound(envelope.clone()).await {
        Ok(ack) => {
            // If a delivery driver is wired and the turn was accepted, spawn
            // an async task to poll for completion and post the reply back.
            if let Some((driver, nextcloud_host, app_password_handle)) = &state.delivery_driver {
                if let ironclaw_product_adapters::ProductInboundAck::Accepted {
                    submitted_run_id,
                    ..
                } = ack
                {
                    let driver = Arc::clone(driver);
                    driver.spawn_delivery(
                        envelope.adapter_id().clone(),
                        envelope.installation_id().clone(),
                        envelope.external_actor_ref().clone(),
                        envelope.external_conversation_ref().clone(),
                        envelope.external_event_id().clone(),
                        envelope.auth_claim().clone(),
                        submitted_run_id,
                        app_password_handle.clone(),
                        nextcloud_host.clone(),
                    );
                }
            }
            (StatusCode::OK, "ok").into_response()
        }
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

async fn resolve_nextcloud_webhook_secret(
    state: &NextcloudTalkRouteState,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    let provider = AuthProviderId::new("nextcloud_talk_webhook_secret")
        .map_err(|_| NextcloudSecretResolutionError::Backend)?;
    let scope = AuthProductScope::new(
        ResourceScope {
            tenant_id: state.tenant_id.clone(),
            user_id: state.user_id.clone(),
            agent_id: Some(state.agent_id.clone()),
            project_id: state.project_id.clone(),
            mission_id: None,
            thread_id: None,
            invocation_id: InvocationId::new(),
        },
        AuthSurface::Api,
    );
    let selection_request = RuntimeCredentialAccountSelectionRequest::new(
        CredentialAccountSelectionRequest::new(scope.clone(), provider)
            .for_extension(state.requester_extension.clone()),
        scope,
        RuntimeCredentialAccountSetup::ManualToken,
        Vec::new(),
    );
    let account = state
        .runtime_credential_accounts
        .select_unique_configured_runtime_account(selection_request)
        .await
        .map_err(|error| match error {
            AuthProductError::CredentialMissing
            | AuthProductError::CrossScopeDenied
            | AuthProductError::AccountSelectionRequired => NextcloudSecretResolutionError::Missing,
            _ => NextcloudSecretResolutionError::Backend,
        })?;
    let handle = account
        .access_secret;
    let Some(handle) = handle else {
        return Ok(None);
    };
    let lease = state
        .secret_store
        .lease_once(&account.scope.resource, &handle)
        .await
        .map_err(map_secret_store_error)?;
    let material = state
        .secret_store
        .consume(&account.scope.resource, lease.id)
        .await
        .map_err(map_secret_store_error)?;
    Ok(Some(material.expose_secret().to_string()))
}

fn map_secret_store_error(error: SecretStoreError) -> NextcloudSecretResolutionError {
    match error {
        SecretStoreError::UnknownSecret { .. }
        | SecretStoreError::UnknownLease { .. }
        | SecretStoreError::LeaseConsumed { .. }
        | SecretStoreError::LeaseRevoked { .. }
        | SecretStoreError::LeaseExpired { .. }
        | SecretStoreError::SecretExpired => NextcloudSecretResolutionError::Missing,
        SecretStoreError::BackendMisconfigured { .. }
        | SecretStoreError::StoreUnavailable { .. } => NextcloudSecretResolutionError::Backend,
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

    let is_mention = is_exact_mention_for_bot(&rendered, bot_name);
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

fn mention_token(bot_name: &str) -> Option<String> {
    let trimmed = bot_name.trim();
    if trimmed.is_empty() {
        return None;
    }
    Some(format!("@{trimmed}"))
}

fn is_exact_mention_for_bot(text: &str, bot_name: &str) -> bool {
    let Some(token) = mention_token(bot_name) else {
        return false;
    };
    text.contains(&token)
}

fn strip_mention(text: &str, bot_name: &str) -> String {
    let Some(token) = mention_token(bot_name) else {
        return text.trim().to_string();
    };
    text.replace(&token, "").trim().to_string()
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

    #[test]
    fn exact_mention_requires_at_prefix() {
        assert!(!is_exact_mention_for_bot("ironclaw please help", "ironclaw"));
        assert!(is_exact_mention_for_bot("@ironclaw please help", "ironclaw"));
    }

    #[test]
    fn strip_mention_only_removes_explicit_token() {
        assert_eq!(strip_mention("@ironclaw hello", "ironclaw"), "hello");
        assert_eq!(strip_mention("ironclaw hello", "ironclaw"), "ironclaw hello");
    }
}
