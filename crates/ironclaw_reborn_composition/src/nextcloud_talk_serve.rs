use std::num::{NonZeroU32, NonZeroU64};
use std::sync::Arc;
use std::{collections::HashMap, sync::Mutex};

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
#[cfg(not(any(feature = "libsql", feature = "postgres")))]
use ironclaw_conversations::InMemoryConversationServices;
use ironclaw_host_api::ingress::{
    AllowedEffectPath, AuditTraceClass, BodyLimitPolicy, CorsPolicy, IngressAuthPolicy,
    IngressAuthScheme, IngressPolicy, IngressPolicyParts, IngressRouteDescriptor,
    IngressScopeSource, ListenerClass, RateLimitPolicy, RateLimitScope, StreamingMode,
    WebSocketOriginPolicy,
};
use ironclaw_host_api::{
    AgentId, ExtensionId, InvocationId, NetworkMethod, ProjectId, ResourceScope,
    RuntimeCredentialAccountSetup, TenantId, UserId,
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
    ResolveBindingRequest,
    StaticProductInstallationResolver,
};
use ironclaw_secrets::{SecretStore, SecretStoreError};
use secrecy::ExposeSecret;
use serde_json::Value;
use serde::{
    Deserialize, Serialize,
    de::{DeserializeOwned, Deserializer},
};
use sha2::Sha256;
use subtle::ConstantTimeEq;
use thiserror::Error;
use url::Url;

use crate::RebornRuntime;
use crate::nextcloud_delivery::{
    NextcloudDeliveryTask, NextcloudTalkFinalReplyDriver, RuntimeCredentialNextcloudEgressProvider,
};
use crate::nextcloud_egress::NextcloudProtocolHttpEgress;
use crate::product_auth_runtime_credentials::{
    RuntimeCredentialAccountSelectionRequest, RuntimeCredentialAccountSelectionService,
};
use crate::webui_serve::PublicRouteMount;
use ironclaw_product_adapters::{DeclaredEgressHost, DeclaredEgressTarget, EgressCredentialHandle};
use ironclaw_wasm_product_adapters::EgressPolicy;
use ironclaw_threads::EnsureThreadRequest;

const NEXTCLOUD_SIGNATURE_HEADER: &str = "X-Nextcloud-Talk-Signature";
const NEXTCLOUD_RANDOM_HEADER: &str = "X-Nextcloud-Talk-Random";
const BRIDGE_SIGNATURE_HEADER: &str = "X-Ironclaw-Signature";
const BRIDGE_TIMESTAMP_HEADER: &str = "X-Ironclaw-Timestamp";
const BRIDGE_NONCE_HEADER: &str = "X-Ironclaw-Nonce";
const NEXTCLOUD_ROUTE_ID: &str = "nextcloud_talk.events";
const NEXTCLOUD_BODY_LIMIT_BYTES: NonZeroU64 = NonZeroU64::new(512 * 1024).unwrap();
const NEXTCLOUD_MAX_REQUESTS: NonZeroU32 = NonZeroU32::new(6_000).unwrap();
const NEXTCLOUD_RATE_WINDOW_SECONDS: NonZeroU32 = NonZeroU32::new(60).unwrap();
const BRIDGE_SIGNATURE_TOLERANCE_SECONDS: i64 = 300;
const BRIDGE_REPLAY_CACHE_LIMIT: usize = 50_000;

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
    /// Deprecated for outbound delivery host resolution.
    ///
    /// Outbound host is resolved from the UI/setup credential
    /// `nextcloud_talk_base_url` to keep a single source of truth.
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

pub async fn build_nextcloud_talk_route_mount(
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

    let adapter_id =
        ProductAdapterId::new(format!("{}/inbound", config.extension_id)).map_err(|err| {
            NextcloudTalkBuildError::InvalidConfig {
                field: "extension_id",
                reason: err.to_string(),
            }
        })?;
    let installation_id =
        AdapterInstallationId::new(config.extension_id.clone()).map_err(|err| {
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

    #[cfg(any(feature = "libsql", feature = "postgres"))]
    let conversations = Arc::new(
        local_runtime
            .durable_trigger_conversation_services()
            .await
            .map_err(|error| NextcloudTalkBuildError::InvalidConfig {
                field: "webhook_path",
                reason: format!("failed to open durable nextcloud conversation bindings: {error}"),
            })?,
    );
    #[cfg(not(any(feature = "libsql", feature = "postgres")))]
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
    let thread_service = runtime.webui_thread_service();
    let delivery_binding: Arc<dyn ironclaw_product_workflow::ConversationBindingService> =
        Arc::new(binding.clone());

    let inbound = Arc::new(DefaultInboundTurnService::new(
        binding,
        Arc::clone(&thread_service),
        runtime.webui_turn_coordinator(),
    ));
    let workflow: Arc<dyn ProductWorkflow> = Arc::new(DefaultProductWorkflow::new(
        inbound,
        Arc::new(InMemoryIdempotencyLedger::default()),
        Arc::new(workflow_binding),
    ));

    // Build the outbound delivery driver if a Nextcloud host is configured,
    // or if a setup-credential base URL can provide the host fallback.
    let resolved_nextcloud_host = resolve_nextcloud_delivery_host_fallback(
        Arc::clone(&runtime_credential_accounts),
        Arc::clone(&secret_store),
        requester_extension.clone(),
        config.tenant_id.clone(),
        config.agent_id.clone(),
        config.project_id.clone(),
        config.user_id.clone(),
    )
    .await?;

    let delivery_driver = if let Some(nextcloud_host) = resolved_nextcloud_host {
        let app_password_handle = EgressCredentialHandle::new("nextcloud_talk_app_password")
            .map_err(|err| NextcloudTalkBuildError::InvalidConfig {
                field: "nextcloud_talk_app_password",
                reason: err.to_string(),
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
            Arc::clone(&thread_service),
            Arc::clone(&delivery_binding),
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
        thread_service,
        binding_service: delivery_binding,
        delivery_driver,
        replay_guard: Arc::new(Mutex::new(ReplayGuard::new())),
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
    thread_service: Arc<dyn ironclaw_threads::SessionThreadService>,
    binding_service: Arc<dyn ironclaw_product_workflow::ConversationBindingService>,
    /// Outbound delivery driver: (driver, nextcloud_host, credential_handle).
    /// `None` when no Nextcloud host is configured (inbound-only mode).
    delivery_driver: Option<(
        Arc<NextcloudTalkFinalReplyDriver>,
        DeclaredEgressHost,
        EgressCredentialHandle,
    )>,
    replay_guard: Arc<Mutex<ReplayGuard>>,
}

struct ReplayGuard {
    seen_nonce_by_timestamp: HashMap<String, i64>,
}

impl ReplayGuard {
    fn new() -> Self {
        Self {
            seen_nonce_by_timestamp: HashMap::new(),
        }
    }

    fn record_once(&mut self, nonce: &str, now: i64, tolerance_seconds: i64) -> bool {
        self.prune(now, tolerance_seconds);
        if self.seen_nonce_by_timestamp.contains_key(nonce) {
            return false;
        }
        if self.seen_nonce_by_timestamp.len() >= BRIDGE_REPLAY_CACHE_LIMIT {
            self.prune(now, tolerance_seconds);
            if self.seen_nonce_by_timestamp.len() >= BRIDGE_REPLAY_CACHE_LIMIT
                && let Some(oldest_key) = self
                    .seen_nonce_by_timestamp
                    .iter()
                    .min_by_key(|(_, ts)| *ts)
                    .map(|(key, _)| key.clone())
            {
                self.seen_nonce_by_timestamp.remove(&oldest_key);
            }
        }
        self.seen_nonce_by_timestamp.insert(nonce.to_string(), now);
        true
    }

    fn prune(&mut self, now: i64, tolerance_seconds: i64) {
        self.seen_nonce_by_timestamp
            .retain(|_, seen_at| now.saturating_sub(*seen_at) <= tolerance_seconds);
    }
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
    #[serde(alias = "eventType")]
    event_type: String,
    #[serde(default, deserialize_with = "de_opt_object")]
    actor: Option<TalkActor>,
    #[serde(default, deserialize_with = "de_opt_object")]
    object: Option<TalkObject>,
    #[serde(default, deserialize_with = "de_opt_object")]
    target: Option<TalkTarget>,
    #[serde(default, deserialize_with = "de_opt_object")]
    mention: Option<TalkMention>,
    #[serde(default, rename = "bridgeMessage", deserialize_with = "de_opt_object")]
    bridge_message: Option<TalkBridgeMessage>,
}

#[derive(Debug, Deserialize)]
struct TalkMention {
    #[serde(default, rename = "userId", alias = "user_id", deserialize_with = "de_opt_string")]
    user_id: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkActor {
    #[serde(default, rename = "type", deserialize_with = "de_opt_string")]
    actor_type: Option<String>,
    #[serde(default, deserialize_with = "de_opt_string")]
    id: Option<String>,
    #[serde(default, deserialize_with = "de_opt_string")]
    name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkObject {
    #[serde(default, deserialize_with = "de_opt_string")]
    id: Option<String>,
    #[serde(default, alias = "name", alias = "displayName", alias = "display_name", deserialize_with = "de_opt_string")]
    room_name: Option<String>,
    #[serde(default, deserialize_with = "de_opt_string")]
    content: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkTarget {
    #[serde(default, deserialize_with = "de_opt_string")]
    id: Option<String>,
    #[serde(default, alias = "name", alias = "displayName", alias = "display_name", alias = "roomName", alias = "room_name", deserialize_with = "de_opt_string")]
    room_name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct TalkBridgeMessage {
    #[serde(default, deserialize_with = "de_opt_string")]
    raw: Option<String>,
    #[serde(default, rename = "mentionEntities", deserialize_with = "de_mention_entities")]
    mention_entities: Vec<TalkMentionEntity>,
}

#[derive(Debug, Deserialize)]
struct TalkMentionEntity {
    #[serde(default, deserialize_with = "de_opt_string")]
    token: Option<String>,
    #[serde(default, deserialize_with = "de_opt_string")]
    id: Option<String>,
    #[serde(default, deserialize_with = "de_opt_string")]
    name: Option<String>,
    #[serde(default)]
    #[serde(rename = "isBot")]
    is_bot: bool,
}

fn de_opt_string<'de, D>(deserializer: D) -> Result<Option<String>, D::Error>
where
    D: Deserializer<'de>,
{
    let value = Option::<Value>::deserialize(deserializer)?;
    Ok(match value {
        Some(Value::String(inner)) => Some(inner),
        _ => None,
    })
}

fn de_opt_object<'de, D, T>(deserializer: D) -> Result<Option<T>, D::Error>
where
    D: Deserializer<'de>,
    T: DeserializeOwned,
{
    let value = Option::<Value>::deserialize(deserializer)?;
    Ok(match value {
        Some(Value::Object(map)) => serde_json::from_value::<T>(Value::Object(map)).ok(),
        _ => None,
    })
}

fn de_mention_entities<'de, D>(deserializer: D) -> Result<Vec<TalkMentionEntity>, D::Error>
where
    D: Deserializer<'de>,
{
    let value = Option::<Value>::deserialize(deserializer)?;
    let Some(Value::Array(entries)) = value else {
        return Ok(Vec::new());
    };

    Ok(entries
        .into_iter()
        .filter_map(|entry| serde_json::from_value::<TalkMentionEntity>(entry).ok())
        .collect())
}

struct ParsedTalkInbound {
    inbound: ParsedProductInbound,
    room_name: Option<String>,
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
        let verification = if headers.get(BRIDGE_SIGNATURE_HEADER).is_some() {
            verify_bridge_signature(
                &state.replay_guard,
                shared_secret,
                &headers,
                body.as_ref(),
                BRIDGE_SIGNATURE_TOLERANCE_SECONDS,
            )
        } else {
            verify_nextcloud_webhook_signature(shared_secret, &headers, body.as_ref())
        };

        if let Err(error) = verification {
            return (StatusCode::UNAUTHORIZED, Json(NextcloudErrorBody { error })).into_response();
        }
    } else {
        tracing::warn!(
            target = "ironclaw::reborn::nextcloud_talk",
            webhook_path = %state.webhook_path,
            "nextcloud talk webhook signature secret is not configured; running in transitional allowlist/rate-limit mode"
        );
    }

    let event = match deserialize_talk_event(body.as_ref()) {
        Ok(value) => value,
        Err(_) => {
            let content_type = headers
                .get("content-type")
                .and_then(|v| v.to_str().ok())
                .unwrap_or("<missing>");
            let content_encoding = headers
                .get("content-encoding")
                .and_then(|v| v.to_str().ok())
                .unwrap_or("<none>");
            let preview = preview_body_for_log(body.as_ref(), 320);
            tracing::warn!(
                target = "ironclaw::reborn::nextcloud_talk",
                webhook_path = %state.webhook_path,
                content_type,
                content_encoding,
                body_len = body.len(),
                body_preview = %preview,
                has_bridge_signature = headers.get(BRIDGE_SIGNATURE_HEADER).is_some(),
                has_nextcloud_signature = headers.get(NEXTCLOUD_SIGNATURE_HEADER).is_some(),
                "nextcloud talk webhook rejected: unable to deserialize event payload"
            );
            return (
                StatusCode::BAD_REQUEST,
                Json(NextcloudErrorBody {
                    error: "invalid_json",
                }),
            )
                .into_response();
        }
    };

    if let Err(error) = validate_declared_reply_user(&state, &event).await {
        return (StatusCode::BAD_REQUEST, Json(NextcloudErrorBody { error })).into_response();
    }

    let resolved_bot_name = match resolve_nextcloud_bot_display_name(&state).await {
        Ok(Some(value)) => {
            let trimmed = value.trim();
            if trimmed.is_empty() {
                state.bot_name.clone()
            } else {
                trimmed.to_string()
            }
        }
        Ok(None) | Err(NextcloudSecretResolutionError::Missing) => state.bot_name.clone(),
        Err(NextcloudSecretResolutionError::Backend) => {
            tracing::warn!(
                target = "ironclaw::reborn::nextcloud_talk",
                webhook_path = %state.webhook_path,
                "nextcloud_talk_bot_display_name unavailable from credential backend; using default parser bot name"
            );
            state.bot_name.clone()
        }
    };

    let parsed = match parse_talk_event(&event, &resolved_bot_name) {
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

    let (evidence_header_name, evidence_timestamp_header_name) =
        if headers.get(BRIDGE_SIGNATURE_HEADER).is_some() {
            (
                BRIDGE_SIGNATURE_HEADER,
                Some(BRIDGE_TIMESTAMP_HEADER.to_string()),
            )
        } else {
            (
                NEXTCLOUD_SIGNATURE_HEADER,
                Some(NEXTCLOUD_RANDOM_HEADER.to_string()),
            )
        };

    let evidence = mark_request_signature_verified(
        evidence_header_name,
        evidence_timestamp_header_name,
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
    let envelope = match ProductInboundEnvelope::from_trusted_parse(context, parsed.inbound) {
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
            if let Some(room_name) = parsed.room_name.as_deref()
                && let Err(error) = sync_thread_title_with_room_name(&state, &envelope, room_name).await
            {
                tracing::warn!(
                    target = "ironclaw::reborn::nextcloud_talk",
                    webhook_path = %state.webhook_path,
                    room_name,
                    error = %error,
                    "nextcloud talk room-name sync skipped"
                );
            }

            // If a delivery driver is wired and the turn was accepted, spawn
            // an async task to poll for completion and post the reply back.
            if let Some((driver, nextcloud_host, app_password_handle)) = &state.delivery_driver
                && let ironclaw_product_adapters::ProductInboundAck::Accepted {
                    submitted_run_id,
                    ..
                } = ack
            {
                let driver = Arc::clone(driver);
                driver.spawn_delivery(NextcloudDeliveryTask {
                    adapter_id: envelope.adapter_id().clone(),
                    installation_id: envelope.installation_id().clone(),
                    external_actor_ref: envelope.external_actor_ref().clone(),
                    external_conversation_ref: envelope.external_conversation_ref().clone(),
                    external_event_id: envelope.external_event_id().clone(),
                    auth_claim: envelope.auth_claim().clone(),
                    run_id: submitted_run_id,
                    app_password_handle: app_password_handle.clone(),
                    nextcloud_host: nextcloud_host.clone(),
                });
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

async fn sync_thread_title_with_room_name(
    state: &NextcloudTalkRouteState,
    envelope: &ProductInboundEnvelope,
    room_name: &str,
) -> Result<(), ProductWorkflowError> {
    let room_name = room_name.trim();
    if room_name.is_empty() {
        return Ok(());
    }

    let binding = match state
        .binding_service
        .lookup_binding(ResolveBindingRequest {
            adapter_id: envelope.adapter_id().clone(),
            installation_id: envelope.installation_id().clone(),
            external_actor_ref: envelope.external_actor_ref().clone(),
            external_conversation_ref: envelope.external_conversation_ref().clone(),
            external_event_id: envelope.external_event_id().clone(),
            route_kind: ironclaw_product_workflow::ProductConversationRouteKind::Direct,
            auth_claim: envelope.auth_claim().clone(),
        })
        .await
    {
        Ok(binding) => binding,
        Err(_) => state
            .binding_service
            .lookup_binding(ResolveBindingRequest {
                adapter_id: envelope.adapter_id().clone(),
                installation_id: envelope.installation_id().clone(),
                external_actor_ref: envelope.external_actor_ref().clone(),
                external_conversation_ref: envelope.external_conversation_ref().clone(),
                external_event_id: envelope.external_event_id().clone(),
                route_kind: ironclaw_product_workflow::ProductConversationRouteKind::Shared,
                auth_claim: envelope.auth_claim().clone(),
            })
            .await?,
    };

    let Some(agent_id) = binding.agent_id.clone() else {
        return Ok(());
    };
    let scope = ironclaw_threads::ThreadScope {
        tenant_id: binding.tenant_id.clone(),
        agent_id,
        project_id: binding.project_id.clone(),
        owner_user_id: binding.subject_user_id.clone().or(Some(binding.actor_user_id.clone())),
        mission_id: None,
    };

    state
        .thread_service
        .ensure_thread(EnsureThreadRequest {
            scope,
            thread_id: Some(binding.thread_id.clone()),
            created_by_actor_id: binding.actor_user_id.as_str().to_string(),
            title: Some(room_name.to_string()),
            metadata_json: None,
        })
        .await
        .map_err(|error| ProductWorkflowError::Transient {
            reason: format!("failed to sync nextcloud room title: {error}"),
        })?;

    Ok(())
}

async fn resolve_nextcloud_webhook_secret(
    state: &NextcloudTalkRouteState,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    resolve_nextcloud_manual_secret(state, "nextcloud_talk_webhook_secret").await
}

async fn resolve_nextcloud_delivery_host_fallback(
    runtime_credential_accounts: Arc<dyn RuntimeCredentialAccountSelectionService>,
    secret_store: Arc<dyn SecretStore>,
    requester_extension: ExtensionId,
    tenant_id: TenantId,
    agent_id: AgentId,
    project_id: Option<ProjectId>,
    user_id: UserId,
) -> Result<Option<DeclaredEgressHost>, NextcloudTalkBuildError> {
    let base_url = resolve_nextcloud_manual_secret_with_components(
        Arc::clone(&runtime_credential_accounts),
        Arc::clone(&secret_store),
        requester_extension,
        tenant_id,
        agent_id,
        project_id,
        user_id,
        "nextcloud_talk_base_url",
    )
    .await;

    let Some(base_url) = base_url else {
        tracing::warn!(
            target = "ironclaw::reborn::nextcloud_talk",
            "nextcloud talk delivery host is not configured and nextcloud_talk_base_url fallback is unavailable; outbound reply delivery remains disabled"
        );
        return Ok(None);
    };

    let parsed = match Url::parse(base_url.trim()) {
        Ok(value) => value,
        Err(error) => {
            tracing::warn!(
                target = "ironclaw::reborn::nextcloud_talk",
                error = %error,
                "nextcloud_talk_base_url fallback is invalid; outbound reply delivery remains disabled"
            );
            return Ok(None);
        }
    };

    let Some(host) = parsed.host_str() else {
        tracing::warn!(
            target = "ironclaw::reborn::nextcloud_talk",
            "nextcloud_talk_base_url fallback has no host; outbound reply delivery remains disabled"
        );
        return Ok(None);
    };

    let declared = match DeclaredEgressHost::new(host) {
        Ok(value) => value,
        Err(error) => {
            tracing::warn!(
                target = "ironclaw::reborn::nextcloud_talk",
                error = %error,
                "resolved fallback host is invalid for egress policy; outbound reply delivery remains disabled"
            );
            return Ok(None);
        }
    };

    tracing::info!(
        target = "ironclaw::reborn::nextcloud_talk",
        nextcloud_host = %declared.as_str(),
        "resolved Nextcloud delivery host from nextcloud_talk_base_url setup credential"
    );

    Ok(Some(declared))
}

async fn resolve_nextcloud_bot_username(
    state: &NextcloudTalkRouteState,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    resolve_nextcloud_manual_secret(state, "nextcloud_talk_bot_username").await
}

async fn resolve_nextcloud_bot_display_name(
    state: &NextcloudTalkRouteState,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    resolve_nextcloud_manual_secret(state, "nextcloud_talk_bot_display_name").await
}

async fn resolve_nextcloud_manual_secret(
    state: &NextcloudTalkRouteState,
    provider_name: &str,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    resolve_nextcloud_manual_secret_with_components(
        Arc::clone(&state.runtime_credential_accounts),
        Arc::clone(&state.secret_store),
        state.requester_extension.clone(),
        state.tenant_id.clone(),
        state.agent_id.clone(),
        state.project_id.clone(),
        state.user_id.clone(),
        provider_name,
    )
    .await
}

async fn resolve_nextcloud_manual_secret_with_components(
    runtime_credential_accounts: Arc<dyn RuntimeCredentialAccountSelectionService>,
    secret_store: Arc<dyn SecretStore>,
    requester_extension: ExtensionId,
    tenant_id: TenantId,
    agent_id: AgentId,
    project_id: Option<ProjectId>,
    user_id: UserId,
    provider_name: &str,
) -> Result<Option<String>, NextcloudSecretResolutionError> {
    let provider =
        AuthProviderId::new(provider_name).map_err(|_| NextcloudSecretResolutionError::Backend)?;
    let scope = AuthProductScope::new(
        ResourceScope {
            tenant_id,
            user_id,
            agent_id: Some(agent_id),
            project_id,
            mission_id: None,
            thread_id: None,
            invocation_id: InvocationId::new(),
        },
        AuthSurface::Api,
    );
    let selection_request = RuntimeCredentialAccountSelectionRequest::new(
        CredentialAccountSelectionRequest::new(scope.clone(), provider)
            .for_extension(requester_extension),
        scope,
        RuntimeCredentialAccountSetup::ManualToken,
        Vec::new(),
    );
    let account = runtime_credential_accounts
        .select_unique_configured_runtime_account(selection_request)
        .await
        .map_err(|error| match error {
            AuthProductError::CredentialMissing
            | AuthProductError::CrossScopeDenied
            | AuthProductError::AccountSelectionRequired => NextcloudSecretResolutionError::Missing,
            _ => NextcloudSecretResolutionError::Backend,
        })?;
    let handle = account.access_secret;
    let Some(handle) = handle else {
        return Ok(None);
    };
    let lease = secret_store
        .lease_once(&account.scope.resource, &handle)
        .await
        .map_err(map_secret_store_error)?;
    let material = secret_store
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

fn deserialize_talk_event(body: &[u8]) -> Result<TalkEvent, ()> {
    let body = trim_utf8_bom_and_ws(body);

    if let Ok(event) = serde_json::from_slice::<TalkEvent>(body) {
        return Ok(event);
    }

    if let Some(event) = deserialize_event_from_form_body(body) {
        return Ok(event);
    }

    let value = serde_json::from_slice::<Value>(body).map_err(|_| ())?;

    if let Value::String(inner_json) = &value {
        return serde_json::from_str::<TalkEvent>(inner_json).map_err(|_| ());
    }

    if let Value::Object(map) = &value {
        if let Some(event) = deserialize_talk_event_from_object_map(map) {
            return Ok(event);
        }

        if let Some(Value::Object(payload)) = map.get("payload") {
            return serde_json::from_value::<TalkEvent>(Value::Object(payload.clone()))
                .map_err(|_| ());
        }

        if let Some(Value::String(payload_json)) = map.get("payload")
            && let Ok(event) = serde_json::from_str::<TalkEvent>(payload_json)
        {
            return Ok(event);
        }

        if let Some(Value::String(inner_json)) = map.get("body")
            && let Ok(event) = serde_json::from_str::<TalkEvent>(inner_json)
        {
            return Ok(event);
        }

        if let Some(Value::Object(data)) = map.get("data")
            && let Ok(event) = serde_json::from_value::<TalkEvent>(Value::Object(data.clone()))
        {
            return Ok(event);
        }

        if let Some(Value::String(data_json)) = map.get("data")
            && let Ok(event) = serde_json::from_str::<TalkEvent>(data_json)
        {
            return Ok(event);
        }

        if map.get("type").is_none() && let Some(event_type) = map.get("eventType") {
            let mut patched = map.clone();
            patched.insert("type".to_string(), event_type.clone());
            if let Ok(event) = serde_json::from_value::<TalkEvent>(Value::Object(patched)) {
                return Ok(event);
            }
        }
    }

    Err(())
}

fn deserialize_talk_event_from_object_map(
    map: &serde_json::Map<String, Value>,
) -> Option<TalkEvent> {
    serde_json::from_value::<TalkEvent>(Value::Object(map.clone())).ok()
}

fn trim_utf8_bom_and_ws(mut body: &[u8]) -> &[u8] {
    if body.starts_with(&[0xEF, 0xBB, 0xBF]) {
        body = &body[3..];
    }
    while let Some(byte) = body.first() {
        if byte.is_ascii_whitespace() {
            body = &body[1..];
        } else {
            break;
        }
    }
    body
}

fn deserialize_event_from_form_body(body: &[u8]) -> Option<TalkEvent> {
    let body_str = std::str::from_utf8(body).ok()?;
    let mut candidate_json_values: Vec<String> = Vec::new();

    for (key, value) in url::form_urlencoded::parse(body_str.as_bytes()) {
        let key = key.trim().to_ascii_lowercase();
        if key.is_empty() {
            continue;
        }
        if matches!(key.as_str(), "payload" | "body" | "event" | "json" | "data") {
            let value = value.trim();
            if !value.is_empty() {
                candidate_json_values.push(value.to_string());
            }
        }
    }

    for json_payload in candidate_json_values {
        if let Ok(event) = serde_json::from_str::<TalkEvent>(&json_payload) {
            return Some(event);
        }
        if let Ok(Value::Object(map)) = serde_json::from_str::<Value>(&json_payload) {
            if let Some(Value::Object(payload)) = map.get("payload")
                && let Ok(event) = serde_json::from_value::<TalkEvent>(Value::Object(payload.clone()))
            {
                return Some(event);
            }
            if let Some(Value::String(payload_json)) = map.get("payload")
                && let Ok(event) = serde_json::from_str::<TalkEvent>(payload_json)
            {
                return Some(event);
            }
            if let Some(Value::String(inner_json)) = map.get("body")
                && let Ok(event) = serde_json::from_str::<TalkEvent>(inner_json)
            {
                return Some(event);
            }
        }
    }

    None
}

fn preview_body_for_log(body: &[u8], max_chars: usize) -> String {
    let text = String::from_utf8_lossy(body);
    let mut preview = text.chars().take(max_chars).collect::<String>();
    preview = preview.replace('\n', "\\n").replace('\r', "\\r");
    if text.chars().count() > max_chars {
        preview.push_str("...(truncated)");
    }
    preview
}

async fn validate_declared_reply_user(
    state: &NextcloudTalkRouteState,
    event: &TalkEvent,
) -> Result<(), &'static str> {
    let Some(declared_reply_user) = extract_declared_reply_user_id(event) else {
        return Ok(());
    };

    let configured_reply_user = resolve_nextcloud_bot_username(state)
        .await
        .map_err(|_| "reply_user_config_unavailable")?
        .ok_or("reply_user_config_missing")?;

    if normalized_user_id_matches(&declared_reply_user, &configured_reply_user) {
        return Ok(());
    }

    Err("reply_user_mismatch")
}

fn extract_declared_reply_user_id(event: &TalkEvent) -> Option<String> {
    event
        .mention
        .as_ref()
        .and_then(|mention| non_empty_trimmed(mention.user_id.as_deref()))
}

fn normalized_user_id_matches(left: &str, right: &str) -> bool {
    let normalize = |value: &str| value.trim().trim_start_matches('@').to_ascii_lowercase();
    normalize(left) == normalize(right)
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

fn verify_nextcloud_webhook_signature(
    secret: &str,
    headers: &HeaderMap,
    body: &[u8],
) -> Result<(), &'static str> {
    let Some(signature) = headers
        .get(NEXTCLOUD_SIGNATURE_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return Err("missing_signature");
    };

    let Some(random) = headers
        .get(NEXTCLOUD_RANDOM_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return Err("missing_signature");
    };

    if !verify_nextcloud_signature(secret, random, body, signature) {
        return Err("invalid_signature");
    }

    Ok(())
}

fn verify_bridge_signature(
    replay_guard: &Arc<Mutex<ReplayGuard>>,
    secret: &str,
    headers: &HeaderMap,
    body: &[u8],
    tolerance_seconds: i64,
) -> Result<(), &'static str> {
    let Some(timestamp_raw) = headers
        .get(BRIDGE_TIMESTAMP_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return Err("missing_timestamp");
    };
    let timestamp = timestamp_raw
        .parse::<i64>()
        .map_err(|_| "invalid_timestamp")?;

    let now = Utc::now().timestamp();
    if now.abs_diff(timestamp) > tolerance_seconds as u64 {
        return Err("stale_timestamp");
    }

    let Some(nonce) = headers
        .get(BRIDGE_NONCE_HEADER)
        .and_then(|value| value.to_str().ok())
        .map(str::trim)
    else {
        return Err("missing_nonce");
    };
    if nonce.len() < 8 || nonce.len() > 128 {
        return Err("invalid_nonce");
    }

    let Some(signature) = headers
        .get(BRIDGE_SIGNATURE_HEADER)
        .and_then(|value| value.to_str().ok())
    else {
        return Err("missing_signature");
    };
    let Some(provided) = normalize_nextcloud_signature(signature) else {
        return Err("invalid_signature");
    };

    let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).map_err(|_| "invalid_signature")?;
    mac.update(timestamp_raw.trim().as_bytes());
    mac.update(b"\n");
    mac.update(nonce.as_bytes());
    mac.update(b"\n");
    mac.update(body);
    let expected = format!("{:x}", mac.finalize().into_bytes());

    if expected.len() != provided.len() {
        return Err("invalid_signature");
    }
    if !bool::from(expected.as_bytes().ct_eq(provided.as_bytes())) {
        return Err("invalid_signature");
    }

    let mut guard = replay_guard
        .lock()
        .map_err(|_| "replay_guard_unavailable")?;
    if !guard.record_once(nonce, now, tolerance_seconds) {
        return Err("replay_nonce");
    }

    Ok(())
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
) -> Result<Option<ParsedTalkInbound>, ProductWorkflowError> {
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
        .and_then(|actor| non_empty_trimmed(actor.id.as_deref()))
        .unwrap_or_else(|| "unknown-actor".to_string());
    let actor_name = event
        .actor
        .as_ref()
        .and_then(|actor| non_empty_trimmed(actor.name.as_deref()));

    let raw_content = event
        .object
        .as_ref()
        .and_then(|value| value.content.clone())
        .unwrap_or_default();
    let rendered = parse_message_content(&raw_content).trim().to_string();
    if rendered.is_empty() {
        return Ok(None);
    }

    let prompt = sanitize_prompt_from_bridge_or_text(event, &rendered, bot_name);
    let text = if prompt.is_empty() { rendered } else { prompt };
    let message_id = event
        .object
        .as_ref()
        .and_then(|obj| non_empty_trimmed(obj.id.as_deref()));
    let event_id = message_id
        .clone()
        .unwrap_or_else(|| format!("create:{room_token}:{actor_id}"));

    let payload = ProductInboundPayload::UserMessage(
        UserMessagePayload::new(text, vec![], ProductTriggerReason::DirectChat).map_err(
            |error| ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            },
        )?,
    );
    let parsed = ParsedProductInbound::new(
        ExternalEventId::new(event_id).map_err(|error| {
            ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            }
        })?,
        ExternalActorRef::new("nextcloud_user", actor_id, actor_name).map_err(|error| {
            ProductWorkflowError::InvalidBindingRequest {
                reason: error.to_string(),
            }
        })?,
        ExternalConversationRef::new(
            None::<&str>,
            room_token,
            None::<&str>,
            message_id.as_deref(),
        )
        .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
            reason: error.to_string(),
        })?,
        payload,
    )
    .map_err(|error| ProductWorkflowError::InvalidBindingRequest {
        reason: error.to_string(),
    })?;

    Ok(Some(ParsedTalkInbound {
        inbound: parsed,
        room_name: extract_room_name(event),
    }))
}

fn extract_room_token(event: &TalkEvent) -> Option<String> {
    event
        .target
        .as_ref()
        .and_then(|value| non_empty_trimmed(value.id.as_deref()))
        .or_else(|| {
            event
                .object
                .as_ref()
                .and_then(|value| non_empty_trimmed(value.id.as_deref()))
        })
}

fn extract_room_name(event: &TalkEvent) -> Option<String> {
    event
        .target
        .as_ref()
        .and_then(|value| non_empty_trimmed(value.room_name.as_deref()))
        .or_else(|| {
            event
                .object
                .as_ref()
                .and_then(|value| non_empty_trimmed(value.room_name.as_deref()))
        })
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

fn sanitize_prompt_from_bridge_or_text(event: &TalkEvent, rendered: &str, bot_name: &str) -> String {
    let bridge_raw = event
        .bridge_message
        .as_ref()
        .and_then(|message| non_empty_trimmed(message.raw.as_deref()));
    let source = bridge_raw.unwrap_or_else(|| rendered.to_string());
    let from_entities = event
        .bridge_message
        .as_ref()
        .map(|message| strip_bot_mention_entities(&source, &message.mention_entities))
        .unwrap_or(source);
    sanitize_prompt(&from_entities, bot_name)
}

fn strip_bot_mention_entities(text: &str, entities: &[TalkMentionEntity]) -> String {
    let mut tokens: Vec<String> = Vec::new();
    for entity in entities {
        if !entity.is_bot {
            continue;
        }
        if let Some(token) = non_empty_trimmed(entity.token.as_deref()) {
            tokens.push(token);
        }
        if let Some(id) = non_empty_trimmed(entity.id.as_deref()) {
            tokens.push(format!("@{id}"));
        }
        if let Some(name) = non_empty_trimmed(entity.name.as_deref()) {
            tokens.push(format!("@{name}"));
        }
    }

    tokens.sort_by_key(|token| std::cmp::Reverse(token.len()));
    tokens.dedup();

    let mut result = text.to_string();
    for token in tokens {
        result = replace_case_insensitive(&result, &token);
    }
    result.split_whitespace().collect::<Vec<_>>().join(" ")
}

fn replace_case_insensitive(haystack: &str, needle: &str) -> String {
    if needle.trim().is_empty() {
        return haystack.to_string();
    }

    let haystack_lower = haystack.to_ascii_lowercase();
    let needle_lower = needle.to_ascii_lowercase();
    let mut cursor = 0usize;
    let mut output = String::with_capacity(haystack.len());

    while cursor < haystack.len() {
        let tail = &haystack_lower[cursor..];
        let Some(offset) = tail.find(&needle_lower) else {
            output.push_str(&haystack[cursor..]);
            break;
        };
        let start = cursor + offset;
        output.push_str(&haystack[cursor..start]);
        cursor = start + needle.len();
    }

    output
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
    use axum::http::HeaderValue;

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

        assert!(!verify_nextcloud_signature(
            secret,
            random,
            body,
            "not-a-valid-signature"
        ));
    }

    #[test]
    fn sanitize_prompt_strips_configured_addressing() {
        assert_eq!(sanitize_prompt("@ironclaw hello", "ironclaw"), "hello");
        assert_eq!(sanitize_prompt("ironclaw hello", "ironclaw"), "hello");
    }

    #[test]
    fn sanitize_prompt_removes_leading_mentions_and_configured_name() {
        assert_eq!(
            sanitize_prompt("@KI Gerda @ki_assistant Hallo", "KI Gerda"),
            "Hallo"
        );
    }

    fn assert_user_message_payload(
        parsed: ParsedTalkInbound,
        expected_text: &str,
        expected_trigger: ProductTriggerReason,
    ) {
        match parsed.inbound.payload {
            ProductInboundPayload::UserMessage(payload) => {
                assert_eq!(payload.text, expected_text);
                assert_eq!(payload.trigger, expected_trigger);
            }
            other => panic!("expected user message payload, got {other:?}"),
        }
    }

    #[test]
    fn parse_talk_event_accepts_create_with_or_without_mention() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: Some(TalkActor {
                actor_type: Some("users".to_string()),
                id: Some("user-123".to_string()),
                name: Some("Marten".to_string()),
            }),
            object: Some(TalkObject {
                id: Some("42".to_string()),
                room_name: None,
                content: Some("@ironclaw please summarize this".to_string()),
            }),
            target: Some(TalkTarget {
                id: Some("room-alpha".to_string()),
                room_name: None,
            }),
            mention: None,
            bridge_message: None,
        };

        let parsed = parse_talk_event(&event, "ironclaw")
            .expect("parse result")
            .expect("mentioned messages must produce inbound payload");
        assert_user_message_payload(
            parsed,
            "please summarize this",
            ProductTriggerReason::DirectChat,
        );
    }

    #[test]
    fn parse_talk_event_accepts_create_without_mention() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: Some(TalkActor {
                actor_type: Some("users".to_string()),
                id: Some("user-123".to_string()),
                name: Some("Marten".to_string()),
            }),
            object: Some(TalkObject {
                id: Some("42".to_string()),
                room_name: None,
                content: Some("please summarize this".to_string()),
            }),
            target: Some(TalkTarget {
                id: Some("room-alpha".to_string()),
                room_name: None,
            }),
            mention: None,
            bridge_message: None,
        };

        let parsed = parse_talk_event(&event, "ironclaw")
            .expect("parse result")
            .expect("non-mentioned messages must now be accepted");
        assert_user_message_payload(
            parsed,
            "please summarize this",
            ProductTriggerReason::DirectChat,
        );
    }

    #[test]
    fn parse_talk_event_tolerates_blank_actor_and_message_ids() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: Some(TalkActor {
                actor_type: Some("users".to_string()),
                id: Some("   ".to_string()),
                name: Some("  Vorstand  ".to_string()),
            }),
            object: Some(TalkObject {
                id: Some(" ".to_string()),
                room_name: None,
                content: Some("test 12:16".to_string()),
            }),
            target: Some(TalkTarget {
                id: Some("3pjrvc7d".to_string()),
                room_name: None,
            }),
            mention: None,
            bridge_message: None,
        };

        let parsed = parse_talk_event(&event, "ki_assistant")
            .expect("parse result")
            .expect("blank actor/message ids should fall back instead of failing");

        assert_eq!(
            parsed.inbound.external_event_id.as_str(),
            "create:3pjrvc7d:unknown-actor"
        );
        assert_eq!(parsed.inbound.external_actor_ref.id(), "unknown-actor");
        assert_eq!(
            parsed.inbound.external_actor_ref.display_name(),
            Some("Vorstand")
        );
        assert_eq!(
            parsed.inbound.external_conversation_ref.conversation_id(),
            "3pjrvc7d"
        );
        assert_eq!(
            parsed.inbound.external_conversation_ref.reply_target_message_id(),
            None
        );
        assert_user_message_payload(parsed, "test 12:16", ProductTriggerReason::DirectChat);
    }

    #[test]
    fn parse_talk_event_ignores_bot_authored_messages() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: Some(TalkActor {
                actor_type: Some("application".to_string()),
                id: Some("bots/ironclaw".to_string()),
                name: Some("Ironclaw".to_string()),
            }),
            object: Some(TalkObject {
                id: Some("42".to_string()),
                room_name: None,
                content: Some("@ironclaw loop me".to_string()),
            }),
            target: Some(TalkTarget {
                id: Some("room-alpha".to_string()),
                room_name: None,
            }),
            mention: None,
            bridge_message: None,
        };

        let parsed = parse_talk_event(&event, "ironclaw").expect("parse result");
        assert!(parsed.is_none(), "bot-authored messages must be ignored");
    }

    #[test]
    fn parse_talk_event_prefers_explicit_bridge_mention_entities() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: Some(TalkActor {
                actor_type: Some("users".to_string()),
                id: Some("user-123".to_string()),
                name: Some("Marten".to_string()),
            }),
            object: Some(TalkObject {
                id: Some("901".to_string()),
                room_name: None,
                content: Some("@KI Gerda @ki_assistant Es ist 10:01. antworte mit OK".to_string()),
            }),
            target: Some(TalkTarget {
                id: Some("room-alpha".to_string()),
                room_name: None,
            }),
            mention: None,
            bridge_message: Some(TalkBridgeMessage {
                raw: Some("@KI Gerda @ki_assistant Es ist 10:01. antworte mit OK".to_string()),
                mention_entities: vec![
                    TalkMentionEntity {
                        token: Some("@KI Gerda".to_string()),
                        id: None,
                        name: None,
                        is_bot: true,
                    },
                    TalkMentionEntity {
                        token: Some("@ki_assistant".to_string()),
                        id: None,
                        name: None,
                        is_bot: true,
                    },
                ],
            }),
        };

        let parsed = parse_talk_event(&event, "KI Gerda")
            .expect("parse result")
            .expect("bridge mention entities should still produce inbound payload");

        assert_user_message_payload(parsed, "Es ist 10:01. antworte mit OK", ProductTriggerReason::DirectChat);
    }

    #[test]
    fn bridge_signature_verification_rejects_nonce_replay() {
        let secret = "bridge-secret";
        let timestamp = Utc::now().timestamp().to_string();
        let nonce = "abcd1234nonce";
        let body = br#"{"eventId":"nc-talk:room:1"}"#;

        let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).expect("hmac init");
        mac.update(timestamp.as_bytes());
        mac.update(b"\n");
        mac.update(nonce.as_bytes());
        mac.update(b"\n");
        mac.update(body);
        let signature = format!("{:x}", mac.finalize().into_bytes());

        let mut headers = HeaderMap::new();
        headers.insert(
            BRIDGE_TIMESTAMP_HEADER,
            HeaderValue::from_str(&timestamp).expect("ts"),
        );
        headers.insert(
            BRIDGE_NONCE_HEADER,
            HeaderValue::from_str(nonce).expect("nonce"),
        );
        headers.insert(
            BRIDGE_SIGNATURE_HEADER,
            HeaderValue::from_str(&signature).expect("signature"),
        );

        let replay_guard = Arc::new(Mutex::new(ReplayGuard::new()));
        let first = verify_bridge_signature(
            &replay_guard,
            secret,
            &headers,
            body,
            BRIDGE_SIGNATURE_TOLERANCE_SECONDS,
        );
        assert!(first.is_ok(), "first bridge request should verify");

        let second = verify_bridge_signature(
            &replay_guard,
            secret,
            &headers,
            body,
            BRIDGE_SIGNATURE_TOLERANCE_SECONDS,
        );
        assert_eq!(second, Err("replay_nonce"));
    }

    #[test]
    fn bridge_signature_verification_rejects_stale_timestamp() {
        let secret = "bridge-secret";
        let timestamp = (Utc::now().timestamp() - 7200).to_string();
        let nonce = "abcd1234nonce";
        let body = br#"{"eventId":"nc-talk:room:1"}"#;

        let mut mac = HmacSha256::new_from_slice(secret.as_bytes()).expect("hmac init");
        mac.update(timestamp.as_bytes());
        mac.update(b"\n");
        mac.update(nonce.as_bytes());
        mac.update(b"\n");
        mac.update(body);
        let signature = format!("{:x}", mac.finalize().into_bytes());

        let mut headers = HeaderMap::new();
        headers.insert(
            BRIDGE_TIMESTAMP_HEADER,
            HeaderValue::from_str(&timestamp).expect("ts"),
        );
        headers.insert(
            BRIDGE_NONCE_HEADER,
            HeaderValue::from_str(nonce).expect("nonce"),
        );
        headers.insert(
            BRIDGE_SIGNATURE_HEADER,
            HeaderValue::from_str(&signature).expect("signature"),
        );

        let replay_guard = Arc::new(Mutex::new(ReplayGuard::new()));
        let result = verify_bridge_signature(
            &replay_guard,
            secret,
            &headers,
            body,
            BRIDGE_SIGNATURE_TOLERANCE_SECONDS,
        );
        assert_eq!(result, Err("stale_timestamp"));
    }

    #[test]
    fn deserialize_talk_event_accepts_double_encoded_json_string() {
        let inner = r#"{"type":"Create","target":{"id":"room-1"},"object":{"content":"hallo"}}"#;
        let body = format!("\"{}\"", inner.replace('"', "\\\""));

        let parsed = deserialize_talk_event(body.as_bytes()).expect("parse wrapped payload");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn deserialize_talk_event_accepts_event_type_alias() {
        let body = br#"{"eventType":"Create","target":{"id":"room-1"},"object":{"content":"hallo"}}"#;

        let parsed = deserialize_talk_event(body).expect("parse eventType alias payload");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn deserialize_talk_event_accepts_form_urlencoded_payload_field() {
        let json = r#"{"type":"Create","target":{"id":"room-1"},"object":{"content":"hallo"}}"#;
        let encoded: String = url::form_urlencoded::byte_serialize(json.as_bytes()).collect();
        let body = format!("payload={encoded}");

        let parsed = deserialize_talk_event(body.as_bytes()).expect("parse form payload");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn deserialize_talk_event_accepts_utf8_bom_prefix() {
        let mut body = vec![0xEF, 0xBB, 0xBF];
        body.extend_from_slice(
            br#"{"type":"Create","target":{"id":"room-1"},"object":{"content":"hallo"}}"#,
        );

        let parsed = deserialize_talk_event(&body).expect("parse bom prefixed json");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn deserialize_talk_event_accepts_payload_string_wrapper() {
        let body = br#"{"payload":"{\"type\":\"Create\",\"target\":{\"id\":\"room-1\"},\"object\":{\"content\":\"hallo\"}}"}"#;

        let parsed = deserialize_talk_event(body).expect("parse payload string wrapper");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn deserialize_talk_event_tolerates_malformed_bridge_mention_entities() {
        let body = br#"{"type":"Create","target":{"id":"room-1"},"object":{"content":"hallo"},"bridgeMessage":{"raw":"@ki hallo","mentionEntities":{"bad":"shape"}}}"#;

        let parsed = deserialize_talk_event(body).expect("parse payload despite malformed mentionEntities");
        assert_eq!(parsed.event_type, "Create");
        assert_eq!(extract_room_token(&parsed).as_deref(), Some("room-1"));
    }

    #[test]
    fn extract_declared_reply_user_id_reads_mention_user_id() {
        let event = TalkEvent {
            event_type: "Create".to_string(),
            actor: None,
            object: None,
            target: None,
            mention: Some(TalkMention {
                user_id: Some("@ki_assistent".to_string()),
            }),
            bridge_message: None,
        };

        assert_eq!(
            extract_declared_reply_user_id(&event).as_deref(),
            Some("@ki_assistent")
        );
    }

    #[test]
    fn normalized_user_id_matches_ignores_case_and_prefix_at() {
        assert!(normalized_user_id_matches("@KI_Assistent", "ki_assistent"));
        assert!(!normalized_user_id_matches("ki_assistent", "andere_id"));
    }
}
