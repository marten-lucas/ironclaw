use std::path::Path;

use ironclaw_reborn_composition::host_api::{AgentId, ProjectId, TenantId, UserId};
use ironclaw_reborn_composition::NextcloudTalkRouteConfig;
use ironclaw_reborn_config::NextcloudTalkSection;

const DEFAULT_EXTENSION_ID: &str = "nextcloud-talk";
const DEFAULT_WEBHOOK_PATH: &str = "/webhooks/nextcloud/talk";
const DEFAULT_BOT_NAME: &str = "ironclaw";

pub(crate) fn resolve_nextcloud_talk_config_for_serve(
    nextcloud_section: Option<&NextcloudTalkSection>,
    tenant_id: &TenantId,
    default_agent_id: &AgentId,
    default_project_id: Option<&ProjectId>,
    default_user_id: &UserId,
    _config_path: &Path,
) -> anyhow::Result<Option<NextcloudTalkRouteConfig>> {
    let extension_id = DEFAULT_EXTENSION_ID.to_string();
    let webhook_path = DEFAULT_WEBHOOK_PATH.to_string();

    let bot_name = DEFAULT_BOT_NAME.to_string();
    let nextcloud_host = nextcloud_section
        .and_then(|section| section.base_url.clone())
        .filter(|value| !value.trim().is_empty());

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
