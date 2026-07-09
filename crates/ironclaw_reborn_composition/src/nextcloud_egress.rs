//! Host-mediated Nextcloud Talk protocol HTTP egress.
//!
//! The Nextcloud Talk adapter renders only constrained `EgressRequest` values
//! with declared host/path/method/body and an opaque credential handle.
//! This module keeps auth material on the host side, resolves the handle to
//! fake-user credentials, and injects HTTP Basic auth via host runtime egress.

use std::sync::Arc;

use async_trait::async_trait;
use base64::{Engine as _, engine::general_purpose::STANDARD};
use ironclaw_host_api::{
    CapabilityId, ExtensionId, InvocationId, NetworkMethod, NetworkPolicy, NetworkScheme,
    NetworkTargetPattern, ResourceScope, RuntimeCredentialTarget, RuntimeHttpEgressError,
    RuntimeHttpEgressRequest, RuntimeKind, SecretHandle, TrustClass,
};
use ironclaw_host_runtime::{
    HostRuntimeCredentialMaterial, HostRuntimeHttpEgressPort, HostRuntimeHttpEgressRequest,
};
use ironclaw_product_adapters::{
    EgressCredentialHandle, EgressRequest, EgressResponse, ProtocolHttpEgress,
    ProtocolHttpEgressError, RedactedString,
};
use ironclaw_secrets::SecretMaterial;
use ironclaw_wasm_product_adapters::{EgressPolicy, EgressPolicyError, EgressPolicyTarget};
use secrecy::{ExposeSecret, SecretString};
use thiserror::Error;

const NEXTCLOUD_EGRESS_TIMEOUT_MS: u32 = 10_000;
const NEXTCLOUD_EGRESS_RESPONSE_BODY_LIMIT_BYTES: u64 = 64 * 1024;
const NEXTCLOUD_EGRESS_CAPABILITY_ID: &str = "nextcloud_talk.egress";

#[derive(Debug, Clone, PartialEq, Eq, Error)]
pub enum NextcloudEgressCredentialError {
    #[error("unknown Nextcloud egress credential handle {handle}")]
    UnknownHandle { handle: String },
    #[error("Nextcloud egress credential handle {handle} is not authorized")]
    UnauthorizedHandle { handle: String },
    #[error("Nextcloud egress credential backend unavailable")]
    Unavailable,
}

pub struct NextcloudEgressCredential {
    username: SecretString,
    app_password: SecretString,
}

impl NextcloudEgressCredential {
    pub fn basic_auth(username: impl Into<String>, app_password: impl Into<String>) -> Self {
        Self {
            username: SecretString::from(username.into()),
            app_password: SecretString::from(app_password.into()),
        }
    }

    fn username(&self) -> &str {
        self.username.expose_secret()
    }

    fn app_password(&self) -> &str {
        self.app_password.expose_secret()
    }

    fn basic_auth_material(&self) -> String {
        format!("{}:{}", self.username(), self.app_password())
    }
}

#[async_trait]
pub trait NextcloudEgressCredentialProvider: Send + Sync {
    async fn resolve_nextcloud_egress_credential(
        &self,
        handle: &EgressCredentialHandle,
    ) -> Result<NextcloudEgressCredential, NextcloudEgressCredentialError>;
}

pub struct StaticNextcloudEgressCredentialProvider {
    handle: EgressCredentialHandle,
    credential: NextcloudEgressCredential,
}

impl StaticNextcloudEgressCredentialProvider {
    pub fn new(
        handle: EgressCredentialHandle,
        username: impl Into<String>,
        app_password: impl Into<String>,
    ) -> Self {
        Self {
            handle,
            credential: NextcloudEgressCredential::basic_auth(username, app_password),
        }
    }
}

#[async_trait]
impl NextcloudEgressCredentialProvider for StaticNextcloudEgressCredentialProvider {
    async fn resolve_nextcloud_egress_credential(
        &self,
        handle: &EgressCredentialHandle,
    ) -> Result<NextcloudEgressCredential, NextcloudEgressCredentialError> {
        if handle == &self.handle {
            Ok(NextcloudEgressCredential::basic_auth(
                self.credential.username().to_string(),
                self.credential.app_password().to_string(),
            ))
        } else {
            Err(NextcloudEgressCredentialError::UnknownHandle {
                handle: handle.as_str().to_string(),
            })
        }
    }
}

pub struct NextcloudProtocolHttpEgress {
    host_egress: HostRuntimeHttpEgressPort,
    credentials: Arc<dyn NextcloudEgressCredentialProvider>,
    policy: EgressPolicy,
    scope_template: ResourceScope,
}

impl NextcloudProtocolHttpEgress {
    pub fn new(
        host_egress: HostRuntimeHttpEgressPort,
        credentials: Arc<dyn NextcloudEgressCredentialProvider>,
        policy: EgressPolicy,
        scope_template: ResourceScope,
    ) -> Self {
        Self {
            host_egress,
            credentials,
            policy,
            scope_template,
        }
    }
}

#[async_trait]
impl ProtocolHttpEgress for NextcloudProtocolHttpEgress {
    async fn send(
        &self,
        request: EgressRequest,
    ) -> Result<EgressResponse, ProtocolHttpEgressError> {
        self.policy
            .check(EgressPolicyTarget {
                host: request.host(),
                credential_handle: request.credential_handle(),
            })
            .map_err(map_egress_policy_error)?;

        if request
            .headers()
            .iter()
            .any(|header| header.name().eq_ignore_ascii_case("authorization"))
        {
            return Err(ProtocolHttpEgressError::PolicyDenied {
                reason: RedactedString::new(
                    "Nextcloud adapter requests must use credential handles, not Authorization headers",
                ),
            });
        }

        let headers = request
            .headers()
            .iter()
            .map(|header| (header.name().to_string(), header.value().to_string()))
            .collect::<Vec<_>>();

        let capability_id = CapabilityId::new(NEXTCLOUD_EGRESS_CAPABILITY_ID).map_err(|error| {
            ProtocolHttpEgressError::PolicyDenied {
                reason: RedactedString::new(format!(
                    "invalid Nextcloud egress capability id: {error}"
                )),
            }
        })?;
        let credentials = self
            .credential_material(request.credential_handle())
            .await?;
        let scope = self.request_scope();

        let response = self
            .host_egress
            .execute(HostRuntimeHttpEgressRequest {
                extension_id: nextcloud_extension_id()?,
                trust: TrustClass::System,
                request: RuntimeHttpEgressRequest {
                    runtime: RuntimeKind::FirstParty,
                    scope,
                    capability_id,
                    method: network_method(request.method().as_str())?,
                    url: format!(
                        "https://{}{}",
                        request.host().as_str(),
                        request.path().as_str()
                    ),
                    headers,
                    body: request.body().to_vec(),
                    network_policy: nextcloud_network_policy(request.host().as_str()),
                    credential_injections: Vec::new(),
                    response_body_limit: Some(NEXTCLOUD_EGRESS_RESPONSE_BODY_LIMIT_BYTES),
                    save_body_to: None,
                    timeout_ms: Some(NEXTCLOUD_EGRESS_TIMEOUT_MS),
                },
                credentials,
            })
            .await
            .map_err(map_runtime_http_error)?;

        Ok(EgressResponse::new(response.status, response.body))
    }
}

impl NextcloudProtocolHttpEgress {
    fn request_scope(&self) -> ResourceScope {
        let mut scope = self.scope_template.clone();
        scope.invocation_id = InvocationId::new();
        scope
    }

    async fn credential_material(
        &self,
        handle: Option<&EgressCredentialHandle>,
    ) -> Result<Vec<HostRuntimeCredentialMaterial>, ProtocolHttpEgressError> {
        let Some(handle) = handle else {
            return Ok(Vec::new());
        };

        let credential = self
            .credentials
            .resolve_nextcloud_egress_credential(handle)
            .await
            .map_err(map_credential_error)?;
        validate_basic_auth_credential(&credential)?;

        let secret_handle = SecretHandle::new(handle.as_str()).map_err(|error| {
            ProtocolHttpEgressError::PolicyDenied {
                reason: RedactedString::new(format!(
                    "invalid Nextcloud egress credential handle: {error}"
                )),
            }
        })?;

        let encoded = STANDARD.encode(credential.basic_auth_material().as_bytes());
        Ok(vec![HostRuntimeCredentialMaterial {
            handle: secret_handle,
            material: SecretMaterial::from(encoded),
            target: RuntimeCredentialTarget::Header {
                name: "authorization".to_string(),
                prefix: Some("Basic ".to_string()),
            },
            required: true,
        }])
    }
}

fn validate_basic_auth_credential(
    credential: &NextcloudEgressCredential,
) -> Result<(), ProtocolHttpEgressError> {
    let username = credential.username();
    let app_password = credential.app_password();

    if username.trim().is_empty() {
        return Err(ProtocolHttpEgressError::PolicyDenied {
            reason: RedactedString::new("Nextcloud username must not be empty"),
        });
    }
    if username.bytes().any(|byte| byte < 0x20 || byte == 0x7f) {
        return Err(ProtocolHttpEgressError::PolicyDenied {
            reason: RedactedString::new("Nextcloud username contains control characters"),
        });
    }
    if username.contains(':') {
        return Err(ProtocolHttpEgressError::PolicyDenied {
            reason: RedactedString::new("Nextcloud username must not contain ':'"),
        });
    }
    if app_password.bytes().any(|byte| byte < 0x20 || byte == 0x7f) {
        return Err(ProtocolHttpEgressError::PolicyDenied {
            reason: RedactedString::new("Nextcloud app password contains control characters"),
        });
    }
    Ok(())
}

fn nextcloud_network_policy(host: &str) -> NetworkPolicy {
    NetworkPolicy {
        allowed_targets: vec![NetworkTargetPattern {
            scheme: Some(NetworkScheme::Https),
            host_pattern: host.to_string(),
            port: None,
        }],
        deny_private_ip_ranges: true,
        max_egress_bytes: None,
    }
}

fn nextcloud_extension_id() -> Result<ExtensionId, ProtocolHttpEgressError> {
    ExtensionId::new("nextcloud-talk").map_err(|error| ProtocolHttpEgressError::PolicyDenied {
        reason: RedactedString::new(format!("invalid Nextcloud extension id: {error}")),
    })
}

fn network_method(method: &str) -> Result<NetworkMethod, ProtocolHttpEgressError> {
    match method {
        "GET" => Ok(NetworkMethod::Get),
        "POST" => Ok(NetworkMethod::Post),
        "PUT" => Ok(NetworkMethod::Put),
        "PATCH" => Ok(NetworkMethod::Patch),
        "DELETE" => Ok(NetworkMethod::Delete),
        _ => Err(ProtocolHttpEgressError::PolicyDenied {
            reason: RedactedString::new("unsupported Nextcloud egress HTTP method"),
        }),
    }
}

fn map_egress_policy_error(error: EgressPolicyError) -> ProtocolHttpEgressError {
    match error {
        EgressPolicyError::UndeclaredHost { host } => ProtocolHttpEgressError::UndeclaredHost {
            host: host.as_str().to_string(),
        },
        EgressPolicyError::UnauthorizedCredentialHandle { handle }
        | EgressPolicyError::CredentialHandleNotPairedWithHost { handle, .. } => {
            ProtocolHttpEgressError::UnauthorizedCredentialHandle {
                handle: handle.as_str().to_string(),
            }
        }
        EgressPolicyError::UnauthenticatedEgressNotDeclared { .. } => {
            ProtocolHttpEgressError::PolicyDenied {
                reason: RedactedString::new("unauthenticated Nextcloud egress is not declared"),
            }
        }
    }
}

fn map_credential_error(error: NextcloudEgressCredentialError) -> ProtocolHttpEgressError {
    match error {
        NextcloudEgressCredentialError::UnknownHandle { handle } => {
            ProtocolHttpEgressError::UnknownCredentialHandle { handle }
        }
        NextcloudEgressCredentialError::UnauthorizedHandle { handle } => {
            ProtocolHttpEgressError::UnauthorizedCredentialHandle { handle }
        }
        NextcloudEgressCredentialError::Unavailable => ProtocolHttpEgressError::Network(
            RedactedString::new("Nextcloud credential backend unavailable"),
        ),
    }
}

fn map_runtime_http_error(error: RuntimeHttpEgressError) -> ProtocolHttpEgressError {
    match error.reason_code() {
        ironclaw_host_api::RuntimeHttpEgressReasonCode::PolicyDenied
        | ironclaw_host_api::RuntimeHttpEgressReasonCode::RequestDenied => {
            ProtocolHttpEgressError::PolicyDenied {
                reason: RedactedString::new(error.stable_runtime_reason()),
            }
        }
        ironclaw_host_api::RuntimeHttpEgressReasonCode::ResponseBodyLimitExceeded => {
            ProtocolHttpEgressError::LeakDetected
        }
        ironclaw_host_api::RuntimeHttpEgressReasonCode::CredentialUnavailable
        | ironclaw_host_api::RuntimeHttpEgressReasonCode::NetworkError
        | ironclaw_host_api::RuntimeHttpEgressReasonCode::ResponseError => {
            ProtocolHttpEgressError::Network(RedactedString::new(error.stable_runtime_reason()))
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::{Arc, Mutex};

    use async_trait::async_trait;
    use ironclaw_authorization::GrantAuthorizer;
    use ironclaw_extensions::ExtensionRegistry;
    use ironclaw_filesystem::LocalFilesystem;
    use ironclaw_host_runtime::{CapabilitySurfaceVersion, HostRuntimeServices};
    use ironclaw_network::{
        NetworkHttpEgress, NetworkHttpError, NetworkHttpRequest, NetworkHttpResponse, NetworkUsage,
    };
    use ironclaw_processes::{InMemoryProcessResultStore, InMemoryProcessStore, ProcessServices};
    use ironclaw_product_adapters::{
        DeclaredEgressHost, DeclaredEgressTarget, EgressCredentialHandle, EgressMethod,
        EgressPath,
    };
    use ironclaw_resources::InMemoryResourceGovernor;
    use ironclaw_secrets::InMemorySecretStore;

    use super::*;

    struct RecordingNetworkHttpEgress {
        requests: Arc<Mutex<Vec<NetworkHttpRequest>>>,
        response: Result<NetworkHttpResponse, NetworkHttpError>,
    }

    impl RecordingNetworkHttpEgress {
        fn ok() -> Self {
            Self {
                requests: Arc::new(Mutex::new(Vec::new())),
                response: Ok(NetworkHttpResponse {
                    status: 200,
                    headers: Vec::new(),
                    body: br#"{\"ok\":true}"#.to_vec(),
                    usage: NetworkUsage {
                        request_bytes: 0,
                        response_bytes: 11,
                        resolved_ip: None,
                    },
                }),
            }
        }

        fn failing(error: NetworkHttpError) -> Self {
            Self {
                requests: Arc::new(Mutex::new(Vec::new())),
                response: Err(error),
            }
        }

        fn requests(&self) -> Arc<Mutex<Vec<NetworkHttpRequest>>> {
            Arc::clone(&self.requests)
        }
    }

    #[async_trait]
    impl NetworkHttpEgress for RecordingNetworkHttpEgress {
        async fn execute(
            &self,
            request: NetworkHttpRequest,
        ) -> Result<NetworkHttpResponse, NetworkHttpError> {
            self.requests
                .lock()
                .expect("network HTTP requests lock")
                .push(request);
            self.response.clone()
        }
    }

    fn host_egress_port(
        network: RecordingNetworkHttpEgress,
    ) -> (
        HostRuntimeHttpEgressPort,
        Arc<Mutex<Vec<NetworkHttpRequest>>>,
    ) {
        let requests = network.requests();
        let services = test_host_runtime_services()
            .with_secret_store(Arc::new(InMemorySecretStore::new()))
            .try_with_host_http_egress(network)
            .expect("host HTTP egress should wire");
        let port = services
            .host_runtime_http_egress_port()
            .expect("host runtime HTTP egress port should be configured");
        (port, requests)
    }

    fn test_host_runtime_services() -> HostRuntimeServices<
        LocalFilesystem,
        InMemoryResourceGovernor,
        InMemoryProcessStore,
        InMemoryProcessResultStore,
    > {
        HostRuntimeServices::new(
            Arc::new(ExtensionRegistry::new()),
            Arc::new(LocalFilesystem::new()),
            Arc::new(InMemoryResourceGovernor::new()),
            Arc::new(GrantAuthorizer::new()),
            ProcessServices::in_memory(),
            CapabilitySurfaceVersion::new("surface-v1").expect("surface version"),
        )
    }

    fn nextcloud_host() -> DeclaredEgressHost {
        DeclaredEgressHost::new("next.cloud.kiga-gramschatz.de").expect("nextcloud host")
    }

    fn nextcloud_handle() -> EgressCredentialHandle {
        EgressCredentialHandle::new("nextcloud_talk_app_password").expect("nextcloud handle")
    }

    fn nextcloud_request(handle: EgressCredentialHandle) -> EgressRequest {
        EgressRequest::new(
            nextcloud_host(),
            EgressMethod::post(),
            EgressPath::new("/ocs/v2.php/apps/spreed/api/v1/chat/room-alpha").expect("path"),
        )
        .with_body(br#"{"message":"hi"}"#.to_vec())
        .with_credential_handle(Some(handle))
    }

    fn nextcloud_egress_with_network(
        network: RecordingNetworkHttpEgress,
    ) -> (NextcloudProtocolHttpEgress, Arc<Mutex<Vec<NetworkHttpRequest>>>) {
        let (host_egress, requests) = host_egress_port(network);
        let handle = nextcloud_handle();
        let egress = NextcloudProtocolHttpEgress::new(
            host_egress,
            Arc::new(StaticNextcloudEgressCredentialProvider::new(
                handle.clone(),
                "ironclaw",
                "app-pass",
            )),
            EgressPolicy::new([DeclaredEgressTarget::new(nextcloud_host(), Some(handle))]),
            ResourceScope::system(),
        );
        (egress, requests)
    }

    #[tokio::test]
    async fn nextcloud_protocol_http_egress_injects_basic_auth_host_side() {
        let network = RecordingNetworkHttpEgress::ok();
        let recorded_requests = network.requests();
        let (host_egress, _) = host_egress_port(network);
        let handle = nextcloud_handle();
        let egress = NextcloudProtocolHttpEgress::new(
            host_egress,
            Arc::new(StaticNextcloudEgressCredentialProvider::new(
                handle.clone(),
                "ironclaw",
                "app-pass",
            )),
            EgressPolicy::new([DeclaredEgressTarget::new(
                nextcloud_host(),
                Some(handle.clone()),
            )]),
            ResourceScope::system(),
        );

        let response = egress
            .send(nextcloud_request(handle))
            .await
            .expect("nextcloud egress should succeed");

        assert_eq!(response.status(), 200);
        let requests = recorded_requests.lock().expect("network requests lock");
        assert_eq!(requests.len(), 1);
        assert_eq!(
            requests[0].url,
            "https://next.cloud.kiga-gramschatz.de/ocs/v2.php/apps/spreed/api/v1/chat/room-alpha"
        );
        assert_eq!(requests[0].method, NetworkMethod::Post);
        assert_eq!(requests[0].body, br#"{"message":"hi"}"#);
        assert_eq!(
            requests[0]
                .headers
                .iter()
                .find(|(name, _)| name.eq_ignore_ascii_case("authorization")),
            Some(&(
                "authorization".to_string(),
                "Basic aXJvbmNsYXc6YXBwLXBhc3M=".to_string()
            ))
        );
    }

    #[tokio::test]
    async fn nextcloud_protocol_http_egress_uses_fresh_invocation_scope_per_send() {
        let (egress, recorded_requests) =
            nextcloud_egress_with_network(RecordingNetworkHttpEgress::ok());

        egress
            .send(nextcloud_request(nextcloud_handle()))
            .await
            .expect("first Nextcloud egress should succeed");
        egress
            .send(nextcloud_request(nextcloud_handle()))
            .await
            .expect("second Nextcloud egress should succeed");

        let requests = recorded_requests.lock().expect("network requests lock");
        assert_eq!(requests.len(), 2);
        assert_ne!(
            requests[0].scope.invocation_id, requests[1].scope.invocation_id,
            "each Nextcloud protocol egress call must stage credentials in a per-request invocation scope"
        );
    }

    #[tokio::test]
    async fn nextcloud_protocol_http_egress_rejects_unknown_handle_before_network() {
        let network = RecordingNetworkHttpEgress::ok();
        let recorded_requests = network.requests();
        let (host_egress, _) = host_egress_port(network);
        let unknown = EgressCredentialHandle::new("other_token").expect("other handle");
        let egress = NextcloudProtocolHttpEgress::new(
            host_egress,
            Arc::new(StaticNextcloudEgressCredentialProvider::new(
                nextcloud_handle(),
                "ironclaw",
                "app-pass",
            )),
            EgressPolicy::new([DeclaredEgressTarget::new(
                nextcloud_host(),
                Some(unknown.clone()),
            )]),
            ResourceScope::system(),
        );

        let error = egress
            .send(nextcloud_request(unknown))
            .await
            .expect_err("unknown handle should fail before network");

        assert!(matches!(
            error,
            ProtocolHttpEgressError::UnknownCredentialHandle { .. }
        ));
        assert!(
            recorded_requests
                .lock()
                .expect("network requests lock")
                .is_empty()
        );
    }

    #[tokio::test]
    async fn nextcloud_protocol_http_egress_rejects_adapter_authorization_header() {
        let (egress, recorded_requests) =
            nextcloud_egress_with_network(RecordingNetworkHttpEgress::ok());
        let request = nextcloud_request(nextcloud_handle()).with_header(
            ironclaw_product_adapters::EgressHeader::new("Authorization", "Basic abc")
                .expect("header"),
        );

        let error = egress
            .send(request)
            .await
            .expect_err("adapter-side Authorization header must be rejected");

        assert!(matches!(
            error,
            ProtocolHttpEgressError::PolicyDenied { .. }
        ));
        assert!(
            recorded_requests
                .lock()
                .expect("network requests lock")
                .is_empty()
        );
    }

    #[tokio::test]
    async fn nextcloud_protocol_http_egress_maps_runtime_http_failures() {
        let cases = [
            (
                NetworkHttpError::InvalidUrl {
                    reason: "invalid_url".to_string(),
                    request_bytes: 12,
                    response_bytes: 0,
                },
                "request-denied",
                RuntimeErrorExpectation::Network,
            ),
            (
                NetworkHttpError::PolicyDenied {
                    reason: "policy_denied".to_string(),
                    request_bytes: 12,
                    response_bytes: 0,
                },
                "policy-denied",
                RuntimeErrorExpectation::PolicyDenied,
            ),
            (
                NetworkHttpError::ResponseBodyLimit {
                    limit: 65_536,
                    request_bytes: 12,
                    response_bytes: 65_536,
                    partial_response: None,
                },
                "body-limit",
                RuntimeErrorExpectation::LeakDetected,
            ),
            (
                NetworkHttpError::Dns {
                    reason: "dns_failure".to_string(),
                    request_bytes: 12,
                    response_bytes: 0,
                },
                "network",
                RuntimeErrorExpectation::Network,
            ),
        ];

        for (network_error, label, expectation) in cases {
            let (egress, _) =
                nextcloud_egress_with_network(RecordingNetworkHttpEgress::failing(network_error));
            let error = match egress.send(nextcloud_request(nextcloud_handle())).await {
                Ok(response) => panic!("{label} case should fail, got {response:?}"),
                Err(error) => error,
            };

            expectation.assert_matches(error, label);
        }
    }

    #[derive(Clone, Copy)]
    enum RuntimeErrorExpectation {
        PolicyDenied,
        LeakDetected,
        Network,
    }

    impl RuntimeErrorExpectation {
        fn assert_matches(self, error: ProtocolHttpEgressError, label: &str) {
            match self {
                Self::PolicyDenied => assert!(
                    matches!(error, ProtocolHttpEgressError::PolicyDenied { .. }),
                    "{label}: expected policy denied, got {error:?}"
                ),
                Self::LeakDetected => assert!(
                    matches!(error, ProtocolHttpEgressError::LeakDetected),
                    "{label}: expected leak detected, got {error:?}"
                ),
                Self::Network => assert!(
                    matches!(error, ProtocolHttpEgressError::Network(_)),
                    "{label}: expected network error, got {error:?}"
                ),
            }
        }
    }
}