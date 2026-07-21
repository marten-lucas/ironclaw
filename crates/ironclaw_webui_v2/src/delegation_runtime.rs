use crate::governed_authoring::{DelegationStatus, DelegationTask};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DelegationResolution {
    Completed,
    Failed,
    Rejected,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DelegationRuntimeAction {
    Admit,
    Dispatch,
    Resolve { resolution: Option<DelegationResolution> },
    Cancel,
}

#[derive(Debug, Clone)]
pub struct DelegationTransitionInput {
    pub task_id: String,
    pub source_agent_id: String,
    pub target_agent_id: String,
    pub requested_profile_id: String,
    pub resolved_model_profile_id: Option<String>,
    pub policy_context: Option<String>,
    pub prompt: Option<String>,
    pub action: DelegationRuntimeAction,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DelegationRuntimeErrorCode {
    InvalidActionForNewTask,
    MissingResolution,
    InvalidTransition,
    TerminalState,
    ActorMismatch,
    InvalidResolvedProfile,
}

#[derive(Debug, Clone)]
pub struct DelegationRuntimeError {
    pub code: DelegationRuntimeErrorCode,
}

impl DelegationRuntimeError {
    fn new(code: DelegationRuntimeErrorCode) -> Self {
        Self { code }
    }
}

pub fn transition_delegation_task(
    current: Option<DelegationTask>,
    input: DelegationTransitionInput,
) -> Result<DelegationTask, DelegationRuntimeError> {
    if input.requested_profile_id.trim().is_empty() {
        return Err(DelegationRuntimeError::new(
            DelegationRuntimeErrorCode::InvalidResolvedProfile,
        ));
    }

    if let Some(existing) = current {
        if !same_task_actors(&existing, &input) {
            return Err(DelegationRuntimeError::new(
                DelegationRuntimeErrorCode::ActorMismatch,
            ));
        }

        if is_terminal(&existing.status) {
            return Err(DelegationRuntimeError::new(
                DelegationRuntimeErrorCode::TerminalState,
            ));
        }

        let next_status = match input.action {
            DelegationRuntimeAction::Admit => {
                return Err(DelegationRuntimeError::new(
                    DelegationRuntimeErrorCode::InvalidTransition,
                ));
            }
            DelegationRuntimeAction::Dispatch => {
                if existing.status != DelegationStatus::Admitted {
                    return Err(DelegationRuntimeError::new(
                        DelegationRuntimeErrorCode::InvalidTransition,
                    ));
                }
                DelegationStatus::Dispatched
            }
            DelegationRuntimeAction::Resolve { resolution } => {
                if existing.status != DelegationStatus::Dispatched {
                    return Err(DelegationRuntimeError::new(
                        DelegationRuntimeErrorCode::InvalidTransition,
                    ));
                }
                match resolution {
                    Some(DelegationResolution::Completed) => DelegationStatus::Completed,
                    Some(DelegationResolution::Failed) => DelegationStatus::Failed,
                    Some(DelegationResolution::Rejected) => DelegationStatus::Rejected,
                    None => {
                        return Err(DelegationRuntimeError::new(
                            DelegationRuntimeErrorCode::MissingResolution,
                        ));
                    }
                }
            }
            DelegationRuntimeAction::Cancel => DelegationStatus::Cancelled,
        };

        let resolved_override = normalize_optional_non_blank_profile(
            input.resolved_model_profile_id,
            DelegationRuntimeErrorCode::InvalidResolvedProfile,
        )?;

        return Ok(DelegationTask {
            id: existing.id,
            source_agent_id: existing.source_agent_id,
            target_agent_id: existing.target_agent_id,
            requested_profile_id: existing.requested_profile_id,
            resolved_model_profile_id: resolved_override
                .unwrap_or(existing.resolved_model_profile_id),
            status: next_status,
            policy_context: input.policy_context.or(existing.policy_context),
            prompt: input.prompt.or(existing.prompt),
            transition_count: existing.transition_count.saturating_add(1),
        });
    }

    if !matches!(input.action, DelegationRuntimeAction::Admit) {
        return Err(DelegationRuntimeError::new(
            DelegationRuntimeErrorCode::InvalidActionForNewTask,
        ));
    }

    let resolved_model_profile_id = normalize_optional_non_blank_profile(
        input.resolved_model_profile_id,
        DelegationRuntimeErrorCode::InvalidResolvedProfile,
    )?
    .unwrap_or_else(|| input.requested_profile_id.clone());

    if resolved_model_profile_id.trim().is_empty() {
        return Err(DelegationRuntimeError::new(
            DelegationRuntimeErrorCode::InvalidResolvedProfile,
        ));
    }

    Ok(DelegationTask {
        id: input.task_id,
        source_agent_id: input.source_agent_id,
        target_agent_id: input.target_agent_id,
        requested_profile_id: input.requested_profile_id,
        resolved_model_profile_id,
        status: DelegationStatus::Admitted,
        policy_context: input.policy_context,
        prompt: input.prompt,
        transition_count: 1,
    })
}

fn normalize_optional_non_blank_profile(
    value: Option<String>,
    error_code: DelegationRuntimeErrorCode,
) -> Result<Option<String>, DelegationRuntimeError> {
    match value {
        Some(candidate) => {
            if candidate.trim().is_empty() {
                Err(DelegationRuntimeError::new(error_code))
            } else {
                Ok(Some(candidate))
            }
        }
        None => Ok(None),
    }
}

fn same_task_actors(existing: &DelegationTask, input: &DelegationTransitionInput) -> bool {
    existing.source_agent_id == input.source_agent_id
        && existing.target_agent_id == input.target_agent_id
        && existing.requested_profile_id == input.requested_profile_id
}

fn is_terminal(status: &DelegationStatus) -> bool {
    matches!(
        status,
        &DelegationStatus::Completed
            | &DelegationStatus::Failed
            | &DelegationStatus::Rejected
            | &DelegationStatus::Cancelled
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    fn input(action: DelegationRuntimeAction) -> DelegationTransitionInput {
        DelegationTransitionInput {
            task_id: "task-1".to_string(),
            source_agent_id: "ceo".to_string(),
            target_agent_id: "coder".to_string(),
            requested_profile_id: "default".to_string(),
            resolved_model_profile_id: None,
            policy_context: None,
            prompt: None,
            action,
        }
    }

    fn task(status: DelegationStatus) -> DelegationTask {
        DelegationTask {
            id: "task-1".to_string(),
            source_agent_id: "ceo".to_string(),
            target_agent_id: "coder".to_string(),
            requested_profile_id: "default".to_string(),
            resolved_model_profile_id: "default".to_string(),
            status,
            policy_context: None,
            prompt: None,
            transition_count: 1,
        }
    }

    #[test]
    fn admit_creates_new_task() {
        let record = transition_delegation_task(None, input(DelegationRuntimeAction::Admit))
            .expect("admit should create");
        assert_eq!(record.status, DelegationStatus::Admitted);
        assert_eq!(record.transition_count, 1);
    }

    #[test]
    fn non_admit_rejected_for_new_task() {
        let err = transition_delegation_task(None, input(DelegationRuntimeAction::Dispatch))
            .expect_err("non-admit should fail");
        assert_eq!(err.code, DelegationRuntimeErrorCode::InvalidActionForNewTask);
    }

    #[test]
    fn resolve_requires_resolution() {
        let err = transition_delegation_task(
            Some(task(DelegationStatus::Dispatched)),
            input(DelegationRuntimeAction::Resolve { resolution: None }),
        )
        .expect_err("resolve needs resolution");
        assert_eq!(err.code, DelegationRuntimeErrorCode::MissingResolution);
    }

    #[test]
    fn terminal_task_rejects_transition() {
        let err = transition_delegation_task(
            Some(task(DelegationStatus::Completed)),
            input(DelegationRuntimeAction::Cancel),
        )
        .expect_err("terminal states reject transitions");
        assert_eq!(err.code, DelegationRuntimeErrorCode::TerminalState);
    }

    #[test]
    fn actor_mismatch_rejected() {
        let mut bad = input(DelegationRuntimeAction::Dispatch);
        bad.source_agent_id = "ops".to_string();
        let err = transition_delegation_task(Some(task(DelegationStatus::Admitted)), bad)
            .expect_err("mismatched actors reject transition");
        assert_eq!(err.code, DelegationRuntimeErrorCode::ActorMismatch);
    }

    #[test]
    fn blank_requested_profile_is_rejected() {
        let mut bad = input(DelegationRuntimeAction::Admit);
        bad.requested_profile_id = "   ".to_string();
        let err = transition_delegation_task(None, bad)
            .expect_err("blank requested profile must fail closed");
        assert_eq!(err.code, DelegationRuntimeErrorCode::InvalidResolvedProfile);
    }

    #[test]
    fn blank_resolved_profile_override_is_rejected_for_existing_task() {
        let mut bad = input(DelegationRuntimeAction::Dispatch);
        bad.resolved_model_profile_id = Some("   ".to_string());
        let err = transition_delegation_task(Some(task(DelegationStatus::Admitted)), bad)
            .expect_err("blank resolved profile override must fail closed");
        assert_eq!(err.code, DelegationRuntimeErrorCode::InvalidResolvedProfile);
    }
}
