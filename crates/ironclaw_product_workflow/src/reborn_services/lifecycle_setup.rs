use ironclaw_auth::{AuthProductScope, AuthProviderId};
use ironclaw_host_api::ExtensionId;
use reqwest::header::CONTENT_TYPE;
use secrecy::ExposeSecret;
use std::time::Duration;
use url::Url;

use crate::{
    LifecycleExtensionCredentialRequirement, LifecyclePackageRef, LifecycleProductContext,
    LifecycleProductFacade, LifecycleProductResponse, LifecycleProductSurfaceContext,
    ProductWorkflowError, RebornExtensionActionResponse, RebornServicesError,
    RebornServicesErrorCode, RebornSetupExtensionResponse, WebUiAuthenticatedCaller,
    WebUiInboundValidationCode, WebUiInboundValidationError, WebUiSetupExtensionRequest,
    WebUiTestExtensionConnectionRequest,
};

use super::{
    ExtensionCredentialSetupService, ExtensionCredentialStoredValueRequest,
    extension_credentials::credential_scope, extension_onboarding, extension_setup_credentials,
};

#[derive(Clone, Copy, PartialEq, Eq)]
enum SetupAction {
    View,
    Submit,
}

pub(super) async fn setup_extension(
    facade: &dyn LifecycleProductFacade,
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    caller: WebUiAuthenticatedCaller,
    package_ref: LifecyclePackageRef,
    request: WebUiSetupExtensionRequest,
) -> Result<RebornSetupExtensionResponse, RebornServicesError> {
    let action = setup_action(&request)?;
    let scope = credential_scope(&caller, &package_ref);
    let extension_id = ExtensionId::new(package_ref.id.as_str())
        .map_err(|_| RebornServicesError::internal_invariant())?;
    let context = LifecycleProductContext::Surface(LifecycleProductSurfaceContext {
        tenant_id: caller.tenant_id,
        user_id: caller.user_id,
        agent_id: caller.agent_id,
        project_id: caller.project_id,
    });
    let lifecycle = project_package(facade, context.clone(), package_ref.clone()).await?;
    let requirements = extension_setup_credentials::requirements(&lifecycle);
    if action == SetupAction::Submit {
        extension_setup_credentials::submit_manual_tokens(
            extension_credentials,
            scope.clone(),
            &extension_id,
            &requirements,
            request,
        )
        .await?;
        let refreshed = project_package(facade, context, package_ref).await?;
        let refreshed_requirements = extension_setup_credentials::requirements(&refreshed);
        return setup_extension_response(
            extension_credentials,
            scope,
            &extension_id,
            refreshed,
            &refreshed_requirements,
        )
        .await;
    }
    setup_extension_response(
        extension_credentials,
        scope,
        &extension_id,
        lifecycle,
        &requirements,
    )
    .await
}

pub(super) async fn test_extension_connection(
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    caller: WebUiAuthenticatedCaller,
    package_ref: LifecyclePackageRef,
    request: WebUiTestExtensionConnectionRequest,
) -> Result<RebornExtensionActionResponse, RebornServicesError> {
    if package_ref.id.as_str() != "nextcloud-talk" {
        return Ok(connection_fail(
            "Connection tests are currently implemented only for nextcloud-talk.".to_string(),
        ));
    }

    let extension_id = ExtensionId::new(package_ref.id.as_str())
        .map_err(|_| RebornServicesError::internal_invariant())?;
    let scope = credential_scope(&caller, &package_ref);

    let base_url = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_base_url",
        scope.clone(),
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_base_url. Enter and save the URL, or provide it in this dialog before testing."
                    .to_string(),
            ))
        }
    };
    let bot_username = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_bot_username",
        scope.clone(),
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_bot_username. Enter and save the username, or provide it in this dialog before testing."
                    .to_string(),
            ))
        }
    };
    let app_password = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_app_password",
        scope,
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_app_password. Save an app password first or enter it in this dialog before testing."
                    .to_string(),
            ))
        }
    };

    let normalized_base_url = match normalize_test_base_url(&base_url) {
        Ok(value) => value,
        Err(message) => return Ok(connection_fail(message)),
    };
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(15))
        .build()
        .map_err(|_| RebornServicesError::internal_invariant())?;

    let url = format!(
        "{}/ocs/v2.php/cloud/capabilities?format=json",
        normalized_base_url.trim_end_matches('/')
    );

    let response = match client
        .get(&url)
        .basic_auth(&bot_username, Some(app_password))
        .header("OCS-APIRequest", "true")
        .header(reqwest::header::ACCEPT, "application/json")
        .send()
        .await
    {
        Ok(resp) => resp,
        Err(err) => return Ok(connection_fail(describe_nextcloud_transport_error(&err))),
    };

    let status = response.status();
    let content_type = response
        .headers()
        .get(CONTENT_TYPE)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_ascii_lowercase();
    let body_text = response.text().await.unwrap_or_default();

    if status.is_success() {
        if let Some(msg) = describe_nextcloud_success_payload_failure(&content_type, &body_text) {
            return Ok(connection_fail(msg));
        }
        if let Some(msg) = describe_nextcloud_ocs_meta_failure(&body_text) {
            return Ok(connection_fail(msg));
        }
        return Ok(connection_ok(format!(
            "Connected to Nextcloud as {bot_username}."
        )));
    }

    Ok(connection_fail(describe_nextcloud_http_error(
        status, &body_text,
    )))
}

pub(super) async fn send_extension_test_message(
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    caller: WebUiAuthenticatedCaller,
    package_ref: LifecyclePackageRef,
    request: WebUiTestExtensionConnectionRequest,
) -> Result<RebornExtensionActionResponse, RebornServicesError> {
    if package_ref.id.as_str() != "nextcloud-talk" {
        return Ok(connection_fail(
            "Test message is currently implemented only for nextcloud-talk.".to_string(),
        ));
    }

    let extension_id = ExtensionId::new(package_ref.id.as_str())
        .map_err(|_| RebornServicesError::internal_invariant())?;
    let scope = credential_scope(&caller, &package_ref);

    let base_url = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_base_url",
        scope.clone(),
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_base_url. Enter and save the URL, or provide it in this dialog before sending a test message."
                    .to_string(),
            ))
        }
    };
    let bot_username = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_bot_username",
        scope.clone(),
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_bot_username. Enter and save the username, or provide it in this dialog before sending a test message."
                    .to_string(),
            ))
        }
    };
    let app_password = match test_connection_value_with_fallback(
        extension_credentials,
        &request,
        "nextcloud_talk_app_password",
        scope,
        &extension_id,
    )
    .await?
    {
        Some(value) => value,
        None => {
            return Ok(connection_fail(
                "Missing nextcloud_talk_app_password. Save an app password first or enter it in this dialog before sending a test message."
                    .to_string(),
            ))
        }
    };

    let room_id = request
        .room_id
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .ok_or_else(|| validation_error("room_id", WebUiInboundValidationCode::MissingField))?
        .to_string();
    let message = request
        .message
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(str::to_string)
        .unwrap_or_else(|| {
            format!(
                "Ironclaw Nextcloud test message ({})",
                chrono::Utc::now().to_rfc3339()
            )
        });

    let normalized_base_url = match normalize_test_base_url(&base_url) {
        Ok(value) => value,
        Err(message) => return Ok(connection_fail(message)),
    };
    let client = reqwest::Client::builder()
        .timeout(Duration::from_secs(15))
        .build()
        .map_err(|_| RebornServicesError::internal_invariant())?;

    let url = format!(
        "{}/ocs/v2.php/apps/spreed/api/v1/chat/{}",
        normalized_base_url.trim_end_matches('/'),
        room_id
    );

    let response = match client
        .post(&url)
        .basic_auth(&bot_username, Some(app_password))
        .header("OCS-APIRequest", "true")
        .header(reqwest::header::ACCEPT, "application/json")
        .header(reqwest::header::CONTENT_TYPE, "application/json")
        .json(&serde_json::json!({ "message": message, "replyTo": 0 }))
        .send()
        .await
    {
        Ok(resp) => resp,
        Err(err) => return Ok(connection_fail(describe_nextcloud_transport_error(&err))),
    };

    let status = response.status();
    let content_type = response
        .headers()
        .get(CONTENT_TYPE)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("")
        .to_ascii_lowercase();
    let body_text = response.text().await.unwrap_or_default();

    if status.is_success() {
        if let Some(msg) = describe_nextcloud_success_payload_failure(&content_type, &body_text) {
            return Ok(connection_fail(msg));
        }
        if let Some(msg) = describe_nextcloud_ocs_meta_failure(&body_text) {
            return Ok(connection_fail(msg));
        }
        return Ok(connection_ok(format!(
            "Test message sent to Nextcloud room {room_id} as {bot_username}."
        )));
    }

    Ok(connection_fail(describe_nextcloud_send_http_error(
        status,
        &body_text,
        &room_id,
    )))
}

async fn test_connection_value_with_fallback(
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    request: &WebUiTestExtensionConnectionRequest,
    key: &str,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
) -> Result<Option<String>, RebornServicesError> {
    if let Some(value) = test_connection_value(request, key) {
        return Ok(Some(value.to_string()));
    }
    let Some(service) = extension_credentials else {
        return Ok(None);
    };
    let provider =
        AuthProviderId::new(key).map_err(|_| RebornServicesError::internal_invariant())?;
    let resolved = service
        .resolve_stored_manual_token_value(ExtensionCredentialStoredValueRequest {
            scope,
            provider,
            requester_extension: extension_id.clone(),
        })
        .await?;
    Ok(resolved.and_then(|value| {
        let trimmed = value.expose_secret().trim();
        if trimmed.is_empty() {
            None
        } else {
            Some(trimmed.to_string())
        }
    }))
}

fn connection_ok(message: String) -> RebornExtensionActionResponse {
    RebornExtensionActionResponse {
        success: true,
        message,
        activated: None,
        auth_url: None,
        awaiting_token: None,
        instructions: None,
        onboarding_state: None,
        onboarding: None,
    }
}

fn connection_fail(message: String) -> RebornExtensionActionResponse {
    RebornExtensionActionResponse {
        success: false,
        message,
        activated: None,
        auth_url: None,
        awaiting_token: None,
        instructions: None,
        onboarding_state: None,
        onboarding: None,
    }
}

fn test_connection_value<'a>(
    request: &'a WebUiTestExtensionConnectionRequest,
    key: &str,
) -> Option<&'a str> {
    request
        .secrets
        .get(key)
        .or_else(|| request.fields.get(key))
        .map(String::as_str)
        .map(str::trim)
        .filter(|value| !value.is_empty())
}

fn normalize_test_base_url(base_url: &str) -> Result<String, String> {
    let parsed = Url::parse(base_url).map_err(|_| {
        "Invalid nextcloud_talk_base_url. Use a full HTTPS URL like https://cloud.example.tld"
            .to_string()
    })?;
    if parsed.scheme() != "https"
        || parsed.host_str().is_none()
        || !parsed.username().is_empty()
        || parsed.password().is_some()
        || parsed.query().is_some()
        || parsed.fragment().is_some()
    {
        return Err(
            "Invalid nextcloud_talk_base_url. Use HTTPS and omit username/password, query, and fragment."
                .to_string(),
        );
    }
    let mut normalized = parsed.to_string();
    while normalized.ends_with('/') {
        normalized.pop();
    }
    Ok(normalized)
}

fn describe_nextcloud_transport_error(err: &reqwest::Error) -> String {
    let detail = truncated_error_detail(err);
    if err.is_timeout() {
        return format!(
            "Connection timed out after 15s. Check Nextcloud URL, firewall/reverse-proxy, and network reachability. Details: {detail}"
        );
    }
    if err.is_connect() {
        return format!(
            "Could not connect to Nextcloud host. Check DNS, port, TLS termination, and routing. Details: {detail}"
        );
    }
    if err.is_request() {
        return format!(
            "Invalid request to Nextcloud. Verify base URL (must include scheme). Details: {detail}"
        );
    }
    format!("Connection test request failed. Details: {detail}")
}

fn describe_nextcloud_http_error(status: reqwest::StatusCode, body: &str) -> String {
    if status == reqwest::StatusCode::UNAUTHORIZED || status == reqwest::StatusCode::FORBIDDEN {
        return "Authentication failed. Username/app password was rejected by Nextcloud."
            .to_string();
    }
    if status == reqwest::StatusCode::NOT_FOUND {
        return "Nextcloud capabilities endpoint not found (404). Check base URL and reverse-proxy path handling."
            .to_string();
    }
    if status == reqwest::StatusCode::TOO_MANY_REQUESTS {
        return "Nextcloud rate-limited the request (429). Wait briefly and retry.".to_string();
    }
    if status.is_server_error() {
        return format!(
            "Nextcloud returned server error ({status}). Check Nextcloud and proxy logs."
        );
    }
    let detail = body_excerpt(body);
    if detail.is_empty() {
        format!("Nextcloud returned unexpected HTTP status ({status}).")
    } else {
        format!("Nextcloud returned HTTP status {status}. Response: {detail}")
    }
}

fn describe_nextcloud_send_http_error(
    status: reqwest::StatusCode,
    body: &str,
    room_id: &str,
) -> String {
    if status == reqwest::StatusCode::UNAUTHORIZED || status == reqwest::StatusCode::FORBIDDEN {
        return "Authentication failed while sending the test message. Nextcloud rejected the username/app password. If you configured the normal account password instead of an app password, create an app password in Nextcloud Security settings and use that here."
            .to_string();
    }
    if let Some(detail) = describe_nextcloud_ocs_meta_failure(body) {
        return format!("Nextcloud rejected the test message for room {room_id}: {detail}");
    }
    if status == reqwest::StatusCode::NOT_FOUND {
        return format!(
            "Nextcloud could not find room {room_id} (404). Check the Talk room token/ID."
        );
    }
    let base = describe_nextcloud_http_error(status, body);
    format!("Sending test message to room {room_id} failed. {base}")
}

fn describe_nextcloud_success_payload_failure(content_type: &str, body: &str) -> Option<String> {
    let body_lower = body.to_ascii_lowercase();
    if content_type.contains("text/html")
        || body_lower.contains("<html")
        || body_lower.contains("ssowat")
        || body_lower.contains("yunohost")
        || body_lower.contains("login")
    {
        return Some("Received an HTML login page instead of Nextcloud OCS JSON. This usually means SSO/proxy interception (for example YunoHost SSO). Interactive SSO login is not performed by this test endpoint."
            .to_string());
    }

    let parsed = match serde_json::from_str::<serde_json::Value>(body) {
        Ok(v) => v,
        Err(_) => {
            return Some(format!(
                "Received non-JSON response from capabilities endpoint. Check reverse-proxy/SSO routing. Response: {}",
                body_excerpt(body)
            ));
        }
    };

    if parsed.pointer("/ocs/meta/statuscode").is_none() {
        return Some("Capabilities response is JSON but missing OCS metadata (/ocs/meta/statuscode). Check URL/path rewriting and SSO middleware behavior."
            .to_string());
    }

    None
}

fn describe_nextcloud_ocs_meta_failure(body: &str) -> Option<String> {
    let parsed = serde_json::from_str::<serde_json::Value>(body).ok()?;
    let meta = parsed.pointer("/ocs/meta")?;
    let status_code = match meta.get("statuscode") {
        Some(serde_json::Value::Number(v)) => v.as_i64(),
        Some(serde_json::Value::String(v)) => v.parse::<i64>().ok(),
        _ => None,
    }?;
    if status_code == 100 {
        return None;
    }
    let status = meta
        .get("status")
        .and_then(serde_json::Value::as_str)
        .map(str::trim);
    let message = meta
        .get("message")
        .and_then(serde_json::Value::as_str)
        .map(str::trim)
        .filter(|v| !v.is_empty())
        .unwrap_or("Unknown Nextcloud OCS error");

    // Some Nextcloud setups return OCS `statuscode: 200` for capability probes
    // and `statuscode: 201` for successful chat-message creation, both with
    // `status/message: OK`. Treat those as success to avoid false negatives.
    if matches!(status_code, 200 | 201)
        && (status.is_some_and(|v| v.eq_ignore_ascii_case("ok"))
            || message.eq_ignore_ascii_case("ok"))
    {
        return None;
    }

    Some(format!(
        "Nextcloud OCS rejected the request (statuscode {status_code}): {message}"
    ))
}

fn truncated_error_detail(err: &reqwest::Error) -> String {
    let detail = err.to_string().replace('\n', " ");
    if detail.len() > 220 {
        format!("{}...", &detail[..220])
    } else {
        detail
    }
}

fn body_excerpt(body: &str) -> String {
    let compact = body.split_whitespace().collect::<Vec<_>>().join(" ");
    if compact.len() > 180 {
        format!("{}...", &compact[..180])
    } else {
        compact
    }
}

async fn project_package(
    facade: &dyn LifecycleProductFacade,
    context: LifecycleProductContext,
    package_ref: LifecyclePackageRef,
) -> Result<LifecycleProductResponse, RebornServicesError> {
    facade
        .project_package(context, package_ref)
        .await
        .map_err(map_lifecycle_error)
}

async fn setup_extension_response(
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    lifecycle: LifecycleProductResponse,
    requirements: &[LifecycleExtensionCredentialRequirement],
) -> Result<RebornSetupExtensionResponse, RebornServicesError> {
    let package_ref = lifecycle
        .package_ref
        .clone()
        .ok_or_else(RebornServicesError::internal_invariant)?;
    let setup_projection = extension_setup_credentials::project(
        extension_credentials,
        scope,
        extension_id,
        requirements,
    )
    .await?;
    let onboarding = extension_onboarding::from_lifecycle(&lifecycle).onboarding;
    Ok(RebornSetupExtensionResponse {
        package_ref,
        phase: lifecycle.phase,
        blockers: lifecycle.blockers,
        onboarding,
        payload: lifecycle.payload,
        secrets: setup_projection.secrets,
        fields: setup_projection.fields,
    })
}

fn setup_action(request: &WebUiSetupExtensionRequest) -> Result<SetupAction, RebornServicesError> {
    match request.action.as_deref() {
        None => Ok(SetupAction::View),
        Some("submit") => Ok(SetupAction::Submit),
        Some(_) => Err(validation_error(
            "action",
            WebUiInboundValidationCode::InvalidValue,
        )),
    }
}

pub(super) fn validation_error(
    field: &'static str,
    code: WebUiInboundValidationCode,
) -> RebornServicesError {
    RebornServicesError::from(WebUiInboundValidationError::new(field, code))
}

pub(super) fn map_lifecycle_error(error: ProductWorkflowError) -> RebornServicesError {
    match error {
        ProductWorkflowError::InvalidBindingRequest { .. }
        | ProductWorkflowError::UnsupportedActionKind { .. } => {
            RebornServicesError::from_status(RebornServicesErrorCode::InvalidRequest, 400, false)
        }
        ProductWorkflowError::BindingAccessDenied => {
            RebornServicesError::from_status(RebornServicesErrorCode::Forbidden, 403, false)
        }
        ProductWorkflowError::Transient { .. } => RebornServicesError::service_unavailable(true),
        ProductWorkflowError::BindingResolutionFailed { .. }
        | ProductWorkflowError::BindingRequired { .. }
        | ProductWorkflowError::TurnSubmissionRejected { .. }
        | ProductWorkflowError::TurnSubmissionFailed { .. }
        | ProductWorkflowError::TurnResumeRejected { .. }
        | ProductWorkflowError::TurnResumeDenied { .. }
        | ProductWorkflowError::ApprovalInteractionRejected { .. }
        | ProductWorkflowError::AuthInteractionRejected { .. }
        | ProductWorkflowError::AuthContinuationRejected { .. }
        | ProductWorkflowError::BeforeInboundPolicyFailed { .. }
        | ProductWorkflowError::DuplicateAction { .. }
        | ProductWorkflowError::OutboundTargetNotDirectMessage
        | ProductWorkflowError::UnknownInstallation => RebornServicesError::internal_invariant(),
    }
}

#[cfg(test)]
mod tests {
    use std::collections::BTreeMap;

    use async_trait::async_trait;
    use ironclaw_auth::{AuthProductScope, AuthProviderId, AuthSurface, CredentialAccountId};
    use ironclaw_host_api::{ExtensionId, InvocationId, ResourceScope, TenantId, UserId};
    use secrecy::SecretString;

    use crate::{
        ExtensionCredentialSetupService, ExtensionCredentialStatusRequest,
        ExtensionCredentialStoredValueRequest, ExtensionCredentialSubmitRequest,
        WebUiTestExtensionConnectionRequest,
    };

    use super::{
        describe_nextcloud_http_error, describe_nextcloud_ocs_meta_failure,
        test_connection_value_with_fallback,
    };

    struct StoredValueService {
        value: Option<SecretString>,
    }

    #[async_trait]
    impl ExtensionCredentialSetupService for StoredValueService {
        async fn credential_status(
            &self,
            _request: ExtensionCredentialStatusRequest,
        ) -> Result<Option<ironclaw_auth::CredentialAccountProjection>, crate::RebornServicesError>
        {
            Ok(None)
        }

        async fn submit_manual_token(
            &self,
            _request: ExtensionCredentialSubmitRequest,
        ) -> Result<CredentialAccountId, crate::RebornServicesError> {
            Err(crate::RebornServicesError::internal_invariant())
        }

        async fn resolve_stored_manual_token_value(
            &self,
            request: ExtensionCredentialStoredValueRequest,
        ) -> Result<Option<SecretString>, crate::RebornServicesError> {
            assert_eq!(
                request.provider,
                AuthProviderId::new("nextcloud_talk_base_url").expect("provider")
            );
            Ok(self.value.clone())
        }
    }

    #[tokio::test]
    async fn test_connection_value_prefers_request_payload_over_stored_value() {
        let request = WebUiTestExtensionConnectionRequest {
            fields: BTreeMap::from([(
                "nextcloud_talk_base_url".to_string(),
                "https://cloud.request.example".to_string(),
            )]),
            ..Default::default()
        };
        let service = StoredValueService {
            value: Some(SecretString::from(
                "https://cloud.saved.example".to_string(),
            )),
        };

        let value = test_connection_value_with_fallback(
            Some(&service),
            &request,
            "nextcloud_talk_base_url",
            test_scope(),
            &ExtensionId::new("nextcloud-talk").expect("extension"),
        )
        .await
        .expect("value resolution");

        assert_eq!(value.as_deref(), Some("https://cloud.request.example"));
    }

    #[tokio::test]
    async fn test_connection_value_uses_stored_value_when_request_is_blank() {
        let request = WebUiTestExtensionConnectionRequest {
            fields: BTreeMap::from([("nextcloud_talk_base_url".to_string(), "   ".to_string())]),
            ..Default::default()
        };
        let service = StoredValueService {
            value: Some(SecretString::from(
                " https://cloud.saved.example ".to_string(),
            )),
        };

        let value = test_connection_value_with_fallback(
            Some(&service),
            &request,
            "nextcloud_talk_base_url",
            test_scope(),
            &ExtensionId::new("nextcloud-talk").expect("extension"),
        )
        .await
        .expect("value resolution");

        assert_eq!(value.as_deref(), Some("https://cloud.saved.example"));
    }

    fn test_scope() -> AuthProductScope {
        AuthProductScope::new(
            ResourceScope {
                tenant_id: TenantId::new("tenant-nextcloud").expect("tenant"),
                user_id: UserId::new("user-nextcloud").expect("user"),
                agent_id: None,
                project_id: None,
                mission_id: None,
                thread_id: None,
                invocation_id: InvocationId::new(),
            },
            AuthSurface::Web,
        )
    }

    #[test]
    fn ocs_meta_accepts_statuscode_100() {
        let body = r#"{
            "ocs": {
                "meta": {
                    "status": "ok",
                    "statuscode": 100,
                    "message": "OK"
                }
            }
        }"#;
        assert_eq!(describe_nextcloud_ocs_meta_failure(body), None);
    }

    #[test]
    fn ocs_meta_accepts_statuscode_200_with_ok_message() {
        let body = r#"{
            "ocs": {
                "meta": {
                    "status": "ok",
                    "statuscode": 200,
                    "message": "OK"
                }
            }
        }"#;
        assert_eq!(describe_nextcloud_ocs_meta_failure(body), None);
    }

    #[test]
    fn ocs_meta_accepts_statuscode_201_with_ok_message() {
        let body = r#"{
            "ocs": {
                "meta": {
                    "status": "ok",
                    "statuscode": 201,
                    "message": "OK"
                }
            }
        }"#;
        assert_eq!(describe_nextcloud_ocs_meta_failure(body), None);
    }

    #[test]
    fn ocs_meta_rejects_non_success_statuscode() {
        let body = r#"{
            "ocs": {
                "meta": {
                    "status": "failure",
                    "statuscode": 997,
                    "message": "Auth failed"
                }
            }
        }"#;
        assert_eq!(
            describe_nextcloud_ocs_meta_failure(body),
            Some("Nextcloud OCS rejected the request (statuscode 997): Auth failed".to_string())
        );
    }

    #[test]
    fn http_error_maps_auth_and_server_statuses() {
        let auth_message = describe_nextcloud_http_error(reqwest::StatusCode::UNAUTHORIZED, "");
        assert!(
            auth_message.contains("Authentication failed"),
            "expected auth-specific guidance"
        );

        let server_message =
            describe_nextcloud_http_error(reqwest::StatusCode::INTERNAL_SERVER_ERROR, "oops");
        assert!(
            server_message.contains("server error"),
            "expected server-specific guidance"
        );
    }
}
