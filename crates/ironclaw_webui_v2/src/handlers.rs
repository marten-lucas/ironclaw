//! WebChat v2 HTTP handlers.
//!
//! Every handler:
//!
//! 1. Receives an authenticated caller as an `Extension<WebUiAuthenticatedCaller>`.
//!    Host composition is responsible for running the bearer-token middleware
//!    that builds that extension; the handler never sees a raw bearer token.
//! 2. Dispatches through [`RebornServicesApi`]. No direct access to the
//!    dispatcher, `HostRuntime`, run-state, DB stores, or any runtime lane.
//! 3. Maps every error through [`WebUiV2HttpError`] so the wire shape stays
//!    redacted and stable.
//!
//! [`RebornServicesApi`]: ironclaw_product_workflow::RebornServicesApi

use std::collections::BTreeSet;
use std::convert::Infallible;
use std::time::{Duration, SystemTime, UNIX_EPOCH};

use axum::Json;
use axum::body::Body;
use axum::extract::{Extension, Path, Query, State};
use axum::http::{HeaderMap, HeaderName, HeaderValue, StatusCode, header};
use axum::response::sse::{Event, KeepAlive, Sse};
use axum::response::{IntoResponse, Response};
use futures::SinkExt;
use futures::stream::Stream;
use ironclaw_product_workflow::{
    CodexLoginStart, FsMount, LifecyclePackageKind, LifecyclePackageRef, LlmConfigSnapshot,
    LlmModelsResult, LlmProbeRequest, LlmProbeResult, NearAiLoginRequest, NearAiLoginStart,
    NearAiWalletLoginRequest, NearAiWalletLoginResult, ProductOutboundEnvelope,
    ProductWorkflowError, ProjectFsFile, ProjectionCursor, RebornAccountLoginLinkResponse,
    RebornAccountTracesResponse, RebornAddMemberRequest, RebornAdminCreateUserRequest,
    RebornAdminPutSecretRequest, RebornAdminSecretDeletedResponse, RebornAdminSecretResponse,
    RebornAdminSetRoleRequest, RebornAdminSetStatusRequest, RebornAdminUpdateUserRequest,
    RebornAdminUserCreatedResponse, RebornAdminUserDeletedResponse, RebornAdminUserListQuery,
    RebornAdminUserListResponse, RebornAdminUserResponse, RebornAdminUserSecretsListResponse,
    RebornAttachmentRequest, RebornAutomationMutationResponse, RebornCancelRunResponse,
    RebornConnectableChannelListResponse, RebornCreateProjectRequest, RebornCreateThreadResponse,
    RebornDeleteProjectRequest, RebornDeleteThreadRequest, RebornDeleteThreadResponse,
    RebornExtensionActionResponse, RebornExtensionListResponse, RebornExtensionRegistryResponse,
    RebornFsListRequest, RebornFsListResponse, RebornFsMountsResponse, RebornFsReadRequest,
    RebornFsStatRequest, RebornFsStatResponse, RebornGetProjectRequest,
    RebornListAutomationsResponse, RebornListMembersRequest, RebornListMembersResponse,
    RebornListProjectsRequest, RebornListProjectsResponse, RebornListThreadsResponse,
    RebornLogQueryRequest, RebornLogQueryResponse, RebornOperatorCommandPlaneResponse,
    RebornOperatorConfigGetResponse, RebornOperatorConfigListResponse,
    RebornOperatorConfigSetRequest, RebornOperatorConfigValidateRequest,
    RebornOperatorConfigValidateResponse, RebornOperatorLogsQuery,
    RebornOperatorServiceLifecycleRequest, RebornOperatorSetupRequest, RebornOperatorSetupResponse,
    RebornOutboundDeliveryTargetId,
    RebornOutboundDeliveryTargetListResponse, RebornOutboundPreferencesResponse,
    RebornProjectFsListRequest, RebornProjectFsListResponse, RebornProjectFsReadRequest,
    RebornProjectFsStatRequest, RebornProjectFsStatResponse, RebornProjectMemberInfo,
    RebornProjectResponse, RebornRemoveMemberRequest, RebornResolveGateResponse,
    RebornRetryRunResponse, RebornServicesApi, RebornServicesError, RebornServicesErrorCode,
    RebornServicesErrorKind, RebornSetOutboundPreferencesRequest, RebornSetupExtensionResponse,
    RebornSkillActionResponse, RebornSkillContentResponse, RebornSkillListResponse,
    RebornSkillSearchResponse, RebornStreamEventsRequest, RebornSubmitTurnResponse,
    RebornTimelineRequest, RebornTimelineResponse, RebornTraceCreditsResponse,
    RebornTraceHoldAuthorizeResponse, RebornUpdateMemberRoleRequest, RebornUpdateProjectRequest,
    SetActiveLlmRequest, SettingsToolPermissionState, UpsertLlmProviderRequest,
    WebUiAttachmentCapabilities, WebUiAuthenticatedCaller, WebUiCancelRunRequest,
    WebUiCreateThreadRequest, WebUiInboundValidationCode, WebUiInboundValidationError,
    WebUiListAutomationsRequest, WebUiListThreadsRequest, WebUiRenameAutomationRequest,
    WebUiResolveGateRequest, WebUiRetryRunRequest, WebUiSendMessageRequest,
    WebUiSetupExtensionRequest, WebUiTestExtensionConnectionRequest, webui_attachment_capabilities,
};
use serde::{Deserialize, Serialize};

use ironclaw_host_api::{SecretHandle, UserId};

use crate::error::WebUiV2HttpError;
use crate::delegation_runtime::{
    self, DelegationResolution as RuntimeDelegationResolution,
    DelegationRuntimeAction, DelegationRuntimeErrorCode, DelegationTransitionInput,
};
use crate::governed_authoring::{
    self, AgentRosterEntry, AuditEntry, DelegationTask,
    GovernedAuthoringKind, IdentityDocument, IdentitySubjectType, MemoryItem, MemoryScope,
    SETTINGS_AGENT_CONFIG_PREFIX, SETTINGS_AUDIT_CONFIG_PREFIX, SETTINGS_DELEGATION_CONFIG_PREFIX,
    SETTINGS_IDENTITY_CONFIG_PREFIX, SETTINGS_MEMORY_CONFIG_PREFIX,
    SETTINGS_TOOL_POLICY_CONFIG_PREFIX, ToolPolicy, ToolPolicyScope,
};
#[cfg(test)]
use crate::governed_authoring::DelegationStatus;
#[cfg(test)]
use ironclaw_product_workflow::RebornOperatorConfigEntry;
use crate::router::{WebUiV2Capabilities, WebUiV2State};
use crate::schema::WebChatV2EventFrame;
use crate::sse_capacity::{SSE_MAX_LIFETIME, SseSlot};

// Session bootstrap must stay cheap and non-blocking: this flag only tunes
// initial approval UI state. It is mutable through `/settings/tools`, so do
// not cache it across requests; the settings route remains authoritative.
const GLOBAL_AUTO_APPROVE_FEATURE_TIMEOUT: Duration = Duration::from_millis(250);
const SETTINGS_TOOLS_AUTO_APPROVE_KEY: &str = "agent.auto_approve_tools";
const SETTINGS_TOOL_CONFIG_PREFIX: &str = "tool.";
const SETTINGS_MODEL_PROFILE_CONFIG_PREFIX: &str = "model_profile.";
const SETTINGS_TOOL_CAPABILITY_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_TOOL_CONFIG_PREFIX.len();
const SETTINGS_MODEL_PROFILE_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_MODEL_PROFILE_CONFIG_PREFIX.len();
const SETTINGS_IDENTITY_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_IDENTITY_CONFIG_PREFIX.len();
const SETTINGS_MEMORY_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_MEMORY_CONFIG_PREFIX.len();
const SETTINGS_TOOL_POLICY_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_TOOL_POLICY_CONFIG_PREFIX.len();
const SETTINGS_AGENT_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_AGENT_CONFIG_PREFIX.len();
const SETTINGS_DELEGATION_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_DELEGATION_CONFIG_PREFIX.len();
const SETTINGS_AUDIT_ID_MAX_BYTES: usize =
    OPERATOR_CONFIG_KEY_MAX_BYTES - SETTINGS_AUDIT_CONFIG_PREFIX.len();
const SETTINGS_CHANNEL_CONFIG_ID_MAX_BYTES: usize = 64;
const SETTINGS_SKILL_ID_MAX_BYTES: usize = OPERATOR_CONFIG_KEY_MAX_BYTES;
const CHANNEL_CONFIG_OUTBOUND_PREFERENCES: &str = "outbound_preferences";
const SKILL_RESTORE_AUTO_ACTIVATE_KIND: &str = "skill_auto_activate";
const SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND: &str = "auto_activate_learned";
const SKILL_AUTO_ACTIVATE_LEARNED_ENTITY_ID: &str = "auto_activate_learned";

#[derive(Debug, Clone, Serialize)]
pub struct WebUiV2SessionResponse {
    pub tenant_id: String,
    pub user_id: String,
    pub capabilities: WebUiV2Capabilities,
    /// Deployment-wide feature gates the browser uses to show/hide
    /// not-yet-finished surfaces. Distinct from `capabilities`, which are
    /// per-token authorization flags.
    pub features: WebUiV2Features,
    /// Inline-attachment contract (allowed `accept` tokens + size budgets)
    /// the browser advertises on its file picker. Generated from the shared
    /// format registry so the picker can never drift from the server's
    /// allowed set; the send-message decode remains authoritative.
    pub attachments: WebUiAttachmentCapabilities,
}

/// Deployment-wide WebUI feature gates surfaced to the browser on
/// `GET /session`. These are global "is this surface ready to show"
/// toggles, not per-caller authorization — keep authorization in
/// [`WebUiV2Capabilities`].
#[derive(Debug, Clone, Copy, Default, Serialize)]
pub struct WebUiV2Features {
    /// Reborn Projects surface (the conversations-panel entry + the
    /// `/projects` route). Hidden unless the deployment sets
    /// `IRONCLAW_REBORN_PROJECTS`, while the surface is still being
    /// finished.
    pub reborn_projects: bool,
    /// Effective global auto-approve setting for the authenticated caller.
    /// The browser treats it as a bootstrap UI flag and does not inspect the
    /// operator settings payload shape. Settings mutations should update local
    /// UI state directly or re-fetch `/session`; this field is only a snapshot.
    pub global_auto_approve: bool,
}

/// `GET /api/webchat/v2/session`
pub async fn get_session(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Json<WebUiV2SessionResponse> {
    let tenant_id = caller.tenant_id.to_string();
    let user_id = caller.user_id.to_string();
    let global_auto_approve = global_auto_approve_enabled(&state, caller).await;
    Json(WebUiV2SessionResponse {
        tenant_id,
        user_id,
        capabilities,
        features: WebUiV2Features {
            reborn_projects: state.reborn_projects_enabled(),
            global_auto_approve,
        },
        attachments: webui_attachment_capabilities(),
    })
}

async fn global_auto_approve_enabled(
    state: &WebUiV2State,
    caller: WebUiAuthenticatedCaller,
) -> bool {
    match tokio::time::timeout(
        GLOBAL_AUTO_APPROVE_FEATURE_TIMEOUT,
        state.services().global_auto_approve_enabled(caller),
    )
    .await
    {
        Ok(Ok(enabled)) => enabled,
        Ok(Err(error)) => {
            tracing::debug!(?error, "failed to read global auto-approve session feature");
            false
        }
        Err(_) => {
            tracing::debug!(
                timeout_ms = GLOBAL_AUTO_APPROVE_FEATURE_TIMEOUT.as_millis(),
                "timed out reading global auto-approve session feature"
            );
            false
        }
    }
}

/// `POST /api/webchat/v2/threads`
///
/// Body shape: [`WebUiCreateThreadRequest`].
pub async fn create_thread(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<WebUiCreateThreadRequest>,
) -> Result<Json<RebornCreateThreadResponse>, WebUiV2HttpError> {
    let response = state.services().create_thread(caller, body).await?;
    Ok(Json(response))
}

/// `DELETE /api/webchat/v2/threads/{thread_id}`
pub async fn delete_thread(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
) -> Result<Json<RebornDeleteThreadResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .delete_thread(caller, RebornDeleteThreadRequest { thread_id })
        .await?;
    Ok(Json(response))
}

// --- Admin user management ---------------------------------------------------
//
// Every handler delegates straight to the facade, which enforces admin
// authorization (operator token or admin/owner role) and last-admin protection.
// The `{user_id}` and `{handle}` path segments are parsed into their domain
// types (`UserId` / `SecretHandle`) here so a malformed value is a sanitized
// 400 before the facade runs — raw strings are a boundary format and never
// travel deeper than this edge (see `.claude/rules/types.md`).

/// Parse a `{user_id}` path segment into a `UserId`, mapping a malformed value
/// to a sanitized `400 invalid_request` before the facade is touched.
fn parse_admin_user_id(raw: String) -> Result<UserId, WebUiV2HttpError> {
    UserId::new(raw).map_err(|_| {
        WebUiV2HttpError::from(RebornServicesError::from(WebUiInboundValidationError::new(
            "user_id",
            WebUiInboundValidationCode::InvalidId,
        )))
    })
}

/// Parse a `{handle}` path segment into a `SecretHandle`, mapping a malformed
/// value to a sanitized `400 invalid_request` before the facade is touched.
/// Keeps a bad handle a client fault (400), never an internal 500 downstream.
fn parse_admin_secret_handle(raw: String) -> Result<SecretHandle, WebUiV2HttpError> {
    SecretHandle::new(raw).map_err(|_| {
        WebUiV2HttpError::from(RebornServicesError::from(WebUiInboundValidationError::new(
            "handle",
            WebUiInboundValidationCode::InvalidId,
        )))
    })
}

/// `GET /api/webchat/v2/admin/users`
pub async fn admin_list_users(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<RebornAdminUserListQuery>,
) -> Result<Json<RebornAdminUserListResponse>, WebUiV2HttpError> {
    Ok(Json(
        state.services().list_admin_users(caller, query).await?,
    ))
}

/// `POST /api/webchat/v2/admin/users`
pub async fn admin_create_user(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<RebornAdminCreateUserRequest>,
) -> Result<Json<RebornAdminUserCreatedResponse>, WebUiV2HttpError> {
    Ok(Json(
        state.services().create_admin_user(caller, body).await?,
    ))
}

/// `GET /api/webchat/v2/admin/users/{user_id}`
pub async fn admin_get_user(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
) -> Result<Json<RebornAdminUserResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state.services().get_admin_user(caller, user_id).await?,
    ))
}

/// `PATCH /api/webchat/v2/admin/users/{user_id}`
pub async fn admin_update_user(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
    Json(body): Json<RebornAdminUpdateUserRequest>,
) -> Result<Json<RebornAdminUserResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state
            .services()
            .update_admin_user(caller, user_id, body)
            .await?,
    ))
}

/// `DELETE /api/webchat/v2/admin/users/{user_id}`
pub async fn admin_delete_user(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
) -> Result<Json<RebornAdminUserDeletedResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state.services().delete_admin_user(caller, user_id).await?,
    ))
}

/// `POST /api/webchat/v2/admin/users/{user_id}/status`
pub async fn admin_set_user_status(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
    Json(body): Json<RebornAdminSetStatusRequest>,
) -> Result<Json<RebornAdminUserResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state
            .services()
            .set_admin_user_status(caller, user_id, body)
            .await?,
    ))
}

/// `POST /api/webchat/v2/admin/users/{user_id}/role`
pub async fn admin_set_user_role(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
    Json(body): Json<RebornAdminSetRoleRequest>,
) -> Result<Json<RebornAdminUserResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state
            .services()
            .set_admin_user_role(caller, user_id, body)
            .await?,
    ))
}

/// `GET /api/webchat/v2/admin/users/{user_id}/secrets`
pub async fn admin_list_user_secrets(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(user_id): Path<String>,
) -> Result<Json<RebornAdminUserSecretsListResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    Ok(Json(
        state
            .services()
            .list_admin_user_secrets(caller, user_id)
            .await?,
    ))
}

/// `PUT /api/webchat/v2/admin/users/{user_id}/secrets/{handle}`
pub async fn admin_put_user_secret(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path((user_id, handle)): Path<(String, String)>,
    Json(body): Json<RebornAdminPutSecretRequest>,
) -> Result<Json<RebornAdminSecretResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    let handle = parse_admin_secret_handle(handle)?;
    Ok(Json(
        state
            .services()
            .put_admin_user_secret(caller, user_id, handle, body)
            .await?,
    ))
}

/// `DELETE /api/webchat/v2/admin/users/{user_id}/secrets/{handle}`
pub async fn admin_delete_user_secret(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path((user_id, handle)): Path<(String, String)>,
) -> Result<Json<RebornAdminSecretDeletedResponse>, WebUiV2HttpError> {
    let user_id = parse_admin_user_id(user_id)?;
    let handle = parse_admin_secret_handle(handle)?;
    Ok(Json(
        state
            .services()
            .delete_admin_user_secret(caller, user_id, handle)
            .await?,
    ))
}

/// `POST /api/webchat/v2/threads/{thread_id}/messages`
///
/// Body shape: [`WebUiSendMessageRequest`] (the path `thread_id` overrides
/// any value in the body).
pub async fn send_message(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    Json(mut body): Json<WebUiSendMessageRequest>,
) -> Result<Json<RebornSubmitTurnResponse>, WebUiV2HttpError> {
    require_settings_policy_decision(&state, &caller, SettingsPolicyAction::ToolExecution).await?;
    body.thread_id = Some(thread_id);
    let response = state.services().submit_turn(caller, body).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/threads/{thread_id}/timeline`
///
/// Optional query parameters:
/// - `limit`: maximum number of messages per response. The facade
///   clamps to a hard ceiling so an unbounded value cannot widen the
///   response.
/// - `cursor`: opaque cursor echoed from the previous response's
///   `next_cursor` to load the page preceding it.
pub async fn get_timeline(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    Query(query): Query<TimelineQuery>,
) -> Result<Json<RebornTimelineResponse>, WebUiV2HttpError> {
    let request = RebornTimelineRequest {
        thread_id,
        limit: query.limit,
        cursor: query.cursor,
    };
    let response = state.services().get_timeline(caller, request).await?;
    Ok(Json(response))
}

/// Query parameters for `get_timeline`. Both fields are optional — a
/// caller with neither gets the most recent page (default size).
#[derive(Debug, Default, Deserialize)]
pub struct TimelineQuery {
    #[serde(default)]
    pub limit: Option<u32>,
    #[serde(default)]
    pub cursor: Option<String>,
}

/// Default workspace root listed when a `list_project_files` request omits
/// `?path=`. The facade confines all paths to this alias regardless.
const PROJECT_FS_ROOT: &str = "/workspace";

/// Query parameters for the project-filesystem read routes. `path` is a scoped
/// path under `/workspace`; optional only for directory listing (defaults to
/// the workspace root).
#[derive(Debug, Default, Deserialize)]
pub struct ProjectFsQuery {
    #[serde(default)]
    pub path: Option<String>,
}

/// `GET /api/webchat/v2/threads/{thread_id}/files`
///
/// List a directory under the thread's project workspace. Generic filesystem
/// navigation — also the listing surface a future file browser consumes.
pub async fn list_project_files(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    Query(query): Query<ProjectFsQuery>,
) -> Result<Json<RebornProjectFsListResponse>, WebUiV2HttpError> {
    let request = RebornProjectFsListRequest {
        thread_id,
        path: project_fs_list_path(query.path),
    };
    let response = state.services().list_project_dir(caller, request).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/threads/{thread_id}/files/stat`
///
/// Return metadata for a path under the thread's project workspace.
pub async fn stat_project_file(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    Query(query): Query<ProjectFsQuery>,
) -> Result<Json<RebornProjectFsStatResponse>, WebUiV2HttpError> {
    let request = RebornProjectFsStatRequest {
        thread_id,
        path: require_project_fs_path(query.path)?,
    };
    let response = state.services().stat_project_path(caller, request).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/threads/{thread_id}/files/content`
///
/// Download a file's bytes from the thread's project workspace. This is the
/// retrieval path for agent-produced attachments (an `AttachmentRef`'s
/// `storage_key` is passed as `?path=`).
///
/// The response is always served as an attachment with `nosniff` so a generated
/// `.html`/`.svg` cannot execute in the app origin.
pub async fn read_project_file(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    Query(query): Query<ProjectFsQuery>,
) -> Result<Response, WebUiV2HttpError> {
    let request = RebornProjectFsReadRequest {
        thread_id,
        path: require_project_fs_path(query.path)?,
    };
    let file = state.services().read_project_file(caller, request).await?;
    project_fs_download_response(file)
}

/// Build the always-attachment, `nosniff` download response shared by the
/// thread-scoped project-file route and the standalone filesystem-browser route.
/// Serving every file as an attachment with `nosniff` means a generated
/// `.html`/`.svg` cannot execute in the app origin.
fn project_fs_download_response(file: ProjectFsFile) -> Result<Response, WebUiV2HttpError> {
    let filename = sanitized_download_filename(file.filename.as_deref());
    Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, file.mime_type)
        .header(header::CONTENT_LENGTH, file.size_bytes)
        .header(
            header::CONTENT_DISPOSITION,
            format!("attachment; filename=\"{filename}\""),
        )
        .header(header::X_CONTENT_TYPE_OPTIONS, "nosniff")
        .body(Body::from(file.bytes))
        .map_err(|error| {
            // Keep the client response sanitized (bare 500), but log the
            // builder cause so a malformed download header is diagnosable
            // server-side rather than vanishing into an opaque internal error.
            tracing::debug!(
                target = "ironclaw_webui_v2::project_fs",
                error = %error,
                "failed to build project-file download response",
            );
            WebUiV2HttpError::from(RebornServicesError::internal())
        })
}

/// Query parameters for the standalone filesystem-browser read routes. `mount`
/// selects which logical mount to read (memory/workspace/…); `path` is a
/// mount-relative path (absent/blank means the mount root for listing), and
/// `project_id` optionally selects an authorized project scope.
#[derive(Debug, Deserialize)]
pub struct FsBrowseQuery {
    pub mount: FsMount,
    #[serde(default)]
    pub path: Option<String>,
    /// Optional project to browse, authorized by the product-workflow facade.
    #[serde(default)]
    pub project_id: Option<ironclaw_host_api::ProjectId>,
}

/// `GET /api/webchat/v2/fs/mounts`
///
/// List the mounts the read-only filesystem viewer can browse for this caller.
pub async fn list_fs_mounts(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornFsMountsResponse>, WebUiV2HttpError> {
    let response = state.services().list_fs_mounts(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/fs/list?mount=…&path=…&project_id=…`
///
/// List a directory on a browsable mount. Caller-scoped read-only navigation
/// over the agent's internal filesystem.
pub async fn browse_fs_dir(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<FsBrowseQuery>,
) -> Result<Json<RebornFsListResponse>, WebUiV2HttpError> {
    let request = RebornFsListRequest {
        mount: query.mount,
        // Absent, empty, or whitespace-only path lists the mount root.
        path: query
            .path
            .filter(|path| !path.trim().is_empty())
            .unwrap_or_default(),
        project_id: query.project_id,
    };
    let response = state.services().browse_fs_dir(caller, request).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/fs/stat?mount=…&path=…&project_id=…`
///
/// Return metadata for a path on a browsable mount.
pub async fn stat_fs_path(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<FsBrowseQuery>,
) -> Result<Json<RebornFsStatResponse>, WebUiV2HttpError> {
    let request = RebornFsStatRequest {
        mount: query.mount,
        path: require_fs_browse_path(query.path)?,
        project_id: query.project_id,
    };
    let response = state.services().stat_fs_path(caller, request).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/fs/content?mount=…&path=…&project_id=…`
///
/// Download/preview a file's bytes from a browsable mount. Served as an
/// attachment with `nosniff`, exactly like the project-file route.
pub async fn read_fs_file(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<FsBrowseQuery>,
) -> Result<Response, WebUiV2HttpError> {
    let request = RebornFsReadRequest {
        mount: query.mount,
        path: require_fs_browse_path(query.path)?,
        project_id: query.project_id,
    };
    let file = state.services().read_fs_file(caller, request).await?;
    project_fs_download_response(file)
}

/// Reject a missing/blank `?path=` on the stat/download fs-browse routes with a
/// field-scoped 400, mirroring [`require_project_fs_path`].
fn require_fs_browse_path(path: Option<String>) -> Result<String, WebUiV2HttpError> {
    match path {
        Some(path) if !path.trim().is_empty() => Ok(path),
        _ => Err(RebornServicesError::from(WebUiInboundValidationError::new(
            "path",
            WebUiInboundValidationCode::Blank,
        ))
        .into()),
    }
}

/// Reject a missing or blank `?path=` on the stat/download routes with a
/// field-scoped 400, rather than forwarding an empty string to the facade where
/// it surfaces as a murkier downstream invalid-path error.
/// Resolve the directory-listing path. An absent, empty, or whitespace-only
/// `?path=` means "list the workspace root" — mirrors `require_project_fs_path`'s
/// `trim`-based blank handling (so `?path=%20%20` isn't forwarded as a bogus
/// path), but defaults to the root instead of erroring, since listing the root
/// is a valid request.
fn project_fs_list_path(path: Option<String>) -> String {
    path.filter(|path| !path.trim().is_empty())
        .unwrap_or_else(|| PROJECT_FS_ROOT.to_string())
}

fn require_project_fs_path(path: Option<String>) -> Result<String, WebUiV2HttpError> {
    match path {
        Some(path) if !path.trim().is_empty() => Ok(path),
        _ => Err(RebornServicesError::from(WebUiInboundValidationError::new(
            "path",
            WebUiInboundValidationCode::Blank,
        ))
        .into()),
    }
}

/// Query parameters for `list_projects`.
#[derive(Debug, Default, Deserialize)]
pub struct ListProjectsQuery {
    #[serde(default)]
    pub limit: Option<u32>,
}

/// `GET /api/webchat/v2/projects`
pub async fn list_projects(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<ListProjectsQuery>,
) -> Result<Json<RebornListProjectsResponse>, WebUiV2HttpError> {
    let request = RebornListProjectsRequest { limit: query.limit };
    let response = state.services().list_projects(caller, request).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/projects`
pub async fn create_project(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<RebornCreateProjectRequest>,
) -> Result<Json<RebornProjectResponse>, WebUiV2HttpError> {
    let response = state.services().create_project(caller, body).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/projects/{project_id}`
pub async fn get_project(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(project_id): Path<String>,
) -> Result<Json<RebornProjectResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .get_project(caller, RebornGetProjectRequest { project_id })
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/projects/{project_id}` — update (path `project_id`
/// overrides any body value).
pub async fn update_project(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(project_id): Path<String>,
    Json(mut body): Json<RebornUpdateProjectRequest>,
) -> Result<Json<RebornProjectResponse>, WebUiV2HttpError> {
    body.project_id = project_id;
    let response = state.services().update_project(caller, body).await?;
    Ok(Json(response))
}

/// `DELETE /api/webchat/v2/projects/{project_id}`
pub async fn delete_project(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(project_id): Path<String>,
) -> Result<StatusCode, WebUiV2HttpError> {
    state
        .services()
        .delete_project(caller, RebornDeleteProjectRequest { project_id })
        .await?;
    Ok(StatusCode::NO_CONTENT)
}

/// `GET /api/webchat/v2/projects/{project_id}/members`
pub async fn list_project_members(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(project_id): Path<String>,
) -> Result<Json<RebornListMembersResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .list_project_members(caller, RebornListMembersRequest { project_id })
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/projects/{project_id}/members` — grant a member
/// (path `project_id` overrides any body value).
pub async fn add_project_member(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(project_id): Path<String>,
    Json(mut body): Json<RebornAddMemberRequest>,
) -> Result<Json<RebornProjectMemberInfo>, WebUiV2HttpError> {
    body.project_id = project_id;
    let response = state.services().add_project_member(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/projects/{project_id}/members/{user_id}` — change a
/// member's role (path ids override any body value).
pub async fn update_project_member(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path((project_id, user_id)): Path<(String, String)>,
    Json(mut body): Json<RebornUpdateMemberRoleRequest>,
) -> Result<Json<RebornProjectMemberInfo>, WebUiV2HttpError> {
    body.project_id = project_id;
    body.user_id = user_id;
    let response = state
        .services()
        .update_project_member_role(caller, body)
        .await?;
    Ok(Json(response))
}

/// `DELETE /api/webchat/v2/projects/{project_id}/members/{user_id}`
pub async fn remove_project_member(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path((project_id, user_id)): Path<(String, String)>,
) -> Result<StatusCode, WebUiV2HttpError> {
    state
        .services()
        .remove_project_member(
            caller,
            RebornRemoveMemberRequest {
                project_id,
                user_id,
            },
        )
        .await?;
    Ok(StatusCode::NO_CONTENT)
}

/// Upper bound on the sanitized `Content-Disposition` filename. A filesystem can
/// hold names far longer than is safe to splice into a header; cap well under
/// typical header-size limits so an oversized name degrades to a truncated label
/// rather than failing the whole download with a builder error (500).
const MAX_DOWNLOAD_FILENAME_BYTES: usize = 200;

/// Produce a `Content-Disposition` filename that cannot inject header bytes or
/// path separators. Keeps a conservative set of characters and falls back to a
/// neutral name when nothing safe survives.
fn sanitized_download_filename(filename: Option<&str>) -> String {
    let candidate: String = filename
        .unwrap_or("download")
        .chars()
        .map(|c| match c {
            'a'..='z' | 'A'..='Z' | '0'..='9' | '.' | '-' | '_' | ' ' => c,
            _ => '_',
        })
        .collect();
    // Bound the length on a char boundary (every retained char is ASCII here, so
    // each is one byte) before trimming, so the cap can't leave a stray leading
    // dot/space at the new end.
    let bounded = if candidate.len() > MAX_DOWNLOAD_FILENAME_BYTES {
        &candidate[..MAX_DOWNLOAD_FILENAME_BYTES]
    } else {
        candidate.as_str()
    };
    let trimmed = bounded.trim_matches([' ', '.']).to_string();
    if trimmed.is_empty() {
        "download".to_string()
    } else {
        trimmed
    }
}

/// `GET /api/webchat/v2/threads/{thread_id}/messages/{message_id}/attachments/{attachment_id}`
///
/// Serves one landed attachment's raw bytes so the browser can render an image
/// thumbnail (or download a file) for a persisted message. The `(thread_id,
/// message_id, attachment_id)` triple addresses the attachment; the caller's
/// authority comes from the authenticated session, and the facade derives the
/// scope and resolves the storage path server-side. The response sets the
/// authoritative `Content-Type` from the stored ref plus `nosniff` and a short
/// private cache so the browser can reuse the bytes without re-fetching.
pub async fn get_attachment(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path((thread_id, message_id, attachment_id)): Path<(String, String, String)>,
) -> Result<Response, WebUiV2HttpError> {
    let attachment = state
        .services()
        .read_attachment(
            caller,
            RebornAttachmentRequest {
                thread_id,
                message_id,
                attachment_id,
            },
        )
        .await?;

    let mut headers = HeaderMap::new();
    // The mime came from the stored ref; fall back to octet-stream if it is not
    // a valid header value rather than failing the read.
    let content_type = HeaderValue::from_str(&attachment.mime_type)
        .unwrap_or_else(|_| HeaderValue::from_static("application/octet-stream"));
    headers.insert(header::CONTENT_TYPE, content_type);
    headers.insert(
        header::X_CONTENT_TYPE_OPTIONS,
        HeaderValue::from_static("nosniff"),
    );
    headers.insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("private, max-age=300"),
    );
    Ok((StatusCode::OK, headers, attachment.bytes).into_response())
}

/// SSE polling cadence for `stream_events`. The facade only exposes a
/// drain-style read; once the backlog is flushed the handler waits this
/// long before checking for newly arrived events.
const SSE_POLL_INTERVAL: Duration = Duration::from_secs(1);

/// Upper bound for idle `stream_events` polling. A browser tab with no
/// pending projection events should not keep revalidating/draining through
/// remote durable storage every second forever, especially on high-RTT
/// hosted Postgres.
const SSE_IDLE_POLL_MAX_INTERVAL: Duration = Duration::from_secs(3);

/// SSE keep-alive cadence. axum emits an SSE comment line every interval
/// to keep proxies from closing the idle connection.
const SSE_KEEPALIVE_INTERVAL: Duration = Duration::from_secs(15);

/// HTTP header the browser's `EventSource` sends on auto-reconnect to
/// resume an SSE stream. The value is the `id:` of the last successfully
/// delivered event; for this surface the handler sets that to the JSON-
/// serialized projection cursor.
const LAST_EVENT_ID_HEADER: &str = "last-event-id";

fn sse_poll_interval_for_idle_polls(idle_polls: u32) -> Duration {
    match idle_polls {
        0 | 1 => SSE_POLL_INTERVAL,
        2 => Duration::from_secs(2),
        _ => SSE_IDLE_POLL_MAX_INTERVAL,
    }
}

/// `GET /api/webchat/v2/threads/{thread_id}/events`
///
/// Server-Sent Events stream. Each event carries one
/// [`WebChatV2EventFrame`] as JSON with the projection cursor as the
/// SSE `id` so the browser can resume from the last delivered event.
///
/// Resume cursor precedence: `Last-Event-ID` header (sent automatically
/// by the browser's `EventSource` on reconnect) wins over the
/// `?after_cursor=...` query parameter. Both are optional — first
/// connects pass neither and start from the projection origin.
///
/// The handler acquires a per-`(tenant, user)` concurrency slot before
/// returning the stream; callers at or above the configured cap receive
/// `429 Too Many Requests` with `retryable: true`. Each stream is also
/// closed after [`SSE_MAX_LIFETIME`] so the browser must reconnect with
/// `Last-Event-ID`, which bounds drift and recycles slots even under
/// long-running tab leaks.
///
/// When the facade supports subscriptions, the handler forwards that live
/// stream directly. Older compositions fall back to drain/poll semantics,
/// documented on [`RebornServicesApi::stream_events`].
///
/// [`WebChatV2EventFrame`]: crate::schema::WebChatV2EventFrame
/// [`RebornServicesApi::stream_events`]: ironclaw_product_workflow::RebornServicesApi::stream_events
/// [`SSE_MAX_LIFETIME`]: crate::sse_capacity::SSE_MAX_LIFETIME
pub async fn stream_events(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    headers: HeaderMap,
    Query(query): Query<StreamEventsQuery>,
) -> Result<Response, WebUiV2HttpError> {
    let slot = state
        .sse_capacity()
        .try_acquire(&caller.tenant_id, &caller.user_id)
        .ok_or_else(sse_concurrency_exhausted)?;
    let services = state.services().clone();
    let initial_cursor = headers
        .get(LAST_EVENT_ID_HEADER)
        // silent-ok: non-visible-ASCII Last-Event-ID is treated as absent so the
        // handler falls back to the query param / origin, matching the standard
        // EventSource contract (server SHOULD ignore a malformed Last-Event-ID).
        .and_then(|value| value.to_str().ok())
        .map(str::to_string)
        .or(query.after_cursor);
    let stream = build_sse_stream(services, caller, thread_id, initial_cursor, slot);
    let mut response = Sse::new(stream)
        .keep_alive(KeepAlive::new().interval(SSE_KEEPALIVE_INTERVAL))
        .into_response();
    response.headers_mut().insert(
        header::CACHE_CONTROL,
        HeaderValue::from_static("no-cache, no-transform"),
    );
    response.headers_mut().insert(
        HeaderName::from_static("x-accel-buffering"),
        HeaderValue::from_static("no"),
    );
    Ok(response)
}

/// Build the 429 response for SSE openings that exceed the per-caller
/// concurrency cap. `retryable: true` because the slot will free as soon
/// as one of the caller's existing streams closes.
fn sse_concurrency_exhausted() -> WebUiV2HttpError {
    WebUiV2HttpError::from(RebornServicesError {
        code: RebornServicesErrorCode::RateLimited,
        kind: RebornServicesErrorKind::Busy,
        status_code: 429,
        retryable: true,
        field: None,
        validation_code: None,
    })
}

/// Query parameters for `stream_events`. `after_cursor` is the opaque
/// projection cursor the browser saw last; on first connect it is omitted
/// so the handler drains from the origin.
#[derive(Debug, Default, Deserialize)]
pub struct StreamEventsQuery {
    #[serde(default)]
    pub after_cursor: Option<String>,
}

/// Redacted SSE error payload. Defined as a typed struct (not built with
/// `serde_json::json!`) so the `Serialize` derive is total — serialization
/// cannot fail on a tagged enum + bool, so there is no fallback branch.
#[derive(Debug, Clone, Serialize)]
struct SseErrorPayload {
    error: RebornServicesErrorCode,
    kind: RebornServicesErrorKind,
    retryable: bool,
}

fn webchat_sse_event_from_envelope(envelope: ProductOutboundEnvelope) -> Option<Event> {
    let frame = WebChatV2EventFrame::from_outbound(envelope);
    let id = cursor_token(frame.cursor());
    match serde_json::to_string(&frame) {
        Ok(payload) => {
            let mut event = Event::default().event(frame.event_name()).data(payload);
            if let Some(id) = id {
                event = event.id(id);
            }
            Some(event)
        }
        Err(error) => {
            // debug, not warn: this is an internal diagnostic, not
            // user-facing status, and info!/warn! corrupts the REPL/TUI
            // per CLAUDE.md.
            tracing::debug!(
                target = "ironclaw_webui_v2::sse",
                error = %error,
                "failed to serialize WebChatV2EventFrame for SSE",
            );
            None
        }
    }
}

fn sse_error_event(error: RebornServicesError) -> Event {
    let payload = SseErrorPayload {
        error: error.code,
        kind: error.kind,
        retryable: error.retryable,
    };
    match Event::default().event("error").json_data(payload) {
        Ok(event) => event,
        Err(error) => {
            tracing::debug!(
                target = "ironclaw_webui_v2::sse",
                error = %error,
                "failed to serialize redacted SSE error payload",
            );
            Event::default()
                .event("error")
                .data(r#"{"error":"unavailable","kind":"service_unavailable","retryable":true}"#)
        }
    }
}

fn build_sse_stream(
    services: std::sync::Arc<dyn RebornServicesApi>,
    caller: WebUiAuthenticatedCaller,
    thread_id: String,
    initial_cursor: Option<String>,
    slot: SseSlot,
) -> impl Stream<Item = Result<Event, Infallible>> {
    async_stream::stream! {
        // The slot guard moves into the generator and stays alive for
        // the lifetime of this stream. It drops automatically when the
        // generator is dropped (client disconnect, max-lifetime expiry,
        // or facade error), releasing the per-caller concurrency slot.
        let _slot_guard = slot;
        let started_at = tokio::time::Instant::now();
        let mut after_cursor = initial_cursor.and_then(parse_cursor_token);
        if services.supports_stream_events_subscription() {
            let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
            if remaining.is_zero() {
                return;
            }
            let request = RebornStreamEventsRequest {
                thread_id: thread_id.clone(),
                after_cursor: after_cursor.clone(),
            };
            let mut subscription = match tokio::time::timeout(
                remaining,
                services.subscribe_events(caller.clone(), request),
            )
            .await
            {
                Err(_elapsed) => {
                    tracing::debug!(
                        target = "ironclaw_webui_v2::sse",
                        "stream_events subscription pending past SSE_MAX_LIFETIME; closing stream"
                    );
                    return;
                }
                Ok(Ok(subscription)) => subscription,
                Ok(Err(error)) => {
                    tracing::debug!(
                        target = "ironclaw_webui_v2::sse",
                        error = ?error,
                        "facade rejected SSE subscription; closing stream",
                    );
                    yield Ok(sse_error_event(error));
                    return;
                }
            };
            loop {
                let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                if remaining.is_zero() {
                    return;
                }
                match tokio::time::timeout(remaining, subscription.next()).await {
                    Err(_elapsed) => {
                        tracing::debug!(
                            target = "ironclaw_webui_v2::sse",
                            "stream_events subscription pending past SSE_MAX_LIFETIME; closing stream"
                        );
                        return;
                    }
                    Ok(Some(Ok(envelope))) => {
                        if let Some(event) = webchat_sse_event_from_envelope(envelope) {
                            yield Ok(event);
                        }
                    }
                    Ok(Some(Err(error))) => {
                        tracing::debug!(
                            target = "ironclaw_webui_v2::sse",
                            error = ?error,
                            "facade rejected SSE subscription event; closing stream",
                        );
                        yield Ok(sse_error_event(error));
                        return;
                    }
                    Ok(None) => return,
                }
            }
        }

        let mut idle_polls = 0_u32;
        loop {
            // Force a clean close once the budget is exhausted so the
            // browser can reconnect with Last-Event-ID; this caps single-
            // stream lifetime regardless of client behavior and recycles
            // the slot. `remaining` also bounds the await below so a
            // stuck projection drain cannot pin the slot past the budget.
            let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
            if remaining.is_zero() {
                return;
            }
            let request = RebornStreamEventsRequest {
                thread_id: thread_id.clone(),
                after_cursor: after_cursor.clone(),
            };
            match tokio::time::timeout(
                remaining,
                services.stream_events(caller.clone(), request),
            )
            .await
            {
                Err(_elapsed) => {
                    // The facade drain was still pending when SSE_MAX_LIFETIME
                    // ran out. Returning here drops the generator (and the
                    // SseSlot it owns), so the per-caller concurrency budget
                    // recovers even under a stuck projection stream — without
                    // this bound, an unbounded `.await` on a non-resolving
                    // facade would pin the slot indefinitely.
                    tracing::debug!(
                        target = "ironclaw_webui_v2::sse",
                        "stream_events drain pending past SSE_MAX_LIFETIME; closing stream"
                    );
                    return;
                }
                Ok(Ok(response)) => {
                    let had_events = !response.events.is_empty();
                    if let Some(latest) = response.events.last() {
                        after_cursor = Some(latest.projection_cursor.clone());
                    }
                    for envelope in response.events {
                        if let Some(event) = webchat_sse_event_from_envelope(envelope) {
                            yield Ok(event);
                        }
                    }
                    if had_events {
                        // The production projection facade waits on its live
                        // subscription when no new item is replayable. Re-enter
                        // it immediately after delivering a batch so assistant
                        // text deltas are not delayed by the idle poll cadence.
                        idle_polls = 0;
                        continue;
                    }
                    idle_polls = idle_polls.saturating_add(1);
                    // Bound the poll sleep too so we never oversleep past the
                    // lifetime budget; the top-of-loop check then fires.
                    let sleep_for = sse_poll_interval_for_idle_polls(idle_polls)
                        .min(SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed()));
                    if sleep_for.is_zero() {
                        return;
                    }
                    tokio::time::sleep(sleep_for).await;
                }
                Ok(Err(error)) => {
                    // Surface a redacted error event and close the stream.
                    // Reconnect logic is the browser's responsibility.
                    tracing::debug!(
                        target = "ironclaw_webui_v2::sse",
                        error = ?error,
                        "facade rejected SSE drain; closing stream",
                    );
                    yield Ok(sse_error_event(error));
                    return;
                }
            }
        }
    }
}

fn parse_cursor_token(token: String) -> Option<ProjectionCursor> {
    // The wire form is the JSON-serialized cursor; we accept it verbatim
    // so the browser can echo back the `id` of the last SSE event it saw
    // (which is exactly that JSON).
    serde_json::from_str(&token).ok()
}

fn cursor_token(cursor: &ProjectionCursor) -> Option<String> {
    serde_json::to_string(cursor).ok()
}

/// `POST /api/webchat/v2/threads/{thread_id}/runs/{run_id}/cancel`
///
/// Body shape: [`WebUiCancelRunRequest`] (path `thread_id` and `run_id`
/// override body values).
pub async fn cancel_run(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(CancelRunPath { thread_id, run_id }): Path<CancelRunPath>,
    Json(mut body): Json<WebUiCancelRunRequest>,
) -> Result<Json<RebornCancelRunResponse>, WebUiV2HttpError> {
    body.thread_id = Some(thread_id);
    body.run_id = Some(run_id);
    let response = state.services().cancel_run(caller, body).await?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct CancelRunPath {
    pub thread_id: String,
    pub run_id: String,
}

/// `POST /api/webchat/v2/threads/{thread_id}/runs/{run_id}/gates/{gate_ref}/resolve`
///
/// Body shape: [`WebUiResolveGateRequest`] (path overrides body for
/// `thread_id`, `run_id`, `gate_ref`).
pub async fn resolve_gate(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ResolveGatePath {
        thread_id,
        run_id,
        gate_ref,
    }): Path<ResolveGatePath>,
    Json(mut body): Json<WebUiResolveGateRequest>,
) -> Result<Json<RebornResolveGateResponse>, WebUiV2HttpError> {
    body.thread_id = Some(thread_id);
    body.run_id = Some(run_id);
    body.gate_ref = Some(gate_ref);
    let response = state.services().resolve_gate(caller, body).await?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct ResolveGatePath {
    pub thread_id: String,
    pub run_id: String,
    pub gate_ref: String,
}

/// `POST /api/webchat/v2/threads/{thread_id}/runs/{run_id}/retry`
///
/// Body shape: [`WebUiRetryRunRequest`] (path overrides body for
/// `thread_id` and `run_id`).
pub async fn retry_run(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(RetryRunPath { thread_id, run_id }): Path<RetryRunPath>,
    Json(mut body): Json<WebUiRetryRunRequest>,
) -> Result<Json<RebornRetryRunResponse>, WebUiV2HttpError> {
    body.thread_id = Some(thread_id);
    body.run_id = Some(run_id);
    let response = state.services().retry_run(caller, body).await?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct RetryRunPath {
    pub thread_id: String,
    pub run_id: String,
}

/// `GET /api/webchat/v2/threads`
///
/// Lists threads scoped to the authenticated caller. Pagination is
/// opaque: the response carries an optional `next_cursor` the browser
/// echoes back as `?cursor=...` on the next page request.
pub async fn list_threads(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<ListThreadsQuery>,
) -> Result<Json<RebornListThreadsResponse>, WebUiV2HttpError> {
    let request = WebUiListThreadsRequest {
        limit: query.limit,
        cursor: query.cursor,
        candidate_thread_id: query.candidate_thread_id,
        needs_approval: query.needs_approval,
    };
    let response = state.services().list_threads(caller, request).await?;
    Ok(Json(response))
}

#[derive(Debug, Default, Deserialize)]
pub struct ListThreadsQuery {
    #[serde(default)]
    pub limit: Option<u32>,
    #[serde(default)]
    pub cursor: Option<String>,
    #[serde(default)]
    pub candidate_thread_id: Option<String>,
    #[serde(default)]
    pub needs_approval: bool,
}

/// `GET /api/webchat/v2/automations`
///
/// Lists the caller-scoped schedule automations visible to the browser. The
/// optional `?limit=N` and `?run_limit=N` queries are capped by the product
/// workflow facade; the response is a single bounded page and does not include
/// a cursor. By default only active automations are returned; pass
/// `?include_completed=true` to also include soft-completed (fire-once)
/// automations. See [`ListAutomationsQuery`] for the full per-parameter parse
/// behavior.
pub async fn list_automations(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<ListAutomationsQuery>,
) -> Result<Json<RebornListAutomationsResponse>, WebUiV2HttpError> {
    let request = WebUiListAutomationsRequest {
        limit: query.limit,
        run_limit: query.run_limit,
        include_completed: query.include_completed,
    };
    let response = state.services().list_automations(caller, request).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/automations/:automation_id/pause`
pub async fn pause_automation(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(automation_id): Path<String>,
) -> Result<Json<RebornAutomationMutationResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .pause_automation(caller, automation_id)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/automations/:automation_id/resume`
pub async fn resume_automation(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(automation_id): Path<String>,
) -> Result<Json<RebornAutomationMutationResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .resume_automation(caller, automation_id)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/automations/:automation_id`
pub async fn rename_automation(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(automation_id): Path<String>,
    Json(request): Json<WebUiRenameAutomationRequest>,
) -> Result<Json<RebornAutomationMutationResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .rename_automation(caller, automation_id, request)
        .await?;
    Ok(Json(response))
}

/// `DELETE /api/webchat/v2/automations/:automation_id`
pub async fn delete_automation(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(automation_id): Path<String>,
) -> Result<Json<RebornAutomationMutationResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .delete_automation(caller, automation_id)
        .await?;
    Ok(Json(response))
}

#[derive(Debug, Default, Deserialize)]
pub struct ListAutomationsQuery {
    /// Optional maximum number of schedule automations to return.
    #[serde(default)]
    pub limit: Option<u32>,
    /// Optional maximum number of recent runs to return per automation row.
    #[serde(default)]
    pub run_limit: Option<u32>,
    /// When `true`, soft-completed (fire-once) automations are included
    /// alongside active ones.
    ///
    /// Parse behavior (via `serde_urlencoded` / axum `Query<T>`):
    /// - **Absent** (`?` or no param): defaults to `false` (active-only).
    /// - **`true`** / **`false`**: parsed as the corresponding boolean.
    /// - **Malformed** (e.g. `?include_completed=garbage`): deserialization
    ///   fails at the `Query` extractor and the request is rejected with
    ///   `400 Bad Request` before the handler runs. There is no silent
    ///   fallback to `false` for unparseable values.
    #[serde(default)]
    pub include_completed: bool,
}

/// `GET /api/webchat/v2/traces/credit`
///
/// Read-only Trace Commons credit summary scoped strictly to the
/// authenticated caller — the facade derives the trace scope from the
/// caller's user id; no scope input is accepted from the request. The
/// response is the contributor-local view as of the last credit sync;
/// the authoritative ledger is server-side. A caller with no local
/// Trace Commons state receives the unenrolled zero-state, not an
/// error.
pub async fn trace_credits(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornTraceCreditsResponse>, WebUiV2HttpError> {
    let response = state.services().trace_credits(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/traces/account`
///
/// Read-only list of the authenticated caller's submitted Trace Commons traces,
/// fetched per-user from the server. Scope is derived from the caller; no input
/// is accepted. Unenrolled callers receive the zero-state, not an error.
pub async fn trace_account_traces(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornAccountTracesResponse>, WebUiV2HttpError> {
    let response = state.services().trace_account_traces(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/traces/account-login-link`
///
/// Mint a one-time Trace Commons browser login link for the authenticated
/// caller (hosted users have no host-file access; this response is the only
/// delivery channel). Scope is derived from the caller; no input is accepted.
/// Unenrolled callers receive the zero-state, not an error. SECURITY: the
/// returned URL is a one-time account credential — it must never be logged.
pub async fn trace_account_login_link(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornAccountLoginLinkResponse>, WebUiV2HttpError> {
    let response = state.services().trace_account_login_link(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/traces/holds/{submission_id}/authorize`
///
/// Authorize a held manual-review trace for submission (promote-as-is). The
/// trace scope is derived from the authenticated caller; the `submission_id`
/// path segment is never authority to cross scopes. A missing/already-resolved
/// hold returns `{ authorized: false }`, not an error.
pub async fn authorize_trace_hold(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(submission_id): Path<String>,
) -> Result<Json<RebornTraceHoldAuthorizeResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .authorize_trace_hold(caller, submission_id)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/channels/connectable`
pub async fn list_connectable_channels(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornConnectableChannelListResponse>, WebUiV2HttpError> {
    let response = state.services().list_connectable_channels(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/outbound/preferences`
pub async fn get_outbound_preferences(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornOutboundPreferencesResponse>, WebUiV2HttpError> {
    let response = state.services().get_outbound_preferences(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/outbound/preferences`
///
/// Body shape: [`RebornSetOutboundPreferencesRequest`]. Sending
/// `{"final_reply_target_id": null}` clears the configured final-reply target.
pub async fn set_outbound_preferences(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<RebornSetOutboundPreferencesRequest>,
) -> Result<Json<RebornOutboundPreferencesResponse>, WebUiV2HttpError> {
    require_settings_policy_decision(&state, &caller, SettingsPolicyAction::ChannelEgress).await?;
    let before_snapshot = load_outbound_preferences_snapshot(&state, &caller).await?;
    let response = state
        .services()
        .set_outbound_preferences(caller.clone(), body)
        .await?;
    let after_snapshot = outbound_preferences_snapshot_from_response(&response);
    write_generated_channel_config_audit(
        &state,
        &caller,
        CHANNEL_CONFIG_OUTBOUND_PREFERENCES,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/outbound/targets`
pub async fn list_outbound_delivery_targets(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornOutboundDeliveryTargetListResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .list_outbound_delivery_targets(caller)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/extensions`
pub async fn list_extensions(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornExtensionListResponse>, WebUiV2HttpError> {
    let response = state.services().list_extensions(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/skills`
pub async fn list_skills(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornSkillListResponse>, WebUiV2HttpError> {
    let response = state.services().list_skills(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/skills/search`
pub async fn search_skills(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<SearchSkillsBody>,
) -> Result<Json<RebornSkillSearchResponse>, WebUiV2HttpError> {
    let response = state.services().search_skills(caller, body.query).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/skills/install`
pub async fn install_skill(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<InstallSkillBody>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .install_skill(caller, body.name, body.content)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/skills/{name}`
pub async fn get_skill_content(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(SkillPath { name }): Path<SkillPath>,
) -> Result<Json<RebornSkillContentResponse>, WebUiV2HttpError> {
    let response = state.services().read_skill_content(caller, name).await?;
    Ok(Json(response))
}

/// `PUT /api/webchat/v2/skills/{name}`
pub async fn update_skill(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(SkillPath { name }): Path<SkillPath>,
    Json(body): Json<UpdateSkillBody>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .update_skill(caller, name, body.content)
        .await?;
    Ok(Json(response))
}

/// `DELETE /api/webchat/v2/skills/{name}`
pub async fn remove_skill(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(SkillPath { name }): Path<SkillPath>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    let response = state.services().remove_skill(caller, name).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/skills/{name}/auto-activate`
pub async fn set_skill_auto_activate(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(SkillPath { name }): Path<SkillPath>,
    Json(body): Json<SetSkillAutoActivateBody>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    let before_snapshot = load_skill_auto_activate_snapshot(&state, &caller, &name).await?;
    let response = state
        .services()
        .set_skill_auto_activate(caller.clone(), name.clone(), body.enabled)
        .await?;
    let after_snapshot = skill_restore_snapshot(SKILL_RESTORE_AUTO_ACTIVATE_KIND, body.enabled);
    write_generated_skill_audit(
        &state,
        &caller,
        &name,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/skills/auto-activate-learned`
pub async fn set_auto_activate_learned(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<SetSkillAutoActivateBody>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    let before_snapshot = load_auto_activate_learned_snapshot(&state, &caller).await?;
    let response = state
        .services()
        .set_auto_activate_learned(caller.clone(), body.enabled)
        .await?;
    let after_snapshot =
        skill_restore_snapshot(SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND, body.enabled);
    write_generated_skill_audit(
        &state,
        &caller,
        SKILL_AUTO_ACTIVATE_LEARNED_ENTITY_ID,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/extensions/registry`
pub async fn list_extension_registry(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
) -> Result<Json<RebornExtensionRegistryResponse>, WebUiV2HttpError> {
    let response = state.services().list_extension_registry(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/install`
pub async fn install_extension(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Json(body): Json<InstallExtensionBody>,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(Ok(body.package_ref), "package_ref")?;
    let response = state
        .services()
        .install_extension(caller, package_ref)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/import` — admin-only: upload a standalone
/// tool bundle (a zip with manifest.toml + wasm/ + schemas/ + prompts/). The
/// bundle is unpacked, validated, written under `/system/extensions/<id>/`, and
/// added to the Registry. Gated on `operator_webui_config` (admin).
pub async fn import_extension(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    body: axum::body::Bytes,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state
        .services()
        .import_extension(caller, body.to_vec())
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/{package_id}/activate`
pub async fn activate_extension(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .activate_extension(caller, package_ref)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/{package_id}/remove`
pub async fn remove_extension(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .remove_extension(caller, package_ref)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/extensions/{package_id}/setup`
pub async fn get_extension_setup(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
) -> Result<Json<RebornSetupExtensionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .setup_extension(caller, package_ref, WebUiSetupExtensionRequest::default())
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/{package_id}/setup`
///
/// V2-native route that returns a product-safe lifecycle projection. The route
/// exists so the v2 entrypoint inventory is complete and so future onboarding
/// port work has a stable surface to fill in without coupling this crate to v1
/// onboarding controllers.
///
/// The path segment is lifted into a lifecycle package ref at the
/// handler/facade boundary; a malformed identifier returns `400
/// invalid_argument` before the facade is called.
pub async fn setup_extension(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
    Json(body): Json<WebUiSetupExtensionRequest>,
) -> Result<Json<RebornSetupExtensionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .setup_extension(caller, package_ref, body)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/{package_id}/setup/test-connection`
pub async fn test_extension_connection(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
    Json(body): Json<WebUiTestExtensionConnectionRequest>,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .test_extension_connection(caller, package_ref, body)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/extensions/{package_id}/setup/test-message`
pub async fn send_extension_test_message(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(ExtensionPackagePath { package_id }): Path<ExtensionPackagePath>,
    Json(body): Json<WebUiTestExtensionConnectionRequest>,
) -> Result<Json<RebornExtensionActionResponse>, WebUiV2HttpError> {
    require_settings_policy_decision(&state, &caller, SettingsPolicyAction::ChannelEgress).await?;
    let package_ref = extension_package_ref_for_request(
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, package_id),
        "package_id",
    )?;
    let response = state
        .services()
        .send_extension_test_message(caller, package_ref, body)
        .await?;
    Ok(Json(response))
}

fn require_operator_webui_config(
    capabilities: WebUiV2Capabilities,
) -> Result<(), WebUiV2HttpError> {
    if capabilities.operator_webui_config {
        return Ok(());
    }
    Err(RebornServicesError {
        code: RebornServicesErrorCode::Forbidden,
        kind: RebornServicesErrorKind::ParticipantDenied,
        status_code: 403,
        retryable: false,
        field: None,
        validation_code: None,
    }
    .into())
}

/// `GET /api/webchat/v2/operator/setup`
pub async fn get_operator_setup(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorSetupResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().get_operator_setup(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/operator/setup`
pub async fn run_operator_setup(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<RebornOperatorSetupRequest>,
) -> Result<Json<RebornOperatorSetupResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().run_operator_setup(caller, body).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/settings/tools`
pub async fn list_settings_tools(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response.entries.retain(|entry| {
        entry.key == SETTINGS_TOOLS_AUTO_APPROVE_KEY
            || entry.key.starts_with(SETTINGS_TOOL_CONFIG_PREFIX)
    });
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct SettingsToolsAutoApproveRequest {
    pub enabled: bool,
}

/// `POST /api/webchat/v2/settings/tools`
pub async fn set_settings_tools_auto_approve(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<SettingsToolsAutoApproveRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    let response = state
        .services()
        .set_operator_config_key(
            caller,
            SETTINGS_TOOLS_AUTO_APPROVE_KEY.to_string(),
            RebornOperatorConfigSetRequest {
                value: serde_json::json!(body.enabled),
            },
        )
        .await?;
    validate_settings_tool_config_response(&response)?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct SettingsToolPermissionPath {
    pub capability_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsToolPermissionRequest {
    pub state: SettingsToolPermissionState,
}

#[derive(Debug, Clone, Copy)]
enum SettingsPolicyAction {
    ToolPermissionWrite,
    ToolExecution,
    ChannelEgress,
    DelegationAdmit,
    DelegationDispatch,
    DelegationResolve,
    DelegationCancel,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum SettingsPolicyDecision {
    Allow,
    Deny,
    Escalate,
}

impl SettingsPolicyDecision {
    fn reason_code(self) -> &'static str {
        match self {
            Self::Allow => "policy_allow",
            Self::Deny => "policy_deny",
            Self::Escalate => "policy_escalate",
        }
    }
}

impl SettingsPolicyAction {
    fn as_rule_key(self) -> &'static str {
        match self {
            Self::ToolPermissionWrite => "tool.permission.write",
            Self::ToolExecution => "tool.execution",
            Self::ChannelEgress => "channel.egress",
            Self::DelegationAdmit => "delegation.admit",
            Self::DelegationDispatch => "delegation.dispatch",
            Self::DelegationResolve => "delegation.resolve",
            Self::DelegationCancel => "delegation.cancel",
        }
    }
}

/// `POST /api/webchat/v2/settings/tools/{capability_id}`
pub async fn set_settings_tool_permission(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsToolPermissionPath { capability_id }): Path<SettingsToolPermissionPath>,
    Json(body): Json<SettingsToolPermissionRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_tool_capability_id(&capability_id)?;
    require_settings_policy_decision(
        &state,
        &caller,
        SettingsPolicyAction::ToolPermissionWrite,
    )
    .await?;
    let key =
        validate_operator_config_key(format!("{SETTINGS_TOOL_CONFIG_PREFIX}{capability_id}"))?;
    let response = state
        .services()
        .set_operator_config_key(
            caller,
            key,
            RebornOperatorConfigSetRequest {
                value: serde_json::json!({ "state": body.state }),
            },
        )
        .await?;
    validate_settings_tool_config_response(&response)?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct SettingsModelProfilePath {
    pub profile_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsIdentityPath {
    pub identity_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsMemoryPath {
    pub memory_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsToolPolicyPath {
    pub policy_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsChannelConfigPath {
    pub config_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsSkillRevertPath {
    pub skill_id: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct SettingsModelProfileUpsertRequest {
    pub model: String,
    #[serde(default)]
    pub temperature: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettingsIdentitySubjectType {
    System,
    Agent,
    User,
    Channel,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsIdentityUpsertRequest {
    pub subject_type: SettingsIdentitySubjectType,
    pub subject_id: String,
    #[serde(default)]
    pub tone: Option<String>,
    #[serde(default)]
    pub role_description: Option<String>,
    #[serde(default)]
    pub organization_context: Option<String>,
    #[serde(default)]
    pub constraints: Vec<String>,
    #[serde(default)]
    pub version: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettingsMemoryScope {
    Identity,
    Project,
    Agent,
    Global,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsMemoryUpsertRequest {
    pub scope: SettingsMemoryScope,
    #[serde(default)]
    pub owner_id: Option<String>,
    pub title: String,
    pub content: String,
    #[serde(default)]
    pub tags: Vec<String>,
    #[serde(default)]
    pub visibility: Option<String>,
    #[serde(default)]
    pub version: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettingsToolPolicyScope {
    Global,
    Channel,
    Agent,
    Profile,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsToolPolicyUpsertRequest {
    pub scope: SettingsToolPolicyScope,
    #[serde(default)]
    pub allow_rules: Vec<String>,
    #[serde(default)]
    pub deny_rules: Vec<String>,
    #[serde(default)]
    pub escalation_rules: Vec<String>,
    #[serde(default)]
    pub version: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsToolPolicyRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsModelProfileRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsIdentityRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsMemoryRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsAgentRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsChannelConfigRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsSkillRevertRequest {
    pub audit_id: String,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettingsDelegationAction {
    Admit,
    Dispatch,
    Resolve,
    Cancel,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SettingsDelegationResolution {
    Completed,
    Failed,
    Rejected,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsDelegationUpsertRequest {
    pub source_agent_id: String,
    pub target_agent_id: String,
    #[serde(default = "default_requested_profile")]
    pub requested_profile_id: String,
    #[serde(default)]
    pub resolved_model_profile_id: Option<String>,
    pub action: SettingsDelegationAction,
    #[serde(default)]
    pub resolution: Option<SettingsDelegationResolution>,
    #[serde(default)]
    pub policy_context: Option<String>,
    #[serde(default)]
    pub prompt: Option<String>,
}

fn default_requested_profile() -> String {
    "default".to_string()
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsAuditUpsertRequest {
    pub actor_id: String,
    pub entity_type: String,
    pub entity_id: String,
    pub action: String,
    #[serde(default)]
    pub before_snapshot: Option<serde_json::Value>,
    #[serde(default)]
    pub after_snapshot: Option<serde_json::Value>,
    #[serde(default)]
    pub summary: Option<String>,
    #[serde(default)]
    pub created_at: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct SettingsAuditDiffEntry {
    pub path: String,
    pub change: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub before: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub after: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize)]
pub struct SettingsAuditRestoreValidation {
    pub supported: bool,
    pub status: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reason: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub revert_endpoint: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct SettingsAuditDiffResponse {
    pub audit_id: String,
    pub actor_id: String,
    pub entity_type: String,
    pub entity_id: String,
    pub action: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub summary: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub before_snapshot: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub after_snapshot: Option<serde_json::Value>,
    pub diff: Vec<SettingsAuditDiffEntry>,
    pub restore_validation: SettingsAuditRestoreValidation,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum RevertEntityKind {
    ModelProfile,
    Identity,
    Memory,
    ToolPolicy,
    Agent,
    ChannelConfig,
    Skill,
}

/// `GET /api/webchat/v2/settings/model-profiles`
pub async fn list_settings_model_profiles(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_MODEL_PROFILE_CONFIG_PREFIX));
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/model-profiles/{profile_id}`
pub async fn upsert_settings_model_profile(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsModelProfilePath { profile_id }): Path<SettingsModelProfilePath>,
    Json(body): Json<SettingsModelProfileUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("profile_id", &profile_id, SETTINGS_MODEL_PROFILE_ID_MAX_BYTES)?;
    let key = validate_operator_config_key(format!(
        "{SETTINGS_MODEL_PROFILE_CONFIG_PREFIX}{profile_id}"
    ))?;
    let before_snapshot = load_model_profile_snapshot(&state, &caller, &key).await?;
    let after_snapshot = serde_json::to_value(&body).map_err(RebornServicesError::internal_from)?;
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            key,
            RebornOperatorConfigSetRequest {
                value: after_snapshot.clone(),
            },
        )
        .await?;
    write_generated_model_profile_audit(
        &state,
        &caller,
        &response.entry.key,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    if response
        .entry
        .key
        .starts_with(SETTINGS_MODEL_PROFILE_CONFIG_PREFIX)
    {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/model-profiles/{profile_id}/revert`
pub async fn revert_settings_model_profile(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsModelProfilePath { profile_id }): Path<SettingsModelProfilePath>,
    Json(body): Json<SettingsModelProfileRevertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("profile_id", &profile_id, SETTINGS_MODEL_PROFILE_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let profile_key = validate_operator_config_key(format!(
        "{SETTINGS_MODEL_PROFILE_CONFIG_PREFIX}{profile_id}"
    ))?;
    let current_snapshot = load_model_profile_snapshot(&state, &caller, &profile_key).await?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::ModelProfile,
        &profile_id,
        SETTINGS_MODEL_PROFILE_ID_MAX_BYTES,
    )
    .await?;

    let value = model_profile_from_snapshot(snapshot)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            profile_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;

    write_generated_model_profile_audit(
        &state,
        &caller,
        &response.entry.key,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    if response
        .entry
        .key
        .starts_with(SETTINGS_MODEL_PROFILE_CONFIG_PREFIX)
    {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `GET /api/webchat/v2/settings/identity`
pub async fn list_settings_identity(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_IDENTITY_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::Identity,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/identity/{identity_id}`
pub async fn upsert_settings_identity(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsIdentityPath { identity_id }): Path<SettingsIdentityPath>,
    Json(body): Json<SettingsIdentityUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("identity_id", &identity_id, SETTINGS_IDENTITY_ID_MAX_BYTES)?;
    validate_settings_identity_payload(&body)?;
    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Identity,
        &identity_id,
    ))?;
    let before_snapshot = load_identity_snapshot(&state, &caller, &key).await?;
    let document = IdentityDocument {
        id: identity_id,
        subject_type: to_identity_subject_type(body.subject_type),
        subject_id: body.subject_id,
        tone: body.tone,
        role_description: body.role_description,
        organization_context: body.organization_context,
        constraints: body.constraints,
        version: body.version,
    };
    let value = domain_record_value_without_id(document).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(caller.clone(), key, RebornOperatorConfigSetRequest { value })
        .await?;
    write_generated_identity_audit(
        &state,
        &caller,
        &response.entry.key,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    if response.entry.key.starts_with(SETTINGS_IDENTITY_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/identity/{identity_id}/revert`
pub async fn revert_settings_identity(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsIdentityPath { identity_id }): Path<SettingsIdentityPath>,
    Json(body): Json<SettingsIdentityRevertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("identity_id", &identity_id, SETTINGS_IDENTITY_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let identity_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Identity,
        &identity_id,
    ))?;
    let current_snapshot = load_identity_snapshot(&state, &caller, &identity_key).await?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::Identity,
        &identity_id,
        SETTINGS_IDENTITY_ID_MAX_BYTES,
    )
    .await?;

    let document = identity_from_snapshot(&identity_id, snapshot)?;
    let value = domain_record_value_without_id(document).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            identity_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;

    write_generated_identity_audit(
        &state,
        &caller,
        &response.entry.key,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    if response.entry.key.starts_with(SETTINGS_IDENTITY_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `GET /api/webchat/v2/settings/memory`
pub async fn list_settings_memory(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_MEMORY_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::Memory,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/memory/{memory_id}`
pub async fn upsert_settings_memory(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsMemoryPath { memory_id }): Path<SettingsMemoryPath>,
    Json(body): Json<SettingsMemoryUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("memory_id", &memory_id, SETTINGS_MEMORY_ID_MAX_BYTES)?;
    validate_settings_memory_payload(&body)?;
    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Memory,
        &memory_id,
    ))?;
    let before_snapshot = load_memory_snapshot(&state, &caller, &key).await?;
    let item = MemoryItem {
        id: memory_id,
        scope: to_memory_scope(body.scope),
        owner_id: body.owner_id,
        title: body.title,
        content: body.content,
        tags: body.tags,
        visibility: body.visibility,
        version: body.version,
    };
    let value = domain_record_value_without_id(item).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(caller.clone(), key, RebornOperatorConfigSetRequest { value })
        .await?;
    write_generated_memory_audit(
        &state,
        &caller,
        &response.entry.key,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    if response.entry.key.starts_with(SETTINGS_MEMORY_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/memory/{memory_id}/revert`
pub async fn revert_settings_memory(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsMemoryPath { memory_id }): Path<SettingsMemoryPath>,
    Json(body): Json<SettingsMemoryRevertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("memory_id", &memory_id, SETTINGS_MEMORY_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let memory_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Memory,
        &memory_id,
    ))?;
    let current_snapshot = load_memory_snapshot(&state, &caller, &memory_key).await?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::Memory,
        &memory_id,
        SETTINGS_MEMORY_ID_MAX_BYTES,
    )
    .await?;

    let item = memory_from_snapshot(&memory_id, snapshot)?;
    let value = domain_record_value_without_id(item).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            memory_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;

    write_generated_memory_audit(
        &state,
        &caller,
        &response.entry.key,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    if response.entry.key.starts_with(SETTINGS_MEMORY_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `GET /api/webchat/v2/settings/tool-policies`
pub async fn list_settings_tool_policies(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_TOOL_POLICY_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::ToolPolicy,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/tool-policies/{policy_id}`
pub async fn upsert_settings_tool_policy(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsToolPolicyPath { policy_id }): Path<SettingsToolPolicyPath>,
    Json(body): Json<SettingsToolPolicyUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("policy_id", &policy_id, SETTINGS_TOOL_POLICY_ID_MAX_BYTES)?;
    validate_settings_tool_policy_payload(&body)?;
    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::ToolPolicy,
        &policy_id,
    ))?;
    let before_snapshot = load_tool_policy_snapshot(&state, &caller, &key).await?;
    let policy = ToolPolicy {
        id: policy_id,
        scope: to_tool_policy_scope(body.scope),
        allow_rules: body.allow_rules,
        deny_rules: body.deny_rules,
        escalation_rules: body.escalation_rules,
        version: body.version,
    };
    let value = domain_record_value_without_id(policy).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(caller.clone(), key, RebornOperatorConfigSetRequest { value })
        .await?;
    write_generated_tool_policy_audit(
        &state,
        &caller,
        &response.entry.key,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    if response
        .entry
        .key
        .starts_with(SETTINGS_TOOL_POLICY_CONFIG_PREFIX)
    {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/tool-policies/{policy_id}/revert`
pub async fn revert_settings_tool_policy(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsToolPolicyPath { policy_id }): Path<SettingsToolPolicyPath>,
    Json(body): Json<SettingsToolPolicyRevertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("policy_id", &policy_id, SETTINGS_TOOL_POLICY_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let tool_policy_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::ToolPolicy,
        &policy_id,
    ))?;
    let current_snapshot = load_tool_policy_snapshot(&state, &caller, &tool_policy_key).await?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::ToolPolicy,
        &policy_id,
        SETTINGS_TOOL_POLICY_ID_MAX_BYTES,
    )
    .await?;

    let policy = tool_policy_from_snapshot(&policy_id, snapshot)?;
    let value = domain_record_value_without_id(policy).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            tool_policy_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;

    write_generated_tool_policy_audit(
        &state,
        &caller,
        &response.entry.key,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    if response
        .entry
        .key
        .starts_with(SETTINGS_TOOL_POLICY_CONFIG_PREFIX)
    {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

#[derive(Debug, Deserialize)]
pub struct SettingsAgentPath {
    pub agent_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsDelegationPath {
    pub task_id: String,
}

#[derive(Debug, Deserialize)]
pub struct SettingsAuditPath {
    pub audit_id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettingsAgentUpsertRequest {
    pub display_name: String,
    pub role: String,
    pub default_profile_id: String,
    pub policy_binding_id: String,
    pub status: String,
}

/// `GET /api/webchat/v2/settings/agents`
pub async fn list_settings_agents(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_AGENT_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::Agent,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/agents/{agent_id}`
pub async fn upsert_settings_agent(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsAgentPath { agent_id }): Path<SettingsAgentPath>,
    Json(body): Json<SettingsAgentUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("agent_id", &agent_id, SETTINGS_AGENT_ID_MAX_BYTES)?;
    validate_settings_agent_payload(&body)?;
    let resolved_default_profile_id = resolve_settings_model_profile_id(
        &state,
        &caller,
        SettingsModelProfileResolutionRequest {
            requested_profile_id: &body.default_profile_id,
            explicit_resolved_profile_id: None,
            requested_field: "default_profile_id",
            resolved_field: "resolved_model_profile_id",
        },
    )
    .await?;
    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Agent,
        &agent_id,
    ))?;
    let before_snapshot = load_agent_snapshot(&state, &caller, &key).await?;
    let entry = AgentRosterEntry {
        id: agent_id,
        display_name: body.display_name,
        role: body.role,
        default_profile_id: resolved_default_profile_id,
        policy_binding_id: body.policy_binding_id,
        status: body.status,
    };
    let value = domain_record_value_without_id(entry).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(caller.clone(), key, RebornOperatorConfigSetRequest { value })
        .await?;
    write_generated_agent_audit(
        &state,
        &caller,
        &response.entry.key,
        before_snapshot,
        after_snapshot,
        "upsert",
    )
    .await?;
    if response.entry.key.starts_with(SETTINGS_AGENT_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/agents/{agent_id}/revert`
pub async fn revert_settings_agent(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsAgentPath { agent_id }): Path<SettingsAgentPath>,
    Json(body): Json<SettingsAgentRevertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("agent_id", &agent_id, SETTINGS_AGENT_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let agent_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Agent,
        &agent_id,
    ))?;
    let current_snapshot = load_agent_snapshot(&state, &caller, &agent_key).await?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::Agent,
        &agent_id,
        SETTINGS_AGENT_ID_MAX_BYTES,
    )
    .await?;

    let entry = agent_from_snapshot(&agent_id, snapshot)?;
    let value = domain_record_value_without_id(entry).map_err(RebornServicesError::internal_from)?;
    let after_snapshot = value.clone();
    let response = state
        .services()
        .set_operator_config_key(
            caller.clone(),
            agent_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;

    write_generated_agent_audit(
        &state,
        &caller,
        &response.entry.key,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    if response.entry.key.starts_with(SETTINGS_AGENT_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `POST /api/webchat/v2/settings/channel-config/{config_id}/revert`
pub async fn revert_settings_channel_config(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsChannelConfigPath { config_id }): Path<SettingsChannelConfigPath>,
    Json(body): Json<SettingsChannelConfigRevertRequest>,
) -> Result<Json<RebornOutboundPreferencesResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("config_id", &config_id, SETTINGS_CHANNEL_CONFIG_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;
    if config_id != CHANNEL_CONFIG_OUTBOUND_PREFERENCES {
        return Err(bad_request_with("config_id", WebUiInboundValidationCode::InvalidValue));
    }

    let current_snapshot = load_outbound_preferences_snapshot(&state, &caller).await?;
    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::ChannelConfig,
        &config_id,
        SETTINGS_CHANNEL_CONFIG_ID_MAX_BYTES,
    )
    .await?;
    let request = outbound_preferences_request_from_snapshot(snapshot)?;

    let response = state
        .services()
        .set_outbound_preferences(caller.clone(), request)
        .await?;

    let after_snapshot = outbound_preferences_snapshot_from_response(&response);
    write_generated_channel_config_audit(
        &state,
        &caller,
        &config_id,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/skills/{skill_id}/revert`
pub async fn revert_settings_skill(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsSkillRevertPath { skill_id }): Path<SettingsSkillRevertPath>,
    Json(body): Json<SettingsSkillRevertRequest>,
) -> Result<Json<RebornSkillActionResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("skill_id", &skill_id, SETTINGS_SKILL_ID_MAX_BYTES)?;
    validate_settings_config_entity_id("audit_id", &body.audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;

    let snapshot = load_revert_before_snapshot(
        &state,
        &caller,
        &body.audit_id,
        RevertEntityKind::Skill,
        &skill_id,
        SETTINGS_SKILL_ID_MAX_BYTES,
    )
    .await?;
    let restore = skill_restore_from_snapshot(snapshot)?;

    let current_snapshot = if restore.kind == SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND {
        if skill_id != SKILL_AUTO_ACTIVATE_LEARNED_ENTITY_ID {
            return Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue));
        }
        load_auto_activate_learned_snapshot(&state, &caller).await?
    } else {
        load_skill_auto_activate_snapshot(&state, &caller, &skill_id).await?
    };

    let response = if restore.kind == SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND {
        state
            .services()
            .set_auto_activate_learned(caller.clone(), restore.enabled)
            .await?
    } else {
        state
            .services()
            .set_skill_auto_activate(caller.clone(), skill_id.clone(), restore.enabled)
            .await?
    };

    let after_snapshot = skill_restore_snapshot(restore.kind, restore.enabled);
    let audit_entity_id = if restore.kind == SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND {
        SKILL_AUTO_ACTIVATE_LEARNED_ENTITY_ID
    } else {
        &skill_id
    };
    write_generated_skill_audit(
        &state,
        &caller,
        audit_entity_id,
        current_snapshot,
        after_snapshot,
        "revert",
    )
    .await?;

    Ok(Json(response))
}

/// `GET /api/webchat/v2/settings/delegations`
pub async fn list_settings_delegations(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_DELEGATION_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::Delegation,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `POST /api/webchat/v2/settings/delegations/{task_id}`
pub async fn upsert_settings_delegation(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsDelegationPath { task_id }): Path<SettingsDelegationPath>,
    Json(body): Json<SettingsDelegationUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("task_id", &task_id, SETTINGS_DELEGATION_ID_MAX_BYTES)?;
    validate_settings_config_entity_id(
        "source_agent_id",
        &body.source_agent_id,
        SETTINGS_AGENT_ID_MAX_BYTES,
    )?;
    validate_settings_config_entity_id(
        "target_agent_id",
        &body.target_agent_id,
        SETTINGS_AGENT_ID_MAX_BYTES,
    )?;
    validate_settings_config_entity_id(
        "requested_profile_id",
        &body.requested_profile_id,
        SETTINGS_MODEL_PROFILE_ID_MAX_BYTES,
    )?;
    require_settings_policy_decision(
        &state,
        &caller,
        delegation_policy_action(body.action),
    )
    .await?;

    let resolved_model_profile_id = resolve_settings_model_profile_id(
        &state,
        &caller,
        SettingsModelProfileResolutionRequest {
            requested_profile_id: &body.requested_profile_id,
            explicit_resolved_profile_id: body.resolved_model_profile_id.as_deref(),
            requested_field: "requested_profile_id",
            resolved_field: "resolved_model_profile_id",
        },
    )
    .await?;

    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Delegation,
        &task_id,
    ))?;
    let current = load_operator_config_value(&state, &caller, &key).await?;
    let next = transition_delegation_task(
        &task_id,
        current,
        SettingsDelegationUpsertRequest {
            resolved_model_profile_id: Some(resolved_model_profile_id),
            ..body
        },
    )?;
    let value = domain_record_value_without_id(next).map_err(RebornServicesError::internal_from)?;
    let response = state
        .services()
        .set_operator_config_key(caller, key, RebornOperatorConfigSetRequest { value })
        .await?;
    if response
        .entry
        .key
        .starts_with(SETTINGS_DELEGATION_CONFIG_PREFIX)
    {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `GET /api/webchat/v2/settings/audit`
pub async fn list_settings_audit(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    let mut response = state.services().list_operator_config(caller).await?;
    response
        .entries
        .retain(|entry| entry.key.starts_with(SETTINGS_AUDIT_CONFIG_PREFIX));
    for entry in &mut response.entries {
        entry.value = normalize_governed_authoring_entry_value(
            GovernedAuthoringKind::Audit,
            &entry.key,
            std::mem::take(&mut entry.value),
        )?;
    }
    Ok(Json(response))
}

/// `GET /api/webchat/v2/settings/audit/{audit_id}/diff`
pub async fn get_settings_audit_diff(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsAuditPath { audit_id }): Path<SettingsAuditPath>,
) -> Result<Json<SettingsAuditDiffResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("audit_id", &audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;
    let audit_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Audit,
        &audit_id,
    ))?;
    let audit_value = load_operator_config_value(&state, &caller, &audit_key)
        .await?
        .ok_or_else(|| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))?;
    let entry: AuditEntry =
        domain_record_from_key_value(GovernedAuthoringKind::Audit, &audit_key, audit_value)?;

    let before_snapshot = entry.before_snapshot.clone();
    let after_snapshot = entry.after_snapshot.clone();
    let diff = compute_audit_diff(before_snapshot.as_ref(), after_snapshot.as_ref());
    let restore_validation = restore_validation_for_audit_entry(&entry);

    Ok(Json(SettingsAuditDiffResponse {
        audit_id,
        actor_id: entry.actor_id,
        entity_type: entry.entity_type,
        entity_id: entry.entity_id,
        action: entry.action,
        summary: entry.summary,
        created_at: entry.created_at,
        before_snapshot,
        after_snapshot,
        diff,
        restore_validation,
    }))
}

/// `POST /api/webchat/v2/settings/audit/{audit_id}`
pub async fn upsert_settings_audit_entry(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(_capabilities): Extension<WebUiV2Capabilities>,
    Path(SettingsAuditPath { audit_id }): Path<SettingsAuditPath>,
    Json(body): Json<SettingsAuditUpsertRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    validate_settings_config_entity_id("audit_id", &audit_id, SETTINGS_AUDIT_ID_MAX_BYTES)?;
    validate_settings_audit_payload(&body)?;
    let key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Audit,
        &audit_id,
    ))?;
    let entry = AuditEntry {
        id: audit_id,
        actor_id: body.actor_id,
        entity_type: body.entity_type,
        entity_id: body.entity_id,
        action: body.action,
        before_snapshot: body.before_snapshot,
        after_snapshot: body.after_snapshot,
        summary: body.summary,
        created_at: body.created_at,
    };
    let value = domain_record_value_without_id(entry).map_err(RebornServicesError::internal_from)?;
    let response = state
        .services()
        .set_operator_config_key(caller, key, RebornOperatorConfigSetRequest { value })
        .await?;
    if response.entry.key.starts_with(SETTINGS_AUDIT_CONFIG_PREFIX) {
        return Ok(Json(response));
    }
    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

fn bad_request_with(field: &'static str, code: WebUiInboundValidationCode) -> WebUiV2HttpError {
    RebornServicesError::from(WebUiInboundValidationError::new(field, code)).into()
}

fn validate_settings_identity_payload(
    body: &SettingsIdentityUpsertRequest,
) -> Result<(), WebUiV2HttpError> {
    if body.subject_id.trim().is_empty() {
        return Err(bad_request_with("subject_id", WebUiInboundValidationCode::Blank));
    }
    Ok(())
}

fn validate_settings_memory_payload(body: &SettingsMemoryUpsertRequest) -> Result<(), WebUiV2HttpError> {
    if body.title.trim().is_empty() {
        return Err(bad_request_with("title", WebUiInboundValidationCode::Blank));
    }
    if body.content.trim().is_empty() {
        return Err(bad_request_with("content", WebUiInboundValidationCode::Blank));
    }
    Ok(())
}

fn validate_settings_tool_policy_payload(
    body: &SettingsToolPolicyUpsertRequest,
) -> Result<(), WebUiV2HttpError> {
    if body.allow_rules.is_empty() && body.deny_rules.is_empty() && body.escalation_rules.is_empty() {
        return Err(bad_request_with("allow_rules", WebUiInboundValidationCode::Blank));
    }
    Ok(())
}

fn validate_settings_audit_payload(body: &SettingsAuditUpsertRequest) -> Result<(), WebUiV2HttpError> {
    if body.actor_id.trim().is_empty() {
        return Err(bad_request_with("actor_id", WebUiInboundValidationCode::Blank));
    }
    if body.entity_type.trim().is_empty() {
        return Err(bad_request_with("entity_type", WebUiInboundValidationCode::Blank));
    }
    if body.action.trim().is_empty() {
        return Err(bad_request_with("action", WebUiInboundValidationCode::Blank));
    }
    Ok(())
}

fn validate_tool_policy_revert_target(
    entry: &AuditEntry,
    policy_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "tool_policy" || entry.entity_type == "policy";
    let valid_entity_id = entry.entity_id == policy_id
        || entry.entity_id == format!("tool_policy.{policy_id}")
        || entry.entity_id == format!("policy/{policy_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_identity_revert_target(
    entry: &AuditEntry,
    identity_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "identity";
    let valid_entity_id = entry.entity_id == identity_id
        || entry.entity_id == format!("identity.{identity_id}")
        || entry.entity_id == format!("identity/{identity_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_memory_revert_target(
    entry: &AuditEntry,
    memory_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "memory";
    let valid_entity_id = entry.entity_id == memory_id
        || entry.entity_id == format!("memory.{memory_id}")
        || entry.entity_id == format!("memory/{memory_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_model_profile_revert_target(
    entry: &AuditEntry,
    profile_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "model_profile";
    let valid_entity_id = entry.entity_id == profile_id
        || entry.entity_id == format!("model_profile.{profile_id}")
        || entry.entity_id == format!("model_profile/{profile_id}")
        || entry.entity_id == format!("profile.{profile_id}")
        || entry.entity_id == format!("profile/{profile_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_agent_revert_target(
    entry: &AuditEntry,
    agent_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "agent";
    let valid_entity_id = entry.entity_id == agent_id
        || entry.entity_id == format!("agent.{agent_id}")
        || entry.entity_id == format!("agent/{agent_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_channel_config_revert_target(
    entry: &AuditEntry,
    config_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "channel_config";
    let valid_entity_id = entry.entity_id == config_id
        || entry.entity_id == format!("channel_config.{config_id}")
        || entry.entity_id == format!("channel_config/{config_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn validate_skill_revert_target(
    entry: &AuditEntry,
    skill_id: &str,
) -> Result<(), WebUiV2HttpError> {
    let valid_entity_type = entry.entity_type == "skill";
    let valid_entity_id = entry.entity_id == skill_id
        || entry.entity_id == format!("skill.{skill_id}")
        || entry.entity_id == format!("skill/{skill_id}");

    if valid_entity_type && valid_entity_id {
        return Ok(());
    }
    Err(bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

async fn load_revert_before_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    audit_id: &str,
    entity_kind: RevertEntityKind,
    entity_id: &str,
    _max_entity_id_bytes: usize,
) -> Result<serde_json::Value, WebUiV2HttpError> {
    let audit_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Audit,
        audit_id,
    ))?;
    let audit_value = load_operator_config_value(state, caller, &audit_key)
        .await?
        .ok_or_else(|| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))?;
    let audit_entry: AuditEntry =
        domain_record_from_key_value(GovernedAuthoringKind::Audit, &audit_key, audit_value)?;

    match entity_kind {
        RevertEntityKind::ModelProfile => {
            validate_model_profile_revert_target(&audit_entry, entity_id)?
        }
        RevertEntityKind::Identity => validate_identity_revert_target(&audit_entry, entity_id)?,
        RevertEntityKind::Memory => validate_memory_revert_target(&audit_entry, entity_id)?,
        RevertEntityKind::ToolPolicy => validate_tool_policy_revert_target(&audit_entry, entity_id)?,
        RevertEntityKind::Agent => validate_agent_revert_target(&audit_entry, entity_id)?,
        RevertEntityKind::ChannelConfig => {
            validate_channel_config_revert_target(&audit_entry, entity_id)?
        }
        RevertEntityKind::Skill => validate_skill_revert_target(&audit_entry, entity_id)?,
    }

    audit_entry
        .before_snapshot
        .ok_or_else(|| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
}

fn compute_audit_diff(
    before_snapshot: Option<&serde_json::Value>,
    after_snapshot: Option<&serde_json::Value>,
) -> Vec<SettingsAuditDiffEntry> {
    let mut entries = Vec::new();
    collect_audit_diff("$", before_snapshot, after_snapshot, &mut entries);
    entries
}

fn collect_audit_diff(
    path: &str,
    before: Option<&serde_json::Value>,
    after: Option<&serde_json::Value>,
    output: &mut Vec<SettingsAuditDiffEntry>,
) {
    if before == after {
        return;
    }

    match (before, after) {
        (Some(serde_json::Value::Object(before_map)), Some(serde_json::Value::Object(after_map))) => {
            let mut keys = BTreeSet::new();
            keys.extend(before_map.keys().cloned());
            keys.extend(after_map.keys().cloned());
            for key in keys {
                let next_path = format!("{path}.{key}");
                collect_audit_diff(
                    &next_path,
                    before_map.get(&key),
                    after_map.get(&key),
                    output,
                );
            }
        }
        (Some(serde_json::Value::Array(before_items)), Some(serde_json::Value::Array(after_items))) => {
            if before_items != after_items {
                output.push(SettingsAuditDiffEntry {
                    path: path.to_string(),
                    change: "modified".to_string(),
                    before: Some(serde_json::Value::Array(before_items.clone())),
                    after: Some(serde_json::Value::Array(after_items.clone())),
                });
            }
        }
        (None, Some(after_value)) => {
            output.push(SettingsAuditDiffEntry {
                path: path.to_string(),
                change: "added".to_string(),
                before: None,
                after: Some(after_value.clone()),
            });
        }
        (Some(before_value), None) => {
            output.push(SettingsAuditDiffEntry {
                path: path.to_string(),
                change: "removed".to_string(),
                before: Some(before_value.clone()),
                after: None,
            });
        }
        (Some(before_value), Some(after_value)) => {
            output.push(SettingsAuditDiffEntry {
                path: path.to_string(),
                change: "modified".to_string(),
                before: Some(before_value.clone()),
                after: Some(after_value.clone()),
            });
        }
        (None, None) => {}
    }
}

fn restore_validation_for_audit_entry(entry: &AuditEntry) -> SettingsAuditRestoreValidation {
    let Some((entity_kind, canonical_entity_id)) = parse_restore_target(entry) else {
        return SettingsAuditRestoreValidation {
            supported: false,
            status: "ineligible".to_string(),
            reason: Some("unsupported_entity".to_string()),
            revert_endpoint: None,
        };
    };

    if entry.before_snapshot.is_none() {
        return SettingsAuditRestoreValidation {
            supported: false,
            status: "ineligible".to_string(),
            reason: Some("missing_before_snapshot".to_string()),
            revert_endpoint: None,
        };
    }

    let revert_endpoint = match entity_kind {
        RevertEntityKind::ModelProfile => {
            format!("/api/webchat/v2/settings/model-profiles/{canonical_entity_id}/revert")
        }
        RevertEntityKind::Identity => {
            format!("/api/webchat/v2/settings/identity/{canonical_entity_id}/revert")
        }
        RevertEntityKind::Memory => {
            format!("/api/webchat/v2/settings/memory/{canonical_entity_id}/revert")
        }
        RevertEntityKind::ToolPolicy => {
            format!("/api/webchat/v2/settings/tool-policies/{canonical_entity_id}/revert")
        }
        RevertEntityKind::Agent => {
            format!("/api/webchat/v2/settings/agents/{canonical_entity_id}/revert")
        }
        RevertEntityKind::ChannelConfig => {
            format!("/api/webchat/v2/settings/channel-config/{canonical_entity_id}/revert")
        }
        RevertEntityKind::Skill => {
            format!("/api/webchat/v2/settings/skills/{canonical_entity_id}/revert")
        }
    };

    SettingsAuditRestoreValidation {
        supported: true,
        status: "eligible".to_string(),
        reason: None,
        revert_endpoint: Some(revert_endpoint),
    }
}

fn parse_restore_target(entry: &AuditEntry) -> Option<(RevertEntityKind, String)> {
    match entry.entity_type.as_str() {
        "model_profile" | "profile" => extract_model_profile_entity_id(&entry.entity_id)
            .map(|id| (RevertEntityKind::ModelProfile, id)),
        "identity" => extract_canonical_entity_id(&entry.entity_id, "identity")
            .map(|id| (RevertEntityKind::Identity, id)),
        "memory" => {
            extract_canonical_entity_id(&entry.entity_id, "memory")
                .map(|id| (RevertEntityKind::Memory, id))
        }
        "tool_policy" | "policy" => extract_tool_policy_entity_id(&entry.entity_id)
            .map(|id| (RevertEntityKind::ToolPolicy, id)),
        "agent" => extract_canonical_entity_id(&entry.entity_id, "agent")
            .map(|id| (RevertEntityKind::Agent, id)),
        "channel_config" => extract_channel_config_entity_id(&entry.entity_id)
            .map(|id| (RevertEntityKind::ChannelConfig, id)),
        "skill" => extract_skill_entity_id(&entry.entity_id)
            .map(|id| (RevertEntityKind::Skill, id)),
        _ => None,
    }
}

fn extract_canonical_entity_id(entity_id: &str, prefix: &str) -> Option<String> {
    if entity_id.is_empty() {
        return None;
    }
    if let Some(stripped) = entity_id.strip_prefix(&format!("{prefix}.")) {
        return (!stripped.is_empty()).then(|| stripped.to_string());
    }
    if let Some(stripped) = entity_id.strip_prefix(&format!("{prefix}/")) {
        return (!stripped.is_empty()).then(|| stripped.to_string());
    }
    Some(entity_id.to_string())
}

fn extract_tool_policy_entity_id(entity_id: &str) -> Option<String> {
    if entity_id.is_empty() {
        return None;
    }
    for prefix in ["tool_policy.", "tool_policy/", "policy.", "policy/"] {
        if let Some(stripped) = entity_id.strip_prefix(prefix) {
            return (!stripped.is_empty()).then(|| stripped.to_string());
        }
    }
    Some(entity_id.to_string())
}

fn extract_model_profile_entity_id(entity_id: &str) -> Option<String> {
    if entity_id.is_empty() {
        return None;
    }
    for prefix in ["model_profile.", "model_profile/", "profile.", "profile/"] {
        if let Some(stripped) = entity_id.strip_prefix(prefix) {
            return (!stripped.is_empty()).then(|| stripped.to_string());
        }
    }
    Some(entity_id.to_string())
}

fn extract_channel_config_entity_id(entity_id: &str) -> Option<String> {
    if entity_id.is_empty() {
        return None;
    }
    for prefix in ["channel_config.", "channel_config/"] {
        if let Some(stripped) = entity_id.strip_prefix(prefix) {
            return (!stripped.is_empty()).then(|| stripped.to_string());
        }
    }
    Some(entity_id.to_string())
}

fn extract_skill_entity_id(entity_id: &str) -> Option<String> {
    if entity_id.is_empty() {
        return None;
    }
    for prefix in ["skill.", "skill/"] {
        if let Some(stripped) = entity_id.strip_prefix(prefix) {
            return (!stripped.is_empty()).then(|| stripped.to_string());
        }
    }
    Some(entity_id.to_string())
}

fn identity_from_snapshot(
    identity_id: &str,
    snapshot: serde_json::Value,
) -> Result<IdentityDocument, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(mut map) => {
            map.insert(
                "id".to_string(),
                serde_json::Value::String(identity_id.to_string()),
            );
            serde_json::from_value(serde_json::Value::Object(map))
                .map_err(|_| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
        }
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

fn memory_from_snapshot(
    memory_id: &str,
    snapshot: serde_json::Value,
) -> Result<MemoryItem, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(mut map) => {
            map.insert(
                "id".to_string(),
                serde_json::Value::String(memory_id.to_string()),
            );
            serde_json::from_value(serde_json::Value::Object(map))
                .map_err(|_| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
        }
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

fn tool_policy_from_snapshot(
    policy_id: &str,
    snapshot: serde_json::Value,
) -> Result<ToolPolicy, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(mut map) => {
            map.insert(
                "id".to_string(),
                serde_json::Value::String(policy_id.to_string()),
            );
            serde_json::from_value(serde_json::Value::Object(map))
                .map_err(|_| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
        }
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

fn model_profile_from_snapshot(
    snapshot: serde_json::Value,
) -> Result<serde_json::Value, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(_) => Ok(snapshot),
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

fn agent_from_snapshot(
    agent_id: &str,
    snapshot: serde_json::Value,
) -> Result<AgentRosterEntry, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(mut map) => {
            map.insert(
                "id".to_string(),
                serde_json::Value::String(agent_id.to_string()),
            );
            serde_json::from_value(serde_json::Value::Object(map))
                .map_err(|_| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))
        }
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

fn outbound_preferences_request_from_snapshot(
    snapshot: serde_json::Value,
) -> Result<RebornSetOutboundPreferencesRequest, WebUiV2HttpError> {
    match snapshot {
        serde_json::Value::Object(mut map) => {
            let target = map.remove("final_reply_target_id");
            let final_reply_target_id = match target {
                Some(serde_json::Value::Null) | None => None,
                Some(serde_json::Value::String(value)) => {
                    Some(RebornOutboundDeliveryTargetId::new(value).map_err(|_| {
                        bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue)
                    })?)
                }
                _ => {
                    return Err(bad_request_with(
                        "audit_id",
                        WebUiInboundValidationCode::InvalidValue,
                    ));
                }
            };
            Ok(RebornSetOutboundPreferencesRequest {
                final_reply_target_id,
            })
        }
        _ => Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

#[derive(Debug, Clone, Copy)]
struct SkillRestoreSnapshot<'a> {
    kind: &'a str,
    enabled: bool,
}

fn skill_restore_from_snapshot(
    snapshot: serde_json::Value,
) -> Result<SkillRestoreSnapshot<'static>, WebUiV2HttpError> {
    let serde_json::Value::Object(map) = snapshot else {
        return Err(bad_request_with(
            "audit_id",
            WebUiInboundValidationCode::InvalidValue,
        ));
    };

    let kind = map
        .get("kind")
        .and_then(|value| value.as_str())
        .ok_or_else(|| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))?;
    let enabled = map
        .get("enabled")
        .and_then(|value| value.as_bool())
        .ok_or_else(|| bad_request_with("audit_id", WebUiInboundValidationCode::InvalidValue))?;

    let canonical_kind = match kind {
        SKILL_RESTORE_AUTO_ACTIVATE_KIND => SKILL_RESTORE_AUTO_ACTIVATE_KIND,
        SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND => SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND,
        _ => {
            return Err(bad_request_with(
                "audit_id",
                WebUiInboundValidationCode::InvalidValue,
            ));
        }
    };

    Ok(SkillRestoreSnapshot {
        kind: canonical_kind,
        enabled,
    })
}

fn skill_restore_snapshot(kind: &str, enabled: bool) -> serde_json::Value {
    serde_json::json!({
        "kind": kind,
        "enabled": enabled,
    })
}

fn outbound_preferences_snapshot_from_response(
    response: &RebornOutboundPreferencesResponse,
) -> serde_json::Value {
    serde_json::json!({
        "final_reply_target_id": response
            .final_reply_target
            .as_ref()
            .map(|target| target.target_id.as_str().to_string())
    })
}

fn generated_audit_id(prefix: &str, entity_id: &str) -> String {
    let now_millis = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis();
    let timestamp = now_millis.to_string();
    let reserved = prefix.len() + 1 + 1 + timestamp.len();
    let max_entity_len = SETTINGS_AUDIT_ID_MAX_BYTES.saturating_sub(reserved);
    let entity_prefix = if entity_id.len() > max_entity_len {
        &entity_id[..max_entity_len]
    } else {
        entity_id
    };
    format!("{prefix}.{entity_prefix}.{timestamp}")
}

async fn load_tool_policy_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    let value = load_operator_config_value(state, caller, key).await?;
    let Some(snapshot) = value else {
        return Ok(None);
    };

    let record: ToolPolicy =
        domain_record_from_key_value(GovernedAuthoringKind::ToolPolicy, key, snapshot)?;
    let normalized =
        domain_record_value_without_id(record).map_err(RebornServicesError::internal_from)?;
    Ok(Some(normalized))
}

async fn load_identity_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    let value = load_operator_config_value(state, caller, key).await?;
    let Some(snapshot) = value else {
        return Ok(None);
    };

    let record: IdentityDocument =
        domain_record_from_key_value(GovernedAuthoringKind::Identity, key, snapshot)?;
    let normalized =
        domain_record_value_without_id(record).map_err(RebornServicesError::internal_from)?;
    Ok(Some(normalized))
}

async fn load_memory_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    let value = load_operator_config_value(state, caller, key).await?;
    let Some(snapshot) = value else {
        return Ok(None);
    };

    let record: MemoryItem =
        domain_record_from_key_value(GovernedAuthoringKind::Memory, key, snapshot)?;
    let normalized =
        domain_record_value_without_id(record).map_err(RebornServicesError::internal_from)?;
    Ok(Some(normalized))
}

async fn load_model_profile_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    load_operator_config_value(state, caller, key).await
}

async fn load_agent_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    let value = load_operator_config_value(state, caller, key).await?;
    let Some(snapshot) = value else {
        return Ok(None);
    };

    let record: AgentRosterEntry =
        domain_record_from_key_value(GovernedAuthoringKind::Agent, key, snapshot)?;
    let normalized =
        domain_record_value_without_id(record).map_err(RebornServicesError::internal_from)?;
    Ok(Some(normalized))
}

async fn load_outbound_preferences_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    match state.services().get_outbound_preferences(caller.clone()).await {
        Ok(response) => Ok(Some(outbound_preferences_snapshot_from_response(&response))),
        Err(error) => {
            tracing::debug!(?error, "failed to read outbound preferences snapshot for audit");
            Ok(None)
        }
    }
}

async fn load_skill_auto_activate_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    skill_name: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    match state.services().list_skills(caller.clone()).await {
        Ok(response) => Ok(response
            .skills
            .iter()
            .find(|skill| skill.name == skill_name)
            .map(|skill| skill_restore_snapshot(SKILL_RESTORE_AUTO_ACTIVATE_KIND, skill.auto_activate))),
        Err(error) => {
            tracing::debug!(?error, "failed to read skill auto-activate snapshot for audit");
            Ok(None)
        }
    }
}

async fn load_auto_activate_learned_snapshot(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    match state.services().list_skills(caller.clone()).await {
        Ok(response) => Ok(Some(skill_restore_snapshot(
            SKILL_RESTORE_AUTO_ACTIVATE_LEARNED_KIND,
            response.auto_activate_learned,
        ))),
        Err(error) => {
            tracing::debug!(?error, "failed to read global skill auto-activate snapshot for audit");
            Ok(None)
        }
    }
}

async fn write_generated_tool_policy_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    let policy_id = governed_authoring::parse_config_key(GovernedAuthoringKind::ToolPolicy, key)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;
    write_generated_entity_audit(
        state,
        caller,
        "tp",
        "tool_policy",
        policy_id,
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_identity_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    let identity_id = governed_authoring::parse_config_key(GovernedAuthoringKind::Identity, key)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;
    write_generated_entity_audit(
        state,
        caller,
        "id",
        "identity",
        identity_id,
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_memory_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    let memory_id = governed_authoring::parse_config_key(GovernedAuthoringKind::Memory, key)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;
    write_generated_entity_audit(
        state,
        caller,
        "mem",
        "memory",
        memory_id,
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_model_profile_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    let profile_id = key
        .strip_prefix(SETTINGS_MODEL_PROFILE_CONFIG_PREFIX)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;
    write_generated_entity_audit(
        state,
        caller,
        "mp",
        "model_profile",
        profile_id.to_string(),
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_agent_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    let agent_id = governed_authoring::parse_config_key(GovernedAuthoringKind::Agent, key)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;
    write_generated_entity_audit(
        state,
        caller,
        "ag",
        "agent",
        agent_id,
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_channel_config_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    config_id: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    write_generated_entity_audit(
        state,
        caller,
        "ch",
        "channel_config",
        config_id.to_string(),
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_skill_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    skill_id: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
    action: &str,
) -> Result<(), WebUiV2HttpError> {
    write_generated_entity_audit(
        state,
        caller,
        "sk",
        "skill",
        skill_id.to_string(),
        action,
        before_snapshot,
        normalized_after_snapshot,
    )
    .await
}

async fn write_generated_entity_audit(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    id_prefix: &str,
    entity_type: &str,
    entity_id: String,
    action: &str,
    before_snapshot: Option<serde_json::Value>,
    normalized_after_snapshot: serde_json::Value,
) -> Result<(), WebUiV2HttpError> {
    let actor_id = caller.user_id.to_string();
    let entry = AuditEntry {
        id: generated_audit_id(id_prefix, &entity_id),
        actor_id,
        entity_type: entity_type.to_string(),
        entity_id,
        action: action.to_string(),
        before_snapshot,
        after_snapshot: Some(normalized_after_snapshot),
        summary: None,
        created_at: None,
    };
    let audit_key = validate_operator_config_key(governed_authoring::config_key(
        GovernedAuthoringKind::Audit,
        &entry.id,
    ))?;
    let value = domain_record_value_without_id(entry).map_err(RebornServicesError::internal_from)?;
    state
        .services()
        .set_operator_config_key(
            caller.clone(),
            audit_key,
            RebornOperatorConfigSetRequest { value },
        )
        .await?;
    Ok(())
}

fn validate_settings_agent_payload(body: &SettingsAgentUpsertRequest) -> Result<(), WebUiV2HttpError> {
    if body.display_name.trim().is_empty() {
        return Err(bad_request_with("display_name", WebUiInboundValidationCode::Blank));
    }
    if body.role.trim().is_empty() {
        return Err(bad_request_with("role", WebUiInboundValidationCode::Blank));
    }
    if body.default_profile_id.trim().is_empty() {
        return Err(bad_request_with("default_profile_id", WebUiInboundValidationCode::Blank));
    }
    if body.policy_binding_id.trim().is_empty() {
        return Err(bad_request_with("policy_binding_id", WebUiInboundValidationCode::Blank));
    }
    if body.status.trim().is_empty() {
        return Err(bad_request_with("status", WebUiInboundValidationCode::Blank));
    }
    Ok(())
}

struct SettingsModelProfileResolutionRequest<'a> {
    requested_profile_id: &'a str,
    explicit_resolved_profile_id: Option<&'a str>,
    requested_field: &'static str,
    resolved_field: &'static str,
}

async fn resolve_settings_model_profile_id(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    request: SettingsModelProfileResolutionRequest<'_>,
) -> Result<String, WebUiV2HttpError> {
    let response = state.services().list_operator_config(caller.clone()).await?;
    resolve_settings_model_profile_id_from_entries(&response, request)
}

fn resolve_settings_model_profile_id_from_entries(
    response: &RebornOperatorConfigListResponse,
    request: SettingsModelProfileResolutionRequest<'_>,
) -> Result<String, WebUiV2HttpError> {
    let has_model_profile = |profile_id: &str| {
        let key = format!("{SETTINGS_MODEL_PROFILE_CONFIG_PREFIX}{profile_id}");
        response.entries.iter().any(|entry| entry.key == key)
    };

    if let Some(explicit) = request.explicit_resolved_profile_id {
        validate_settings_config_entity_id(
            request.resolved_field,
            explicit,
            SETTINGS_MODEL_PROFILE_ID_MAX_BYTES,
        )?;
        if has_model_profile(explicit) {
            return Ok(explicit.to_string());
        }
        if has_model_profile("default") {
            return Ok("default".to_string());
        }
        return Err(bad_request_with(
            request.resolved_field,
            WebUiInboundValidationCode::InvalidValue,
        ));
    }

    if has_model_profile(request.requested_profile_id) {
        return Ok(request.requested_profile_id.to_string());
    }
    if has_model_profile("default") {
        return Ok("default".to_string());
    }

    Err(bad_request_with(
        request.requested_field,
        WebUiInboundValidationCode::InvalidValue,
    ))
}

fn delegation_policy_action(action: SettingsDelegationAction) -> SettingsPolicyAction {
    match action {
        SettingsDelegationAction::Admit => SettingsPolicyAction::DelegationAdmit,
        SettingsDelegationAction::Dispatch => SettingsPolicyAction::DelegationDispatch,
        SettingsDelegationAction::Resolve => SettingsPolicyAction::DelegationResolve,
        SettingsDelegationAction::Cancel => SettingsPolicyAction::DelegationCancel,
    }
}

fn to_identity_subject_type(subject_type: SettingsIdentitySubjectType) -> IdentitySubjectType {
    match subject_type {
        SettingsIdentitySubjectType::System => IdentitySubjectType::System,
        SettingsIdentitySubjectType::Agent => IdentitySubjectType::Agent,
        SettingsIdentitySubjectType::User => IdentitySubjectType::User,
        SettingsIdentitySubjectType::Channel => IdentitySubjectType::Channel,
    }
}

fn to_memory_scope(scope: SettingsMemoryScope) -> MemoryScope {
    match scope {
        SettingsMemoryScope::Identity => MemoryScope::Identity,
        SettingsMemoryScope::Project => MemoryScope::Project,
        SettingsMemoryScope::Agent => MemoryScope::Agent,
        SettingsMemoryScope::Global => MemoryScope::Global,
    }
}

fn to_tool_policy_scope(scope: SettingsToolPolicyScope) -> ToolPolicyScope {
    match scope {
        SettingsToolPolicyScope::Global => ToolPolicyScope::Global,
        SettingsToolPolicyScope::Channel => ToolPolicyScope::Channel,
        SettingsToolPolicyScope::Agent => ToolPolicyScope::Agent,
        SettingsToolPolicyScope::Profile => ToolPolicyScope::Profile,
    }
}

fn domain_record_value_without_id<T>(record: T) -> Result<serde_json::Value, serde_json::Error>
where
    T: Serialize,
{
    let mut value = serde_json::to_value(record)?;
    if let serde_json::Value::Object(ref mut map) = value {
        map.remove("id");
    }
    Ok(value)
}

fn domain_record_from_key_value<T>(
    kind: GovernedAuthoringKind,
    key: &str,
    value: serde_json::Value,
) -> Result<T, WebUiV2HttpError>
where
    T: for<'de> Deserialize<'de>,
{
    let id = governed_authoring::parse_config_key(kind, key)
        .ok_or_else(|| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))?;

    match value {
        serde_json::Value::Object(mut map) => {
            map.insert("id".to_string(), serde_json::Value::String(id));
            serde_json::from_value::<T>(serde_json::Value::Object(map))
                .map_err(|_| bad_request_with("key", WebUiInboundValidationCode::InvalidValue))
        }
        _ => Err(bad_request_with("key", WebUiInboundValidationCode::InvalidValue)),
    }
}

fn normalize_governed_authoring_entry_value(
    kind: GovernedAuthoringKind,
    key: &str,
    value: serde_json::Value,
) -> Result<serde_json::Value, WebUiV2HttpError> {
    match kind {
        GovernedAuthoringKind::Identity => {
            let record: IdentityDocument = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
        GovernedAuthoringKind::Memory => {
            let record: MemoryItem = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
        GovernedAuthoringKind::ToolPolicy => {
            let record: ToolPolicy = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
        GovernedAuthoringKind::Agent => {
            let record: AgentRosterEntry = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
        GovernedAuthoringKind::Delegation => {
            let record: DelegationTask = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
        GovernedAuthoringKind::Audit => {
            let record: AuditEntry = domain_record_from_key_value(kind, key, value)?;
            domain_record_value_without_id(record)
                .map_err(RebornServicesError::internal_from)
                .map_err(Into::into)
        }
    }
}

async fn load_operator_config_value(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    key: &str,
) -> Result<Option<serde_json::Value>, WebUiV2HttpError> {
    let response = state.services().list_operator_config(caller.clone()).await?;
    Ok(response
        .entries
        .into_iter()
        .find(|entry| entry.key == key)
        .map(|entry| entry.value))
}

fn transition_delegation_task(
    task_id: &str,
    current: Option<serde_json::Value>,
    request: SettingsDelegationUpsertRequest,
) -> Result<DelegationTask, WebUiV2HttpError> {
    let existing = match current {
        Some(value) => Some(domain_record_from_key_value::<DelegationTask>(
            GovernedAuthoringKind::Delegation,
            &governed_authoring::config_key(GovernedAuthoringKind::Delegation, task_id),
            value,
        )?),
        None => None,
    };

    let input = DelegationTransitionInput {
        task_id: task_id.to_string(),
        source_agent_id: request.source_agent_id,
        target_agent_id: request.target_agent_id,
        requested_profile_id: request.requested_profile_id,
        resolved_model_profile_id: request.resolved_model_profile_id,
        policy_context: request.policy_context,
        prompt: request.prompt,
        action: to_runtime_delegation_action(request.action, request.resolution),
    };

    delegation_runtime::transition_delegation_task(existing, input)
        .map_err(map_delegation_runtime_error)
}

fn to_runtime_delegation_action(
    action: SettingsDelegationAction,
    resolution: Option<SettingsDelegationResolution>,
) -> DelegationRuntimeAction {
    match action {
        SettingsDelegationAction::Admit => DelegationRuntimeAction::Admit,
        SettingsDelegationAction::Dispatch => DelegationRuntimeAction::Dispatch,
        SettingsDelegationAction::Resolve => DelegationRuntimeAction::Resolve {
            resolution: resolution.map(|value| match value {
                SettingsDelegationResolution::Completed => RuntimeDelegationResolution::Completed,
                SettingsDelegationResolution::Failed => RuntimeDelegationResolution::Failed,
                SettingsDelegationResolution::Rejected => RuntimeDelegationResolution::Rejected,
            }),
        },
        SettingsDelegationAction::Cancel => DelegationRuntimeAction::Cancel,
    }
}

fn map_delegation_runtime_error(
    error: delegation_runtime::DelegationRuntimeError,
) -> WebUiV2HttpError {
    match error.code {
        DelegationRuntimeErrorCode::MissingResolution => {
            bad_request_with("resolution", WebUiInboundValidationCode::Blank)
        }
        DelegationRuntimeErrorCode::InvalidResolvedProfile => {
            bad_request_with("resolved_model_profile_id", WebUiInboundValidationCode::Blank)
        }
        DelegationRuntimeErrorCode::InvalidActionForNewTask => {
            bad_request_with("action", WebUiInboundValidationCode::InvalidValue)
        }
        DelegationRuntimeErrorCode::ActorMismatch => {
            bad_request_with("source_agent_id", WebUiInboundValidationCode::InvalidValue)
        }
        DelegationRuntimeErrorCode::InvalidTransition => {
            bad_request_with("status", WebUiInboundValidationCode::InvalidValue)
        }
        DelegationRuntimeErrorCode::TerminalState => {
            bad_request_with("task_id", WebUiInboundValidationCode::InvalidValue)
        }
        DelegationRuntimeErrorCode::ResolvedProfileMismatch => {
            bad_request_with("resolved_model_profile_id", WebUiInboundValidationCode::InvalidValue)
        }
    }
}

async fn require_settings_policy_decision(
    state: &WebUiV2State,
    caller: &WebUiAuthenticatedCaller,
    action: SettingsPolicyAction,
) -> Result<(), WebUiV2HttpError> {
    let response = state.services().list_operator_config(caller.clone()).await?;
    let action_key = action.as_rule_key();

    let decision = evaluate_settings_policy_decision(&response, action_key);
    tracing::debug!(
        action = action_key,
        reason_code = decision.reason_code(),
        decision = ?decision,
        "evaluated settings policy decision"
    );

    match decision {
        SettingsPolicyDecision::Allow => Ok(()),
        SettingsPolicyDecision::Deny => Err(RebornServicesError {
            code: RebornServicesErrorCode::Forbidden,
            kind: RebornServicesErrorKind::ParticipantDenied,
            status_code: 403,
            retryable: false,
            field: Some("policy".to_string()),
            validation_code: None,
        }
        .into()),
        SettingsPolicyDecision::Escalate => Err(RebornServicesError {
            code: RebornServicesErrorCode::Forbidden,
            kind: RebornServicesErrorKind::BlockedApproval,
            status_code: 403,
            retryable: false,
            field: Some("policy_escalation_required".to_string()),
            validation_code: None,
        }
        .into()),
    }
}

fn validate_settings_tool_capability_id(capability_id: &str) -> Result<(), WebUiV2HttpError> {
    if capability_id.len() > SETTINGS_TOOL_CAPABILITY_ID_MAX_BYTES {
        return Err(RebornServicesError::from(WebUiInboundValidationError::new(
            "capability_id",
            WebUiInboundValidationCode::TooLong,
        ))
        .into());
    }
    Ok(())
}

fn validate_settings_config_entity_id(
    field: &'static str,
    value: &str,
    max_bytes: usize,
) -> Result<(), WebUiV2HttpError> {
    let code = if value.is_empty() {
        Some(WebUiInboundValidationCode::Blank)
    } else if value.len() > max_bytes {
        Some(WebUiInboundValidationCode::TooLong)
    } else if value.bytes().all(|byte| {
        byte.is_ascii_lowercase() || byte.is_ascii_digit() || matches!(byte, b'_' | b'.' | b'-')
    }) {
        None
    } else {
        Some(WebUiInboundValidationCode::InvalidValue)
    };

    match code {
        None => Ok(()),
        Some(code) => Err(RebornServicesError::from(WebUiInboundValidationError::new(field, code)).into()),
    }
}

fn validate_settings_tool_config_response(
    response: &RebornOperatorConfigGetResponse,
) -> Result<(), WebUiV2HttpError> {
    if response.entry.key == SETTINGS_TOOLS_AUTO_APPROVE_KEY
        || response.entry.key.starts_with(SETTINGS_TOOL_CONFIG_PREFIX)
    {
        return Ok(());
    }

    Err(RebornServicesError::from(WebUiInboundValidationError::new(
        "key",
        WebUiInboundValidationCode::InvalidValue,
    ))
    .into())
}

/// `GET /api/webchat/v2/operator/config`
pub async fn list_operator_config(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigListResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().list_operator_config(caller).await?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct OperatorConfigKeyPath {
    pub key: String,
}

const OPERATOR_CONFIG_KEY_MAX_BYTES: usize = 128;
const OPERATOR_CONFIG_RESERVED_VALIDATE_KEY: &str = "validate";

fn validate_operator_config_key(key: String) -> Result<String, WebUiV2HttpError> {
    let validation_code = if key.is_empty() {
        Some(WebUiInboundValidationCode::Blank)
    } else if key.len() > OPERATOR_CONFIG_KEY_MAX_BYTES {
        Some(WebUiInboundValidationCode::TooLong)
    } else if key == OPERATOR_CONFIG_RESERVED_VALIDATE_KEY {
        Some(WebUiInboundValidationCode::InvalidValue)
    } else if key.bytes().all(|byte| {
        byte.is_ascii_lowercase() || byte.is_ascii_digit() || matches!(byte, b'_' | b'.' | b'-')
    }) {
        None
    } else {
        Some(WebUiInboundValidationCode::InvalidValue)
    };

    match validation_code {
        None => Ok(key),
        Some(code) => Err(operator_config_key_error(code)),
    }
}

fn operator_config_key_error(code: WebUiInboundValidationCode) -> WebUiV2HttpError {
    RebornServicesError::from(WebUiInboundValidationError::new("key", code)).into()
}

fn evaluate_settings_policy_decision(
    response: &RebornOperatorConfigListResponse,
    action_key: &str,
) -> SettingsPolicyDecision {
    // Deny is strongest: any matching deny rule wins immediately. Escalate is
    // second-strongest and applies when no deny matched.
    let mut escalated = false;

    for entry in response
        .entries
        .iter()
        .filter(|entry| entry.key.starts_with(SETTINGS_TOOL_POLICY_CONFIG_PREFIX))
    {
        if let Some(rules) = entry.value.get("deny_rules").and_then(|value| value.as_array()) {
            let denied = rules
                .iter()
                .filter_map(|rule| rule.as_str())
                .any(|rule| policy_rule_matches_action(rule, action_key));
            if denied {
                return SettingsPolicyDecision::Deny;
            }
        }

        if let Some(rules) = entry
            .value
            .get("escalation_rules")
            .and_then(|value| value.as_array())
        {
            escalated |= rules
                .iter()
                .filter_map(|rule| rule.as_str())
                .any(|rule| policy_rule_matches_action(rule, action_key));
        }
    }

    if escalated {
        SettingsPolicyDecision::Escalate
    } else {
        SettingsPolicyDecision::Allow
    }
}

fn policy_rule_matches_action(rule: &str, action_key: &str) -> bool {
    rule == "*"
        || rule == action_key
        || (rule == "delegation.*" && action_key.starts_with("delegation."))
        || (rule == "tool.*" && action_key.starts_with("tool."))
        || (rule == "channel.*" && action_key.starts_with("channel."))
}

#[cfg(test)]
fn settings_policy_response(
    entries: Vec<RebornOperatorConfigEntry>,
) -> RebornOperatorConfigListResponse {
    RebornOperatorConfigListResponse {
        entries,
        precedence: Vec::new(),
        diagnostics: Vec::new(),
    }
}
pub async fn get_operator_config_key(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Path(OperatorConfigKeyPath { key }): Path<OperatorConfigKeyPath>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let key = validate_operator_config_key(key)?;
    let response = state
        .services()
        .get_operator_config_key(caller, key)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/operator/config/{key}`
pub async fn set_operator_config_key(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Path(OperatorConfigKeyPath { key }): Path<OperatorConfigKeyPath>,
    Json(body): Json<RebornOperatorConfigSetRequest>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let key = validate_operator_config_key(key)?;
    let response = state
        .services()
        .set_operator_config_key(caller, key, body)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/operator/config/validate`
///
/// `validate` is reserved for the validation operation and is not a readable
/// config key. This explicit static-path handler keeps axum static route
/// priority from surfacing an ambiguous 405.
pub async fn reject_reserved_operator_config_key(
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorConfigGetResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    Err(operator_config_key_error(
        WebUiInboundValidationCode::InvalidValue,
    ))
}

/// `POST /api/webchat/v2/operator/config/validate`
pub async fn validate_operator_config(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<RebornOperatorConfigValidateRequest>,
) -> Result<Json<RebornOperatorConfigValidateResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state
        .services()
        .validate_operator_config(caller, body)
        .await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/operator/diagnostics`
pub async fn get_operator_diagnostics(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorCommandPlaneResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().get_operator_diagnostics(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/operator/status`
pub async fn get_operator_status(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<RebornOperatorCommandPlaneResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().get_operator_status(caller).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/operator/logs`
///
/// Operator-gated version of the logs projection. The non-operator
/// projection lives at `GET /api/webchat/v2/logs`.
pub async fn query_operator_logs(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Query(query): Query<RebornOperatorLogsQuery>,
) -> Result<Json<RebornOperatorCommandPlaneResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().query_operator_logs(caller, query).await?;
    Ok(Json(response))
}

/// `GET /api/webchat/v2/logs`
///
/// Read-only caller-scoped logs projection for non-operator WebUI sessions.
/// The operator-wide log surface remains `GET /api/webchat/v2/operator/logs`.
pub async fn query_logs(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Query(query): Query<RebornOperatorLogsQuery>,
) -> Result<Json<RebornLogQueryResponse>, WebUiV2HttpError> {
    // The public and operator HTTP query strings intentionally share fields;
    // convert at the handler boundary so the facade can enforce public scope.
    let request = RebornLogQueryRequest {
        limit: query.limit,
        cursor: query.cursor,
        level: query.level,
        target: query.target,
        thread_id: query.thread_id,
        run_id: query.run_id,
        turn_id: query.turn_id,
        tool_call_id: query.tool_call_id,
        tool_name: query.tool_name,
        source: query.source,
        tail: query.tail,
        follow: query.follow,
    };
    let response = state.services().query_logs(caller, request).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/operator/service`
pub async fn run_operator_service_lifecycle(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<RebornOperatorServiceLifecycleRequest>,
) -> Result<Json<RebornOperatorCommandPlaneResponse>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state
        .services()
        .run_operator_service_lifecycle(caller, body)
        .await?;
    Ok(Json(response))
}

/// Path param carrying the LLM provider id.
#[derive(Debug, Deserialize)]
pub struct LlmProviderPath {
    pub provider_id: String,
}

/// `GET /api/webchat/v2/llm/providers`
pub async fn get_llm_config(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<LlmConfigSnapshot>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().get_llm_config(caller).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/providers`
pub async fn upsert_llm_provider(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<UpsertLlmProviderRequest>,
) -> Result<Json<LlmConfigSnapshot>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().upsert_llm_provider(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/providers/{provider_id}/delete`
pub async fn delete_llm_provider(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Path(LlmProviderPath { provider_id }): Path<LlmProviderPath>,
) -> Result<Json<LlmConfigSnapshot>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state
        .services()
        .delete_llm_provider(caller, provider_id)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/active`
pub async fn set_active_llm(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<SetActiveLlmRequest>,
) -> Result<Json<LlmConfigSnapshot>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().set_active_llm(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/test-connection`
pub async fn test_llm_connection(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<LlmProbeRequest>,
) -> Result<Json<LlmProbeResult>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().test_llm_connection(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/list-models`
pub async fn list_llm_models(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<LlmProbeRequest>,
) -> Result<Json<LlmModelsResult>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().list_llm_models(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/nearai/login`
pub async fn start_nearai_login(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    headers: HeaderMap,
    Json(mut body): Json<NearAiLoginRequest>,
) -> Result<Json<NearAiLoginStart>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    // The NEAR AI callback carries the login token in its redirect, so the
    // callback origin must come from trusted request context, not arbitrary
    // body input. This route's descriptor is `CorsPolicy::SameOriginOnly`, so a
    // present `Origin` header has been gateway-validated as same-origin; prefer
    // it over the body field (which stays as a fallback for non-browser callers).
    if let Some(origin) = headers
        .get(axum::http::header::ORIGIN)
        .and_then(|value| value.to_str().ok())
        .filter(|value| !value.is_empty())
    {
        body.origin = origin.to_string();
    }
    let response = state.services().start_nearai_login(caller, body).await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/nearai/wallet`
///
/// Completes a NEAR AI wallet (NEP-413) login from a browser-signed message:
/// relays the signature to NEAR AI, stores the session token, and makes NEAR AI
/// active.
pub async fn complete_nearai_wallet_login(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
    Json(body): Json<NearAiWalletLoginRequest>,
) -> Result<Json<NearAiWalletLoginResult>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state
        .services()
        .complete_nearai_wallet_login(caller, body)
        .await?;
    Ok(Json(response))
}

/// `POST /api/webchat/v2/llm/codex/login`
///
/// Begins an OpenAI Codex device-code login. Takes no body — returns the user
/// code + verification URL to display; a background task completes the flow.
pub async fn start_codex_login(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Extension(capabilities): Extension<WebUiV2Capabilities>,
) -> Result<Json<CodexLoginStart>, WebUiV2HttpError> {
    require_operator_webui_config(capabilities)?;
    let response = state.services().start_codex_login(caller).await?;
    Ok(Json(response))
}

#[derive(Debug, Deserialize)]
pub struct ExtensionPackagePath {
    pub package_id: String,
}

#[derive(Debug, Deserialize)]
pub struct InstallExtensionBody {
    pub package_ref: LifecyclePackageRef,
}

#[derive(Debug, Deserialize)]
pub struct SkillPath {
    pub name: String,
}

#[derive(Debug, Deserialize)]
pub struct SearchSkillsBody {
    pub query: String,
}

#[derive(Debug, Deserialize)]
pub struct InstallSkillBody {
    pub name: String,
    pub content: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateSkillBody {
    pub content: String,
}

#[derive(Debug, Deserialize)]
pub struct SetSkillAutoActivateBody {
    pub enabled: bool,
}

fn extension_package_ref_for_request(
    package_ref: Result<LifecyclePackageRef, ProductWorkflowError>,
    field: &'static str,
) -> Result<LifecyclePackageRef, RebornServicesError> {
    package_ref
        .and_then(LifecyclePackageRef::require_extension)
        .map_err(|_| {
            RebornServicesError::from(WebUiInboundValidationError::new(
                field,
                WebUiInboundValidationCode::InvalidId,
            ))
        })
}

/// `GET /api/webchat/v2/threads/{thread_id}/ws`
///
/// WebSocket transport variant of [`stream_events`]. The handler
/// accepts the WS upgrade, drains the same `RebornServicesApi::
/// stream_events` facade as the SSE handler, and writes each event as
/// a JSON text frame. Same lifetime + per-caller concurrency caps as
/// SSE.
///
/// Same-origin enforcement is the responsibility of host composition's
/// origin-check middleware — the descriptor declares
/// `WebSocketOriginPolicy::SameOriginRequired` so a future override
/// to a host-allowlist is one descriptor change away. This handler
/// trusts the composition layer to have already rejected
/// disallowed-origin upgrades.
pub async fn stream_events_ws(
    State(state): State<WebUiV2State>,
    Extension(caller): Extension<WebUiAuthenticatedCaller>,
    Path(thread_id): Path<String>,
    headers: HeaderMap,
    Query(query): Query<StreamEventsQuery>,
    upgrade: axum::extract::ws::WebSocketUpgrade,
) -> Result<axum::response::Response, WebUiV2HttpError> {
    let slot = state
        .sse_capacity()
        .try_acquire(&caller.tenant_id, &caller.user_id)
        .ok_or_else(sse_concurrency_exhausted)?;
    let services = state.services().clone();
    let initial_cursor = headers
        .get(LAST_EVENT_ID_HEADER)
        .and_then(|value| value.to_str().ok())
        .map(str::to_string)
        .or(query.after_cursor);
    Ok(upgrade.on_upgrade(move |socket| {
        ws_drain_loop(services, caller, thread_id, initial_cursor, slot, socket)
    }))
}

async fn ws_drain_loop(
    services: std::sync::Arc<dyn RebornServicesApi>,
    caller: WebUiAuthenticatedCaller,
    thread_id: String,
    initial_cursor: Option<String>,
    slot: SseSlot,
    mut socket: axum::extract::ws::WebSocket,
) {
    // Mirror the SSE generator: own the slot guard, bound stream
    // lifetime, drain stream_events with the same idle cadence, emit
    // each envelope as a JSON text frame.
    //
    // Two failure modes the loop must observe:
    //
    // 1. **Peer close / socket error.** The browser may close an
    //    idle tab without trading a close frame; the OS surfaces
    //    that as either a `Close` message or a socket-error on the
    //    next read. The loop watches `socket.recv()` on every
    //    `.await` so a dropped tab exits immediately instead of
    //    pinning the per-caller `SseSlot` for up to `SSE_MAX_LIFETIME`.
    // 2. **TCP backpressure on send.** A slow / hostile reader can
    //    leave bytes queued indefinitely. Each `socket.send().await`
    //    runs under `ws_send_with_timeout` so the per-caller slot
    //    is released within the lifetime budget regardless.
    let _slot_guard = slot;
    let started_at = tokio::time::Instant::now();
    let mut after_cursor = initial_cursor.and_then(parse_cursor_token);
    if services.supports_stream_events_subscription() {
        let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
        if remaining.is_zero() {
            let _ =
                ws_send_with_timeout(&mut socket, None, std::time::Duration::from_millis(0)).await;
            return;
        }
        let request = RebornStreamEventsRequest {
            thread_id: thread_id.clone(),
            after_cursor: after_cursor.clone(),
        };
        let mut subscription =
            match tokio::time::timeout(remaining, services.subscribe_events(caller, request)).await
            {
                Err(_elapsed) => {
                    let _ = socket.close().await;
                    return;
                }
                Ok(Ok(subscription)) => subscription,
                Ok(Err(error)) => {
                    tracing::debug!(
                        target = "ironclaw_webui_v2::ws",
                        error = ?error,
                        "facade rejected WS subscription; closing stream",
                    );
                    let payload = SseErrorPayload {
                        error: error.code,
                        kind: error.kind,
                        retryable: error.retryable,
                    };
                    if let Ok(text) = serde_json::to_string(&payload) {
                        let send_budget = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                        let _ = ws_send_with_timeout(
                            &mut socket,
                            Some(axum::extract::ws::Message::Text(text.into())),
                            send_budget,
                        )
                        .await;
                    }
                    let _ = socket.close().await;
                    return;
                }
            };
        loop {
            let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
            if remaining.is_zero() {
                let _ = socket.close().await;
                return;
            }
            let outcome = tokio::select! {
                biased;
                incoming = socket.recv() => {
                    match incoming {
                        None | Some(Err(_)) => return,
                        Some(Ok(axum::extract::ws::Message::Close(_))) => return,
                        Some(Ok(_)) => continue,
                    }
                }
                next = tokio::time::timeout(remaining, subscription.next()) => next,
            };
            match outcome {
                Err(_elapsed) => {
                    let _ = socket.close().await;
                    return;
                }
                Ok(Some(Ok(envelope))) => match serde_json::to_string(&envelope) {
                    Ok(text) => {
                        let send_budget = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                        if send_budget.is_zero() {
                            let _ = socket.close().await;
                            return;
                        }
                        if ws_send_with_timeout(
                            &mut socket,
                            Some(axum::extract::ws::Message::Text(text.into())),
                            send_budget,
                        )
                        .await
                        .is_err()
                        {
                            return;
                        }
                    }
                    Err(error) => {
                        tracing::debug!(
                            target = "ironclaw_webui_v2::ws",
                            error = %error,
                            "failed to serialize ProductOutboundEnvelope for WS",
                        );
                    }
                },
                Ok(Some(Err(error))) => {
                    tracing::debug!(
                        target = "ironclaw_webui_v2::ws",
                        error = ?error,
                        "facade rejected WS subscription event; closing stream",
                    );
                    let payload = SseErrorPayload {
                        error: error.code,
                        kind: error.kind,
                        retryable: error.retryable,
                    };
                    if let Ok(text) = serde_json::to_string(&payload) {
                        let send_budget = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                        let _ = ws_send_with_timeout(
                            &mut socket,
                            Some(axum::extract::ws::Message::Text(text.into())),
                            send_budget,
                        )
                        .await;
                    }
                    let _ = socket.close().await;
                    return;
                }
                Ok(None) => {
                    let _ = socket.close().await;
                    return;
                }
            }
        }
    }

    let mut idle_polls = 0_u32;
    loop {
        let remaining = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
        if remaining.is_zero() {
            let _ =
                ws_send_with_timeout(&mut socket, None, std::time::Duration::from_millis(0)).await;
            return;
        }
        let request = RebornStreamEventsRequest {
            thread_id: thread_id.clone(),
            after_cursor: after_cursor.clone(),
        };
        let facade_call = services.stream_events(caller.clone(), request);
        let outcome = tokio::select! {
            biased;
            // Peer close / socket error wins over the facade poll —
            // if the browser already dropped the connection we want
            // to free the slot immediately, not wait for stream_events
            // to return.
            incoming = socket.recv() => {
                match incoming {
                    None | Some(Err(_)) => return,
                    Some(Ok(axum::extract::ws::Message::Close(_))) => return,
                    // Ignore other inbound frames (Ping/Pong are
                    // handled internally by axum; Text/Binary from
                    // the browser are not part of this contract).
                    Some(Ok(_)) => continue,
                }
            }
            facade = tokio::time::timeout(remaining, facade_call) => facade,
        };
        match outcome {
            Err(_elapsed) => {
                let _ = socket.close().await;
                return;
            }
            Ok(Ok(response)) => {
                let had_events = !response.events.is_empty();
                if let Some(latest) = response.events.last() {
                    after_cursor = Some(latest.projection_cursor.clone());
                }
                for envelope in response.events {
                    match serde_json::to_string(&envelope) {
                        Ok(text) => {
                            let send_budget = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                            if send_budget.is_zero() {
                                let _ = socket.close().await;
                                return;
                            }
                            if ws_send_with_timeout(
                                &mut socket,
                                Some(axum::extract::ws::Message::Text(text.into())),
                                send_budget,
                            )
                            .await
                            .is_err()
                            {
                                // Peer hung up, TCP backpressure
                                // exceeded budget, or socket otherwise
                                // unwritable. Drop the task and
                                // release the slot.
                                return;
                            }
                        }
                        Err(error) => {
                            tracing::debug!(
                                target = "ironclaw_webui_v2::ws",
                                error = %error,
                                "failed to serialize ProductOutboundEnvelope for WS",
                            );
                        }
                    }
                }
                if had_events {
                    // Match SSE semantics: do not sleep after a delivered
                    // batch, because the production facade waits on the live
                    // projection subscription for the next item.
                    idle_polls = 0;
                    continue;
                }
                idle_polls = idle_polls.saturating_add(1);
                let sleep_for = sse_poll_interval_for_idle_polls(idle_polls)
                    .min(SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed()));
                if sleep_for.is_zero() {
                    let _ = socket.close().await;
                    return;
                }
                // Race the poll-interval sleep against socket close
                // for the same reason as the facade call above: if
                // the peer drops during the idle window, free the
                // slot immediately.
                tokio::select! {
                    biased;
                    incoming = socket.recv() => match incoming {
                        None | Some(Err(_)) => return,
                        Some(Ok(axum::extract::ws::Message::Close(_))) => return,
                        Some(Ok(_)) => {}
                    },
                    _ = tokio::time::sleep(sleep_for) => {}
                }
            }
            Ok(Err(error)) => {
                tracing::debug!(
                    target = "ironclaw_webui_v2::ws",
                    error = ?error,
                    "facade rejected WS drain; closing stream",
                );
                let payload = SseErrorPayload {
                    error: error.code,
                    kind: error.kind,
                    retryable: error.retryable,
                };
                if let Ok(text) = serde_json::to_string(&payload) {
                    let send_budget = SSE_MAX_LIFETIME.saturating_sub(started_at.elapsed());
                    let _ = ws_send_with_timeout(
                        &mut socket,
                        Some(axum::extract::ws::Message::Text(text.into())),
                        send_budget,
                    )
                    .await;
                }
                let _ = socket.close().await;
                return;
            }
        }
    }
}

/// Send a WS frame (or close, when `frame` is `None`) bounded by
/// `budget`. Returns `Err(())` on timeout, peer hangup, or close
/// error so callers can release the per-caller `SseSlot` instead of
/// hanging indefinitely on a stalled socket.
async fn ws_send_with_timeout(
    socket: &mut axum::extract::ws::WebSocket,
    frame: Option<axum::extract::ws::Message>,
    budget: std::time::Duration,
) -> Result<(), ()> {
    if budget.is_zero() {
        let _ = socket.close().await;
        return Err(());
    }
    let send_future = async {
        match frame {
            Some(message) => socket.send(message).await.map_err(|_| ()),
            None => socket.close().await.map_err(|_| ()),
        }
    };
    match tokio::time::timeout(budget, send_future).await {
        Ok(result) => result,
        Err(_elapsed) => {
            tracing::debug!(
                target = "ironclaw_webui_v2::ws",
                budget_ms = budget.as_millis() as u64,
                "WS send exceeded lifetime budget; releasing slot",
            );
            Err(())
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn policy_entry(key: &str, value: serde_json::Value) -> RebornOperatorConfigEntry {
        RebornOperatorConfigEntry {
            key: key.to_string(),
            value,
            source: "test".to_string(),
            redacted: false,
            mutable: true,
        }
    }

    #[test]
    fn settings_policy_decision_reason_codes_are_stable() {
        assert_eq!(SettingsPolicyDecision::Allow.reason_code(), "policy_allow");
        assert_eq!(SettingsPolicyDecision::Deny.reason_code(), "policy_deny");
        assert_eq!(SettingsPolicyDecision::Escalate.reason_code(), "policy_escalate");
    }

    #[test]
    fn deny_rules_override_escalation_rules() {
        let response = settings_policy_response(vec![
            policy_entry(
                "tool_policy.global",
                serde_json::json!({
                    "scope": "global",
                    "deny_rules": ["tool.execution"],
                    "escalation_rules": ["tool.execution"]
                }),
            ),
        ]);

        assert_eq!(
            evaluate_settings_policy_decision(&response, "tool.execution"),
            SettingsPolicyDecision::Deny
        );
    }

    #[test]
    fn sse_poll_interval_backs_off_only_after_repeated_idle_drains() {
        assert_eq!(sse_poll_interval_for_idle_polls(0), SSE_POLL_INTERVAL);
        assert_eq!(sse_poll_interval_for_idle_polls(1), SSE_POLL_INTERVAL);
        assert_eq!(sse_poll_interval_for_idle_polls(2), Duration::from_secs(2));
        assert_eq!(
            sse_poll_interval_for_idle_polls(3),
            SSE_IDLE_POLL_MAX_INTERVAL
        );
        assert_eq!(
            sse_poll_interval_for_idle_polls(u32::MAX),
            SSE_IDLE_POLL_MAX_INTERVAL
        );
    }

    #[test]
    fn sanitized_filename_neutralizes_header_injection() {
        // Quote + CRLF injection attempts collapse to underscores so nothing can
        // break out of the quoted `Content-Disposition` value or inject a header.
        assert_eq!(
            sanitized_download_filename(Some("a\"; rm -rf /.txt")),
            "a__ rm -rf _.txt"
        );
        assert_eq!(
            sanitized_download_filename(Some("evil\r\nSet-Cookie: x.csv")),
            "evil__Set-Cookie_ x.csv"
        );
        // Path separators never survive — a download can't address another dir.
        // (Leading dots are also trimmed, so a `../` prefix can't linger.)
        assert_eq!(
            sanitized_download_filename(Some("../../etc/passwd")),
            "_.._etc_passwd"
        );
    }

    #[test]
    fn sanitized_filename_falls_back_to_neutral_name() {
        assert_eq!(sanitized_download_filename(None), "download");
        // A dots/spaces-only name trims to empty and falls back to the neutral
        // name (illegal non-space chars instead map to `_` and survive).
        assert_eq!(sanitized_download_filename(Some("   ...  ")), "download");
        // A normal name is preserved verbatim.
        assert_eq!(
            sanitized_download_filename(Some("report.csv")),
            "report.csv"
        );
    }

    #[test]
    fn sanitized_filename_is_length_capped() {
        let long = format!("{}.csv", "a".repeat(500));
        let out = sanitized_download_filename(Some(&long));
        assert!(
            out.len() <= MAX_DOWNLOAD_FILENAME_BYTES,
            "filename must be capped, got {} bytes",
            out.len()
        );
    }

    #[test]
    fn require_project_fs_path_rejects_missing_or_blank() {
        assert!(require_project_fs_path(None).is_err());
        assert!(require_project_fs_path(Some(String::new())).is_err());
        assert!(require_project_fs_path(Some("   ".to_string())).is_err());
    }

    #[test]
    fn require_project_fs_path_accepts_non_blank() {
        assert_eq!(
            require_project_fs_path(Some("/workspace/report.csv".to_string()))
                .expect("non-blank path is accepted"),
            "/workspace/report.csv"
        );
    }

    #[test]
    fn project_fs_list_path_defaults_root_for_missing_or_blank() {
        // Absent, empty, and whitespace-only all mean "list the workspace root"
        // rather than forwarding a bogus path the facade would reject.
        assert_eq!(project_fs_list_path(None), PROJECT_FS_ROOT);
        assert_eq!(project_fs_list_path(Some(String::new())), PROJECT_FS_ROOT);
        assert_eq!(
            project_fs_list_path(Some("   ".to_string())),
            PROJECT_FS_ROOT
        );
    }

    #[test]
    fn project_fs_list_path_preserves_explicit_path() {
        assert_eq!(
            project_fs_list_path(Some("/workspace/sub".to_string())),
            "/workspace/sub"
        );
    }

    fn delegation_request(action: SettingsDelegationAction) -> SettingsDelegationUpsertRequest {
        SettingsDelegationUpsertRequest {
            source_agent_id: "ceo".to_string(),
            target_agent_id: "coder".to_string(),
            requested_profile_id: "default".to_string(),
            resolved_model_profile_id: None,
            action,
            resolution: None,
            policy_context: None,
            prompt: None,
        }
    }

    fn delegation_record(status: DelegationStatus) -> serde_json::Value {
        domain_record_value_without_id(DelegationTask {
            id: "task-1".to_string(),
            source_agent_id: "ceo".to_string(),
            target_agent_id: "coder".to_string(),
            requested_profile_id: "default".to_string(),
            resolved_model_profile_id: "default".to_string(),
            status,
            policy_context: None,
            prompt: None,
            transition_count: 1,
        })
        .expect("record serializes without id")
    }

    #[test]
    fn delegation_transition_admit_creates_new_task() {
        let record = transition_delegation_task(
            "task-1",
            None,
            delegation_request(SettingsDelegationAction::Admit),
        )
        .expect("admit should create task");

        assert_eq!(record.status, DelegationStatus::Admitted);
        assert_eq!(record.transition_count, 1);
        assert_eq!(record.resolved_model_profile_id, "default");
    }

    #[test]
    fn delegation_transition_rejects_non_admit_for_new_task() {
        let err = transition_delegation_task(
            "task-1",
            None,
            delegation_request(SettingsDelegationAction::Dispatch),
        );
        assert!(err.is_err(), "new task must start with admit action");
    }

    #[test]
    fn delegation_transition_dispatch_from_admitted_succeeds() {
        let record = transition_delegation_task(
            "task-1",
            Some(delegation_record(DelegationStatus::Admitted)),
            delegation_request(SettingsDelegationAction::Dispatch),
        )
        .expect("dispatch should be valid from admitted");

        assert_eq!(record.status, DelegationStatus::Dispatched);
        assert_eq!(record.transition_count, 2);
    }

    #[test]
    fn delegation_transition_resolve_requires_resolution() {
        let err = transition_delegation_task(
            "task-1",
            Some(delegation_record(DelegationStatus::Dispatched)),
            delegation_request(SettingsDelegationAction::Resolve),
        );
        assert!(err.is_err(), "resolve must provide a resolution value");
    }

    #[test]
    fn delegation_transition_resolve_from_dispatched_succeeds() {
        let mut request = delegation_request(SettingsDelegationAction::Resolve);
        request.resolution = Some(SettingsDelegationResolution::Completed);

        let record = transition_delegation_task(
            "task-1",
            Some(delegation_record(DelegationStatus::Dispatched)),
            request,
        )
        .expect("resolve should be valid from dispatched");

        assert_eq!(record.status, DelegationStatus::Completed);
        assert_eq!(record.transition_count, 2);
    }

    #[test]
    fn delegation_transition_rejects_terminal_tasks() {
        let err = transition_delegation_task(
            "task-1",
            Some(delegation_record(DelegationStatus::Completed)),
            delegation_request(SettingsDelegationAction::Cancel),
        );
        assert!(
            err.is_err(),
            "terminal delegation states must reject further transitions"
        );
    }
}
