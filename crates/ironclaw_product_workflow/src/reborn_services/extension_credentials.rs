use ironclaw_auth::{
    AuthProductScope, AuthProviderId, AuthSurface, CredentialAccountProjection, ProviderScope,
};
use ironclaw_host_api::{ExtensionId, InvocationId, ResourceScope, UserId};
use uuid::Uuid;

use crate::{
    LifecycleExtensionCredentialRequirement, LifecycleExtensionCredentialSetup,
    LifecyclePackageRef, RebornServicesError, RebornServicesErrorCode, RebornServicesErrorKind,
    WebUiAuthenticatedCaller,
};

use super::{ExtensionCredentialSetupService, ExtensionCredentialStatusRequest};

const NEXTCLOUD_TALK_EXTENSION_ID: &str = "nextcloud-talk";
const REBORN_WEBUI_USER_ID_ENV: &str = "IRONCLAW_REBORN_WEBUI_USER_ID";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(super) enum ExtensionCredentialReadiness {
    NotRequired,
    Configured,
    MissingRequired,
    Unknown,
}

enum RequirementCredentialReadiness {
    Configured,
    Missing,
    Unknown,
}

pub(super) fn credential_scope(
    caller: &WebUiAuthenticatedCaller,
    package_ref: &LifecyclePackageRef,
) -> AuthProductScope {
    let scope_user_id = credential_scope_user_id(
        caller,
        package_ref,
        configured_nextcloud_scope_user_id().as_deref(),
    );
    let seed = format!(
        "webui-v2-extension-setup:{}:{}:{}:{}:{}",
        caller.tenant_id.as_str(),
        scope_user_id.as_str(),
        caller.agent_id.as_ref().map(|id| id.as_str()).unwrap_or(""),
        caller
            .project_id
            .as_ref()
            .map(|id| id.as_str())
            .unwrap_or(""),
        package_ref.id.as_str()
    );
    AuthProductScope::new(
        ResourceScope {
            tenant_id: caller.tenant_id.clone(),
            user_id: scope_user_id,
            agent_id: caller.agent_id.clone(),
            project_id: caller.project_id.clone(),
            mission_id: None,
            thread_id: None,
            invocation_id: InvocationId::from_uuid(Uuid::new_v5(
                &Uuid::NAMESPACE_OID,
                seed.as_bytes(),
            )),
        },
        AuthSurface::Web,
    )
}

fn configured_nextcloud_scope_user_id() -> Option<String> {
    std::env::var(REBORN_WEBUI_USER_ID_ENV).ok()
}

fn credential_scope_user_id(
    caller: &WebUiAuthenticatedCaller,
    package_ref: &LifecyclePackageRef,
    configured_user_id: Option<&str>,
) -> UserId {
    if package_ref.id.as_str() != NEXTCLOUD_TALK_EXTENSION_ID {
        return caller.user_id.clone();
    }
    let Some(configured_user_id) = configured_user_id.map(str::trim) else {
        return caller.user_id.clone();
    };
    if configured_user_id.is_empty() {
        return caller.user_id.clone();
    }
    UserId::new(configured_user_id).unwrap_or_else(|_| caller.user_id.clone())
}

pub(super) fn unique_requirements<'a>(
    requirements: impl IntoIterator<Item = &'a LifecycleExtensionCredentialRequirement>,
) -> Vec<LifecycleExtensionCredentialRequirement> {
    let mut unique = Vec::new();
    for requirement in requirements {
        if unique
            .iter()
            .any(|seen: &LifecycleExtensionCredentialRequirement| seen.name == requirement.name)
        {
            continue;
        }
        unique.push(requirement.clone());
    }
    unique
}

pub(super) async fn readiness_for_requirements(
    extension_credentials: Option<&dyn ExtensionCredentialSetupService>,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    requirements: &[LifecycleExtensionCredentialRequirement],
) -> Result<ExtensionCredentialReadiness, RebornServicesError> {
    let requirements = unique_requirements(requirements);
    if requirements.is_empty() {
        return Ok(ExtensionCredentialReadiness::NotRequired);
    }
    let Some(service) = extension_credentials else {
        return Ok(ExtensionCredentialReadiness::Unknown);
    };
    let mut saw_unknown = false;
    for requirement in requirements
        .iter()
        .filter(|requirement| requirement.required)
    {
        match credential_readiness_for_requirement(
            service,
            scope.clone(),
            extension_id,
            requirement,
        )
        .await?
        {
            RequirementCredentialReadiness::Configured => {}
            RequirementCredentialReadiness::Missing => {
                return Ok(ExtensionCredentialReadiness::MissingRequired);
            }
            RequirementCredentialReadiness::Unknown => {
                saw_unknown = true;
            }
        }
    }
    if saw_unknown {
        return Ok(ExtensionCredentialReadiness::Unknown);
    }
    Ok(ExtensionCredentialReadiness::Configured)
}

async fn credential_readiness_for_requirement(
    service: &dyn ExtensionCredentialSetupService,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<RequirementCredentialReadiness, RebornServicesError> {
    let request = credential_status_request(scope, extension_id, requirement)?;
    match service.credential_status(request).await {
        Ok(Some(_)) => Ok(RequirementCredentialReadiness::Configured),
        Ok(None) => Ok(RequirementCredentialReadiness::Missing),
        Err(error) if is_retryable_status_failure(&error) => {
            warn_retryable_status_failure(
                extension_id,
                requirement,
                &error,
                "readiness_projection",
            );
            Ok(RequirementCredentialReadiness::Unknown)
        }
        Err(error) => Err(error),
    }
}

pub(super) async fn credential_status_for_requirement(
    service: &dyn ExtensionCredentialSetupService,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<Option<CredentialAccountProjection>, RebornServicesError> {
    let request = credential_status_request(scope, extension_id, requirement)?;
    match service.credential_status(request).await {
        Ok(account) => Ok(account),
        Err(error) if is_retryable_status_failure(&error) => {
            warn_retryable_status_failure(extension_id, requirement, &error, "setup_projection");
            Ok(None)
        }
        Err(error) => Err(error),
    }
}

pub(super) async fn credential_status_for_requirement_strict(
    service: &dyn ExtensionCredentialSetupService,
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<Option<CredentialAccountProjection>, RebornServicesError> {
    let request = credential_status_request(scope, extension_id, requirement)?;
    service.credential_status(request).await
}

fn credential_status_request(
    scope: AuthProductScope,
    extension_id: &ExtensionId,
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<ExtensionCredentialStatusRequest, RebornServicesError> {
    Ok(ExtensionCredentialStatusRequest {
        scope,
        provider: provider_for_requirement(requirement)?,
        setup: requirement.setup.clone(),
        provider_scopes: provider_scopes_for_requirement(requirement)?,
        requester_extension: extension_id.clone(),
    })
}

pub(super) fn provider_for_requirement(
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<AuthProviderId, RebornServicesError> {
    AuthProviderId::new(requirement.provider.as_str())
        .map_err(|_| RebornServicesError::internal_invariant())
}

fn provider_scopes_for_requirement(
    requirement: &LifecycleExtensionCredentialRequirement,
) -> Result<Vec<ProviderScope>, RebornServicesError> {
    let LifecycleExtensionCredentialSetup::OAuth { scopes } = &requirement.setup else {
        return Ok(Vec::new());
    };
    scopes
        .iter()
        .map(|scope| {
            ProviderScope::new(scope.clone()).map_err(|_| RebornServicesError::internal_invariant())
        })
        .collect()
}

fn is_retryable_status_failure(error: &RebornServicesError) -> bool {
    error.retryable
        && (error.code == RebornServicesErrorCode::Unavailable
            || error.kind == RebornServicesErrorKind::ServiceUnavailable)
}

fn warn_retryable_status_failure(
    extension_id: &ExtensionId,
    requirement: &LifecycleExtensionCredentialRequirement,
    error: &RebornServicesError,
    usage: &'static str,
) {
    tracing::warn!(
        target: "ironclaw::reborn::extension_credentials",
        extension_id = %extension_id.as_str(),
        provider = %requirement.provider,
        requirement = %requirement.name,
        usage,
        code = ?error.code,
        kind = ?error.kind,
        status_code = error.status_code,
        retryable = error.retryable,
        "credential status unavailable during extension credential projection"
    );
}

#[cfg(test)]
mod tests {
    use ironclaw_host_api::{AgentId, ProjectId, TenantId};

    use super::*;
    use crate::LifecyclePackageKind;

    fn caller() -> WebUiAuthenticatedCaller {
        WebUiAuthenticatedCaller::new(
            TenantId::new("tenant-alpha").expect("valid tenant"),
            UserId::new("user-alpha").expect("valid user"),
            Some(AgentId::new("agent-alpha").expect("valid agent")),
            Some(ProjectId::new("project-alpha").expect("valid project")),
        )
    }

    fn extension_ref(id: &str) -> LifecyclePackageRef {
        LifecyclePackageRef::new(LifecyclePackageKind::Extension, id).expect("valid package ref")
    }

    #[test]
    fn nextcloud_scope_prefers_configured_service_user() {
        let resolved = credential_scope_user_id(
            &caller(),
            &extension_ref("nextcloud-talk"),
            Some("reborn-cli"),
        );

        assert_eq!(resolved.as_str(), "reborn-cli");
    }

    #[test]
    fn nextcloud_scope_falls_back_on_invalid_configured_user() {
        let resolved = credential_scope_user_id(
            &caller(),
            &extension_ref("nextcloud-talk"),
            Some("  "),
        );

        assert_eq!(resolved.as_str(), "user-alpha");
    }

    #[test]
    fn non_nextcloud_scope_keeps_authenticated_user() {
        let resolved = credential_scope_user_id(
            &caller(),
            &extension_ref("github"),
            Some("reborn-cli"),
        );

        assert_eq!(resolved.as_str(), "user-alpha");
    }
}
