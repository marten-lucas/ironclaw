use std::env;
use std::path::Path;

use anyhow::anyhow;
use ironclaw_reborn_composition::host_api::{AgentId, ProjectId, TenantId, UserId};
use ironclaw_reborn_composition::NextcloudTalkRouteConfig;
use secrecy::SecretString;

const DEFAULT_NEXTCLOUD_SECRET_ENV_VAR: &str = "IRONCLAW_REBORN_NEXTCLOUD_TALK_BOT_SECRET";
const DEFAULT_EXTENSION_ID: &str = "nextcloud-talk";
const DEFAULT_WEBHOOK_PATH: &str = "/webhooks/nextcloud/talk";
const DEFAULT_BOT_NAME: &str = "ironclaw";

pub(crate) fn resolve_nextcloud_talk_config_for_serve(
    section: Option<&ironclaw_reborn_config::NextcloudTalkSection>,
    tenant_id: &TenantId,
    default_agent_id: &AgentId,
    default_project_id: Option<&ProjectId>,
    default_user_id: &UserId,
    config_path: &Path,
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

    let secret = env::var(DEFAULT_NEXTCLOUD_SECRET_ENV_VAR).map_err(|_| {
        anyhow!(
            "{DEFAULT_NEXTCLOUD_SECRET_ENV_VAR} must be set to the Nextcloud Talk bot secret when [nextcloud_talk].enabled = true in {}.",
            config_path.display()
        )
    })?;
    if secret.trim().is_empty() {
        anyhow::bail!(
            "{DEFAULT_NEXTCLOUD_SECRET_ENV_VAR} must not be empty when [nextcloud_talk].enabled = true"
        );
    }

    let route_config = NextcloudTalkRouteConfig {
        tenant_id: tenant_id.clone(),
        agent_id: default_agent_id.clone(),
        project_id: default_project_id.cloned(),
        user_id: default_user_id.clone(),
        extension_id,
        webhook_path,
        bot_name,
        mention_regex,
        shared_secret: SecretString::from(secret),
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
