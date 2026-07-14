use std::path::Path;

use ironclaw_reborn_composition::NextcloudTalkRouteConfig;
use ironclaw_reborn_composition::host_api::{AgentId, ProjectId, TenantId, UserId};
use ironclaw_reborn_config::NextcloudTalkSection;

const DEFAULT_EXTENSION_ID: &str = "nextcloud-talk";
const DEFAULT_WEBHOOK_PATH: &str = "/webhooks/nextcloud/talk";
const DEFAULT_BOT_NAME: &str = "ironclaw";

pub(crate) fn resolve_nextcloud_talk_config_for_serve(
    _nextcloud_section: Option<&NextcloudTalkSection>,
    tenant_id: &TenantId,
    default_agent_id: &AgentId,
    default_project_id: Option<&ProjectId>,
    default_user_id: &UserId,
    _config_path: &Path,
) -> anyhow::Result<Option<NextcloudTalkRouteConfig>> {
    let extension_id = DEFAULT_EXTENSION_ID.to_string();
    let webhook_path = DEFAULT_WEBHOOK_PATH.to_string();

    let bot_name = DEFAULT_BOT_NAME.to_string();
    // Outbound host is resolved from extension setup credentials
    // (`nextcloud_talk_base_url`) at runtime.
    let nextcloud_host = None;

    let route_config = NextcloudTalkRouteConfig {
        tenant_id: tenant_id.clone(),
        agent_id: default_agent_id.clone(),
        project_id: default_project_id.cloned(),
        user_id: default_user_id.clone(),
        extension_id,
        webhook_path,
        bot_name,
        nextcloud_host,
    };
    Ok(Some(route_config))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn tenant_id() -> TenantId {
        TenantId::new("nextcloud-tenant").expect("tenant id")
    }

    fn agent_id() -> AgentId {
        AgentId::new("nextcloud-agent").expect("agent id")
    }

    fn user_id() -> UserId {
        UserId::new("nextcloud-user").expect("user id")
    }

    #[test]
    fn resolve_ignores_configured_nextcloud_bot_name() {
        let nextcloud = NextcloudTalkSection {
            bot_name: Some("test".to_string()),
            ..Default::default()
        };

        let config = resolve_nextcloud_talk_config_for_serve(
            Some(&nextcloud),
            &tenant_id(),
            &agent_id(),
            None,
            &user_id(),
            Path::new("/tmp/ironclaw.toml"),
        )
        .expect("route config")
        .expect("nextcloud config");

        assert_eq!(config.bot_name, DEFAULT_BOT_NAME);
    }

    #[test]
    fn resolve_falls_back_to_default_bot_name_when_config_is_blank() {
        let nextcloud = NextcloudTalkSection {
            bot_name: Some("   ".to_string()),
            ..Default::default()
        };

        let config = resolve_nextcloud_talk_config_for_serve(
            Some(&nextcloud),
            &tenant_id(),
            &agent_id(),
            None,
            &user_id(),
            Path::new("/tmp/ironclaw.toml"),
        )
        .expect("route config")
        .expect("nextcloud config");

        assert_eq!(config.bot_name, DEFAULT_BOT_NAME);
    }
}
