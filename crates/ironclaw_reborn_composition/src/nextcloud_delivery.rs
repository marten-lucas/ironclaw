//! Nextcloud Talk final-reply delivery driver.
//!
//! After the host acknowledges a webhook inbound turn, this module drives the
//! outbound delivery path: polls the TurnCoordinator for run completion, reads
//! the finalized assistant reply from the session thread, and POSTs it back to
//! the Nextcloud Talk chat API via the host egress.
//!
//! Only `Completed` runs produce a reply POST. `Failed`, `Cancelled`, and
//! other terminal statuses are silently swallowed — the channel does not post
//! error messages back to users.

use std::sync::Arc;
use std::time::Duration;

use async_trait::async_trait;
use ironclaw_auth::{
    AuthProductError, AuthProductScope, AuthProviderId, AuthSurface,
    CredentialAccountSelectionRequest,
};
use ironclaw_host_api::{
    AgentId, ExtensionId, InvocationId, ProjectId, ResourceScope, RuntimeCredentialAccountSetup,
    TenantId, UserId,
};
use ironclaw_product_adapters::{
    DeclaredEgressHost, EgressCredentialHandle, EgressHeader, EgressMethod, EgressPath,
    EgressRequest,
};
use ironclaw_product_workflow::{ConversationBindingService, ResolveBindingRequest};
use ironclaw_threads::{FinalizedAssistantMessageByRunRequest, SessionThreadService};
use ironclaw_turns::{GetRunStateRequest, TurnCoordinator, TurnRunId, TurnScope, TurnStatus};
use secrecy::ExposeSecret;

use crate::nextcloud_egress::{
    NextcloudEgressCredential, NextcloudEgressCredentialError, NextcloudEgressCredentialProvider,
    NextcloudProtocolHttpEgress,
};
use crate::product_auth_runtime_credentials::{
    RuntimeCredentialAccountSelectionRequest, RuntimeCredentialAccountSelectionService,
};
use ironclaw_secrets::SecretStore;

const DEFAULT_DELIVERY_POLL_INTERVAL: Duration = Duration::from_millis(500);
const DEFAULT_DELIVERY_MAX_WAIT: Duration = Duration::from_secs(120);

/// Per-instance delivery configuration for Nextcloud Talk.
///
/// All fields needed to poll a run to completion and POST the reply. Carries its
/// own egress instance built from the host runtime egress port + credential
/// provider so it is independent of the inbound handler path.
#[derive(Clone)]
pub(crate) struct NextcloudTalkFinalReplyDriver {
    turn_coordinator: Arc<dyn TurnCoordinator>,
    thread_service: Arc<dyn SessionThreadService>,
    binding_service: Arc<dyn ConversationBindingService>,
    egress: Arc<NextcloudProtocolHttpEgress>,
    poll_interval: Duration,
    max_wait: Duration,
}

impl NextcloudTalkFinalReplyDriver {
    pub(crate) fn new(
        turn_coordinator: Arc<dyn TurnCoordinator>,
        thread_service: Arc<dyn SessionThreadService>,
        binding_service: Arc<dyn ConversationBindingService>,
        egress: Arc<NextcloudProtocolHttpEgress>,
    ) -> Self {
        Self {
            turn_coordinator,
            thread_service,
            binding_service,
            egress,
            poll_interval: DEFAULT_DELIVERY_POLL_INTERVAL,
            max_wait: DEFAULT_DELIVERY_MAX_WAIT,
        }
    }

    /// Spawn an async delivery task that waits for the given run to reach a
    /// terminal state and then POSTs the reply to Nextcloud. Returns
    /// immediately; the task runs in the background.
    pub(crate) fn spawn_delivery(
        self: Arc<Self>,
        adapter_id: ironclaw_product_adapters::ProductAdapterId,
        installation_id: ironclaw_product_adapters::AdapterInstallationId,
        external_actor_ref: ironclaw_product_adapters::ExternalActorRef,
        external_conversation_ref: ironclaw_product_adapters::ExternalConversationRef,
        external_event_id: ironclaw_product_adapters::ExternalEventId,
        auth_claim: ironclaw_product_adapters::VerifiedAuthClaim,
        run_id: TurnRunId,
        app_password_handle: EgressCredentialHandle,
        nextcloud_host: DeclaredEgressHost,
    ) {
        tokio::spawn(async move {
            if let Err(error) = self
                .deliver_run(
                    adapter_id,
                    installation_id,
                    external_actor_ref,
                    external_conversation_ref,
                    external_event_id,
                    auth_claim,
                    run_id,
                    app_password_handle,
                    nextcloud_host,
                )
                .await
            {
                tracing::warn!(
                    target = "ironclaw::reborn::nextcloud_delivery",
                    error = %error,
                    %run_id,
                    "Nextcloud Talk final-reply delivery failed"
                );
            }
        });
    }

    async fn deliver_run(
        &self,
        adapter_id: ironclaw_product_adapters::ProductAdapterId,
        installation_id: ironclaw_product_adapters::AdapterInstallationId,
        external_actor_ref: ironclaw_product_adapters::ExternalActorRef,
        external_conversation_ref: ironclaw_product_adapters::ExternalConversationRef,
        external_event_id: ironclaw_product_adapters::ExternalEventId,
        auth_claim: ironclaw_product_adapters::VerifiedAuthClaim,
        run_id: TurnRunId,
        app_password_handle: EgressCredentialHandle,
        nextcloud_host: DeclaredEgressHost,
    ) -> Result<(), NextcloudDeliveryError> {
        // Resolve the conversation binding to get the thread_id and TurnScope.
        let binding = self
            .binding_service
            .lookup_binding(ResolveBindingRequest {
                adapter_id,
                installation_id,
                external_actor_ref,
                external_conversation_ref: external_conversation_ref.clone(),
                external_event_id,
                route_kind: ironclaw_product_workflow::ProductConversationRouteKind::Shared,
                auth_claim,
            })
            .await
            .map_err(|error| NextcloudDeliveryError::BindingLookup(error.to_string()))?;

        let turn_scope = TurnScope::new(
            binding.tenant_id.clone(),
            binding.agent_id.clone(),
            binding.project_id.clone(),
            binding.thread_id.clone(),
        );

        // Poll until the run reaches a terminal status.
        let terminal_status = self.wait_for_terminal(&turn_scope, run_id).await?;
        if terminal_status != TurnStatus::Completed {
            tracing::debug!(
                target = "ironclaw::reborn::nextcloud_delivery",
                %run_id,
                ?terminal_status,
                "Nextcloud Talk run did not complete successfully; skipping reply delivery"
            );
            return Ok(());
        }

        // Read the finalized assistant reply text.
        let thread_scope = match binding.into_thread_scope() {
            Some(scope) => scope,
            None => {
                tracing::warn!(
                    target = "ironclaw::reborn::nextcloud_delivery",
                    %run_id,
                    "Nextcloud Talk delivery binding has no agent_id; skipping reply delivery"
                );
                return Ok(());
            }
        };
        let reply_text = self
            .thread_service
            .finalized_assistant_message_by_run(FinalizedAssistantMessageByRunRequest {
                scope: thread_scope,
                thread_id: turn_scope.thread_id.clone(),
                turn_run_id: run_id.to_string(),
            })
            .await
            .map_err(|error| NextcloudDeliveryError::ThreadRead(error.to_string()))?
            .and_then(|record| record.content);

        let Some(text) = reply_text else {
            tracing::debug!(
                target = "ironclaw::reborn::nextcloud_delivery",
                %run_id,
                "Nextcloud Talk completed run has no finalized assistant text; skipping reply delivery"
            );
            return Ok(());
        };

        // Build the POST request to Nextcloud's chat API.
        let room_token = external_conversation_ref
            .conversation_id()
            .to_string();
        let reply_to = reply_to_message_id(&external_conversation_ref);

        let body_value = serde_json::json!({ "message": text, "replyTo": reply_to });
        let body = serde_json::to_vec(&body_value)
            .map_err(|error| NextcloudDeliveryError::Serialize(error.to_string()))?;

        let path = format!("/ocs/v2.php/apps/spreed/api/v1/chat/{room_token}");
        let egress_path = EgressPath::new(path)
            .map_err(|error| NextcloudDeliveryError::EgressRequest(error.to_string()))?;

        let ocs_header = EgressHeader::new("OCS-APIRequest", "true")
            .map_err(|error| NextcloudDeliveryError::EgressRequest(error.to_string()))?;
        let accept_header = EgressHeader::new("Accept", "application/json")
            .map_err(|error| NextcloudDeliveryError::EgressRequest(error.to_string()))?;
        let content_type = EgressHeader::new("Content-Type", "application/json")
            .map_err(|error| NextcloudDeliveryError::EgressRequest(error.to_string()))?;

        let request = EgressRequest::new(nextcloud_host, EgressMethod::post(), egress_path)
            .with_header(content_type)
            .with_header(accept_header)
            .with_header(ocs_header)
            .with_body(body)
            .with_credential_handle(Some(app_password_handle));

        use ironclaw_product_adapters::ProtocolHttpEgress;
        self.egress
            .send(request)
            .await
            .map_err(|error| NextcloudDeliveryError::Egress(format!("{error:?}")))?;

        tracing::debug!(
            target = "ironclaw::reborn::nextcloud_delivery",
            %run_id,
            room_token = %room_token,
            "Nextcloud Talk final reply delivered successfully"
        );

        Ok(())
    }

    async fn wait_for_terminal(
        &self,
        scope: &TurnScope,
        run_id: TurnRunId,
    ) -> Result<TurnStatus, NextcloudDeliveryError> {
        let start = std::time::Instant::now();
        loop {
            let state = self
                .turn_coordinator
                .get_run_state(GetRunStateRequest {
                    scope: scope.clone(),
                    run_id,
                })
                .await
                .map_err(|error| NextcloudDeliveryError::TurnCoordinator(error.to_string()))?;

            if state.status.is_terminal() {
                return Ok(state.status);
            }

            if start.elapsed() > self.max_wait {
                return Err(NextcloudDeliveryError::Timeout {
                    run_id,
                    max_wait: self.max_wait,
                });
            }

            tokio::time::sleep(self.poll_interval).await;
        }
    }
}

trait ResolvedBindingExt {
    fn into_thread_scope(self) -> Option<ironclaw_threads::ThreadScope>;
}

impl ResolvedBindingExt for ironclaw_product_workflow::ResolvedBinding {
    fn into_thread_scope(self) -> Option<ironclaw_threads::ThreadScope> {
        let agent_id = self.agent_id?;
        Some(ironclaw_threads::ThreadScope {
            tenant_id: self.tenant_id,
            agent_id,
            project_id: self.project_id,
            owner_user_id: self.subject_user_id.or(Some(self.actor_user_id)),
            mission_id: None,
        })
    }
}

#[derive(Debug, thiserror::Error)]
pub(crate) enum NextcloudDeliveryError {
    #[error("Nextcloud Talk delivery binding lookup failed: {0}")]
    BindingLookup(String),
    #[error("Nextcloud Talk delivery turn coordinator error: {0}")]
    TurnCoordinator(String),
    #[error("Nextcloud Talk delivery timed out after {max_wait:?} waiting for run {run_id}")]
    Timeout {
        run_id: TurnRunId,
        max_wait: Duration,
    },
    #[error("Nextcloud Talk delivery thread read failed: {0}")]
    ThreadRead(String),
    #[error("Nextcloud Talk delivery serialize error: {0}")]
    Serialize(String),
    #[error("Nextcloud Talk delivery egress request build error: {0}")]
    EgressRequest(String),
    #[error("Nextcloud Talk delivery egress failed: {0}")]
    Egress(String),
}

/// A `NextcloudEgressCredentialProvider` that resolves credentials from the
/// runtime credential account selection service (same system that resolves
/// the webhook secret for ingress verification).
pub(crate) struct RuntimeCredentialNextcloudEgressProvider {
    runtime_credential_accounts: Arc<dyn RuntimeCredentialAccountSelectionService>,
    secret_store: Arc<dyn SecretStore>,
    requester_extension: ExtensionId,
    tenant_id: TenantId,
    agent_id: AgentId,
    project_id: Option<ProjectId>,
    user_id: UserId,
}

impl RuntimeCredentialNextcloudEgressProvider {
    pub(crate) fn new(
        runtime_credential_accounts: Arc<dyn RuntimeCredentialAccountSelectionService>,
        secret_store: Arc<dyn SecretStore>,
        requester_extension: ExtensionId,
        tenant_id: TenantId,
        agent_id: AgentId,
        project_id: Option<ProjectId>,
        user_id: UserId,
    ) -> Self {
        Self {
            runtime_credential_accounts,
            secret_store,
            requester_extension,
            tenant_id,
            agent_id,
            project_id,
            user_id,
        }
    }

    async fn resolve_secret(
        &self,
        provider_id: &str,
    ) -> Result<String, NextcloudEgressCredentialError> {
        let provider =
            AuthProviderId::new(provider_id).map_err(|_| NextcloudEgressCredentialError::Unavailable)?;
        let scope = AuthProductScope::new(
            ResourceScope {
                tenant_id: self.tenant_id.clone(),
                user_id: self.user_id.clone(),
                agent_id: Some(self.agent_id.clone()),
                project_id: self.project_id.clone(),
                mission_id: None,
                thread_id: None,
                invocation_id: InvocationId::new(),
            },
            AuthSurface::Api,
        );
        let selection_request = RuntimeCredentialAccountSelectionRequest::new(
            CredentialAccountSelectionRequest::new(scope.clone(), provider)
                .for_extension(self.requester_extension.clone()),
            scope,
            RuntimeCredentialAccountSetup::ManualToken,
            Vec::new(),
        );
        let account = self
            .runtime_credential_accounts
            .select_unique_configured_runtime_account(selection_request)
            .await
            .map_err(|error| match error {
                AuthProductError::CredentialMissing
                | AuthProductError::CrossScopeDenied
                | AuthProductError::AccountSelectionRequired => {
                    NextcloudEgressCredentialError::UnknownHandle {
                        handle: provider_id.to_string(),
                    }
                }
                _ => NextcloudEgressCredentialError::Unavailable,
            })?;
        let handle = account
            .access_secret
            .ok_or(NextcloudEgressCredentialError::UnknownHandle {
                handle: provider_id.to_string(),
            })?;
        let lease = self
            .secret_store
            .lease_once(&account.scope.resource, &handle)
            .await
            .map_err(|_| NextcloudEgressCredentialError::Unavailable)?;
        let material = self
            .secret_store
            .consume(&account.scope.resource, lease.id)
            .await
            .map_err(|_| NextcloudEgressCredentialError::Unavailable)?;
        Ok(material.expose_secret().to_string())
    }
}

fn reply_to_message_id(
    external_conversation_ref: &ironclaw_product_adapters::ExternalConversationRef,
) -> u64 {
    external_conversation_ref
        .reply_target_message_id()
        .and_then(|id| id.parse::<u64>().ok())
        .unwrap_or(0)
}

#[cfg(test)]
mod tests {
    use ironclaw_product_adapters::ExternalConversationRef;

    use super::reply_to_message_id;

    #[test]
    fn reply_to_falls_back_to_zero_without_message_id() {
        let conversation = ExternalConversationRef::new(None::<&str>, "room-alpha", None::<&str>, None)
            .expect("conversation ref");

        assert_eq!(reply_to_message_id(&conversation), 0);
    }

    #[test]
    fn reply_to_uses_parseable_message_id() {
        let conversation = ExternalConversationRef::new(
            None::<&str>,
            "room-alpha",
            None::<&str>,
            Some("42"),
        )
        .expect("conversation ref");

        assert_eq!(reply_to_message_id(&conversation), 42);
    }
}

#[async_trait]
impl NextcloudEgressCredentialProvider for RuntimeCredentialNextcloudEgressProvider {
    async fn resolve_nextcloud_egress_credential(
        &self,
        handle: &EgressCredentialHandle,
    ) -> Result<NextcloudEgressCredential, NextcloudEgressCredentialError> {
        if handle.as_str() != "nextcloud_talk_app_password" {
            return Err(NextcloudEgressCredentialError::UnknownHandle {
                handle: handle.as_str().to_string(),
            });
        }
        let username = self.resolve_secret("nextcloud_talk_bot_username").await?;
        let app_password = self.resolve_secret("nextcloud_talk_app_password").await?;
        Ok(NextcloudEgressCredential::basic_auth(username, app_password))
    }
}
