use serde::{Deserialize, Serialize};

pub const SETTINGS_IDENTITY_CONFIG_PREFIX: &str = "identity.";
pub const SETTINGS_MEMORY_CONFIG_PREFIX: &str = "memory.";
pub const SETTINGS_TOOL_POLICY_CONFIG_PREFIX: &str = "tool_policy.";
pub const SETTINGS_AGENT_CONFIG_PREFIX: &str = "agent.roster.";
pub const SETTINGS_DELEGATION_CONFIG_PREFIX: &str = "delegation.";
pub const SETTINGS_AUDIT_CONFIG_PREFIX: &str = "audit.";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GovernedAuthoringKind {
    Identity,
    Memory,
    ToolPolicy,
    Agent,
    Delegation,
    Audit,
}

impl GovernedAuthoringKind {
    pub fn prefix(self) -> &'static str {
        match self {
            Self::Identity => SETTINGS_IDENTITY_CONFIG_PREFIX,
            Self::Memory => SETTINGS_MEMORY_CONFIG_PREFIX,
            Self::ToolPolicy => SETTINGS_TOOL_POLICY_CONFIG_PREFIX,
            Self::Agent => SETTINGS_AGENT_CONFIG_PREFIX,
            Self::Delegation => SETTINGS_DELEGATION_CONFIG_PREFIX,
            Self::Audit => SETTINGS_AUDIT_CONFIG_PREFIX,
        }
    }
}

pub fn config_key(kind: GovernedAuthoringKind, id: &str) -> String {
    format!("{}{id}", kind.prefix())
}

pub fn parse_config_key(kind: GovernedAuthoringKind, key: &str) -> Option<String> {
    key.strip_prefix(kind.prefix())
        .filter(|id| !id.is_empty())
        .map(ToString::to_string)
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum IdentitySubjectType {
    System,
    Agent,
    User,
    Channel,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct IdentityDocument {
    pub id: String,
    pub subject_type: IdentitySubjectType,
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

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MemoryScope {
    Identity,
    Project,
    Agent,
    Global,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct MemoryItem {
    pub id: String,
    pub scope: MemoryScope,
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

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ToolPolicyScope {
    Global,
    Channel,
    Agent,
    Profile,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ToolPolicy {
    pub id: String,
    pub scope: ToolPolicyScope,
    #[serde(default)]
    pub allow_rules: Vec<String>,
    #[serde(default)]
    pub deny_rules: Vec<String>,
    #[serde(default)]
    pub escalation_rules: Vec<String>,
    #[serde(default)]
    pub version: Option<u64>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct AgentRosterEntry {
    pub id: String,
    pub display_name: String,
    pub role: String,
    pub default_profile_id: String,
    pub policy_binding_id: String,
    pub status: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DelegationStatus {
    Admitted,
    Dispatched,
    Completed,
    Failed,
    Rejected,
    Cancelled,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct DelegationTask {
    pub id: String,
    pub source_agent_id: String,
    pub target_agent_id: String,
    pub requested_profile_id: String,
    pub resolved_model_profile_id: String,
    pub status: DelegationStatus,
    #[serde(default)]
    pub policy_context: Option<String>,
    #[serde(default)]
    pub prompt: Option<String>,
    pub transition_count: u32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AuditEntry {
    pub id: String,
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn key_roundtrip_for_all_governed_kinds() {
        let cases = [
            (GovernedAuthoringKind::Identity, "system"),
            (GovernedAuthoringKind::Memory, "global-rules"),
            (GovernedAuthoringKind::ToolPolicy, "global-safe"),
            (GovernedAuthoringKind::Agent, "ceo"),
            (GovernedAuthoringKind::Delegation, "task-1"),
            (GovernedAuthoringKind::Audit, "entry-1"),
        ];

        for (kind, id) in cases {
            let key = config_key(kind, id);
            assert_eq!(parse_config_key(kind, &key).as_deref(), Some(id));
        }
    }

    #[test]
    fn parse_config_key_rejects_wrong_or_empty_suffix() {
        assert_eq!(
            parse_config_key(GovernedAuthoringKind::Identity, "identity."),
            None
        );
        assert_eq!(
            parse_config_key(GovernedAuthoringKind::Identity, "memory.global"),
            None
        );
    }

    #[test]
    fn domain_record_serde_roundtrip_preserves_shape() {
        let identity = IdentityDocument {
            id: "system".to_string(),
            subject_type: IdentitySubjectType::System,
            subject_id: "default".to_string(),
            tone: Some("operator".to_string()),
            role_description: None,
            organization_context: None,
            constraints: vec![],
            version: Some(1),
        };

        let memory = MemoryItem {
            id: "global-rules".to_string(),
            scope: MemoryScope::Global,
            owner_id: None,
            title: "rules".to_string(),
            content: "be strict".to_string(),
            tags: vec!["ops".to_string()],
            visibility: None,
            version: Some(2),
        };

        let policy = ToolPolicy {
            id: "global-safe".to_string(),
            scope: ToolPolicyScope::Global,
            allow_rules: vec!["read".to_string()],
            deny_rules: vec!["dangerous".to_string()],
            escalation_rules: vec!["write.system".to_string()],
            version: Some(3),
        };

        let delegation = DelegationTask {
            id: "task-1".to_string(),
            source_agent_id: "ceo".to_string(),
            target_agent_id: "coder".to_string(),
            requested_profile_id: "default".to_string(),
            resolved_model_profile_id: "default".to_string(),
            status: DelegationStatus::Admitted,
            policy_context: None,
            prompt: None,
            transition_count: 1,
        };

        let agent = AgentRosterEntry {
            id: "ceo".to_string(),
            display_name: "CEO".to_string(),
            role: "orchestrator".to_string(),
            default_profile_id: "default".to_string(),
            policy_binding_id: "policy/global-safe".to_string(),
            status: "active".to_string(),
        };

        let audit = AuditEntry {
            id: "entry-1".to_string(),
            actor_id: "user".to_string(),
            entity_type: "policy".to_string(),
            entity_id: "policy/global-safe".to_string(),
            action: "update".to_string(),
            before_snapshot: None,
            after_snapshot: None,
            summary: Some("changed rule".to_string()),
            created_at: None,
        };

        let identity_json = serde_json::to_value(&identity).expect("serialize identity");
        let memory_json = serde_json::to_value(&memory).expect("serialize memory");
        let policy_json = serde_json::to_value(&policy).expect("serialize policy");
        let agent_json = serde_json::to_value(&agent).expect("serialize agent");
        let delegation_json = serde_json::to_value(&delegation).expect("serialize delegation");
        let audit_json = serde_json::to_value(&audit).expect("serialize audit");

        assert_eq!(
            serde_json::from_value::<IdentityDocument>(identity_json).expect("identity roundtrip"),
            identity
        );
        assert_eq!(
            serde_json::from_value::<MemoryItem>(memory_json).expect("memory roundtrip"),
            memory
        );
        assert_eq!(
            serde_json::from_value::<ToolPolicy>(policy_json).expect("policy roundtrip"),
            policy
        );
        assert_eq!(
            serde_json::from_value::<AgentRosterEntry>(agent_json).expect("agent roundtrip"),
            agent
        );
        assert_eq!(
            serde_json::from_value::<DelegationTask>(delegation_json).expect("delegation roundtrip"),
            delegation
        );
        assert_eq!(
            serde_json::from_value::<AuditEntry>(audit_json).expect("audit roundtrip"),
            audit
        );
    }
}
