use std::path::Path;

use ironclaw_reborn_composition::host_api::{AgentId, ProjectId, TenantId, UserId};
use ironclaw_reborn_composition::NextcloudTalkRouteConfig;

const DEFAULT_EXTENSION_ID: &str = "nextcloud-talk";
const DEFAULT_WEBHOOK_PATH: &str = "/webhooks/nextcloud/talk";
const DEFAULT_BOT_NAME: &str = "ironclaw";

pub(crate) fn resolve_nextcloud_talk_config_for_serve(
    section: Option<&ironclaw_reborn_config::NextcloudTalkSection>,
    tenant_id: &TenantId,
    default_agent_id: &AgentId,
    default_project_id: Option<&ProjectId>,
    default_user_id: &UserId,
    _config_path: &Path,
) -> anyhow::Result<Option<NextcloudTalkRouteConfig>> {
    let Some(section) = section else {
        return Ok(None);
    };
    if section.enabled != Some(true) {
        return Ok(None);
    }

    let extension_id = optional_value(section.extension_id.as_ref())
        .unwrap_or_else(|| DEFAULT_EXTENSION_ID.to_string());
    let webhook_path = optional_value(section.webhook_path.as_ref())
        .unwrap_or_else(|| DEFAULT_WEBHOOK_PATH.to_string());
    if !webhook_path.starts_with('/') {
        anyhow::bail!(
            "[nextcloud_talk].webhook_path must be an absolute route path (start with '/')"
        );
    }

    let bot_name = optional_value(section.bot_name.as_ref())
        .unwrap_or_else(|| DEFAULT_BOT_NAME.to_string());
    let mention_regex = optional_value(section.mention_regex.as_ref());

    let route_config = NextcloudTalkRouteConfig {
        tenant_id: tenant_id.clone(),
        agent_id: default_agent_id.clone(),
        project_id: default_project_id.cloned(),
        user_id: default_user_id.clone(),
        extension_id,
        webhook_path,
        bot_name,
        mention_regex,
    };
    Ok(Some(route_config))
}

fn optional_value(value: Option<&String>) -> Option<String> {
    let Some(value) = value else {
        return None;
    };
    if value.trim().is_empty() {
        return None;
    }
    Some(value.trim().to_string())
}
