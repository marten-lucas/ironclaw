// @ts-nocheck
import React from "react";
import { Button } from "../../../design-system/button";
import { Badge } from "../../../design-system/badge";
import { Card } from "../../../design-system/card";
import { FormField, Input, Select, Textarea } from "../../../design-system/input";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useDelegationsSettings } from "../hooks/useDelegationsSettings";

function statusTone(status) {
  if (status === "running") return "positive";
  if (status === "fallback") return "warning";
  return "muted";
}

export function DelegationsTab({ searchQuery = "" }) {
  const t = useT();
  const {
    delegations,
    query,
    saveDelegation,
    isSaving,
    savingTaskId,
    error,
  } = useDelegationsSettings();
  const [createDraft, setCreateDraft] = React.useState({
    task_id: "",
    source_agent_id: "ceo",
    target_agent_id: "coder",
    requested_profile_id: "default",
    policy_context: "",
    prompt: "",
  });
  const [resolveState, setResolveState] = React.useState({});

  if (query.isLoading) {
    return (
      <Card padding="md">
        <div className="mb-4 h-3 w-28 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-3 rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3 last:mb-0">
            <div className="h-4 w-48 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            <div className="mt-3 h-3 w-40 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
          </div>
        ))}
      </Card>
    );
  }

  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          {t("delegations.failedLoad", { message: query.error?.message || t("common.unknown") })}
        </p>
      </Card>
    );
  }
  const rows = delegations.filter((item) =>
    matchesSearch(searchQuery, [
      item.task_id,
      item.source_agent_id,
      item.target_agent_id,
      item.requested_profile_id,
      item.resolved_model_profile_id,
      item.status,
    ])
  );

  const sortedRows = [...rows].sort((a, b) => a.task_id.localeCompare(b.task_id));

  function createDelegation() {
    const taskId = String(createDraft.task_id || "").trim();
    if (!taskId) return;
    saveDelegation(taskId, {
      source_agent_id: String(createDraft.source_agent_id || "").trim(),
      target_agent_id: String(createDraft.target_agent_id || "").trim(),
      requested_profile_id: String(createDraft.requested_profile_id || "default").trim() || "default",
      action: "admit",
      policy_context: String(createDraft.policy_context || "").trim() || null,
      prompt: String(createDraft.prompt || "").trim() || null,
    });
  }

  function transitionDelegation(item, action, resolution = undefined) {
    saveDelegation(item.task_id, {
      source_agent_id: item.source_agent_id,
      target_agent_id: item.target_agent_id,
      requested_profile_id: item.requested_profile_id,
      resolved_model_profile_id: item.resolved_model_profile_id,
      action,
      resolution,
    });
  }

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Delegation Authoring
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <FormField label="Task ID" htmlFor="delegation-create-id">
            <Input
              id="delegation-create-id"
              value={createDraft.task_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, task_id: event.currentTarget.value }))}
              placeholder="task-001"
            />
          </FormField>
          <FormField label="Source Agent" htmlFor="delegation-create-source">
            <Input
              id="delegation-create-source"
              value={createDraft.source_agent_id}
              onChange={(event) =>
                setCreateDraft((v) => ({ ...v, source_agent_id: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Target Agent" htmlFor="delegation-create-target">
            <Input
              id="delegation-create-target"
              value={createDraft.target_agent_id}
              onChange={(event) =>
                setCreateDraft((v) => ({ ...v, target_agent_id: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Requested Profile" htmlFor="delegation-create-profile">
            <Input
              id="delegation-create-profile"
              value={createDraft.requested_profile_id}
              onChange={(event) =>
                setCreateDraft((v) => ({ ...v, requested_profile_id: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Policy Context" className="md:col-span-2" htmlFor="delegation-create-policy">
            <Input
              id="delegation-create-policy"
              value={createDraft.policy_context}
              onChange={(event) =>
                setCreateDraft((v) => ({ ...v, policy_context: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Prompt" className="md:col-span-3" htmlFor="delegation-create-prompt">
            <Textarea
              id="delegation-create-prompt"
              rows={2}
              value={createDraft.prompt}
              onChange={(event) => setCreateDraft((v) => ({ ...v, prompt: event.currentTarget.value }))}
            />
          </FormField>
          <div className="md:col-span-3">
            <Button onClick={createDelegation} disabled={isSaving && savingTaskId === createDraft.task_id}>
              Admit Delegation
            </Button>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("delegations.title", { count: sortedRows.length })}
        </h3>

        {error && (
          <p className="mb-3 text-sm text-[var(--v2-danger-text)]">
            Delegation update failed: {error?.message || t("common.unknown")}
          </p>
        )}

        {sortedRows.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="text-sm text-[var(--v2-text-muted)]">{t("delegations.empty")}</p>
          : (
            <div className="space-y-2">
              {sortedRows.map((item) => (
                <div
                  key={item.task_id}
                  className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-medium text-[var(--v2-text-strong)]">
                        {item.source_agent_id}{" -> "}{item.target_agent_id}
                      </div>
                      <div className="font-mono text-[11px] text-[var(--v2-text-faint)]">{item.task_id}</div>
                    </div>
                    <Badge tone={statusTone(item.status)} size="sm" label={item.status} />
                  </div>

                  <div className="mt-2 grid gap-2 font-mono text-[11px] text-[var(--v2-text-faint)] md:grid-cols-2">
                    <div>{t("delegations.requestedProfile")}: {item.requested_profile_id}</div>
                    <div>{t("delegations.resolvedProfile")}: {item.resolved_model_profile_id}</div>
                  </div>

                  {item.requested_profile_id !== item.resolved_model_profile_id && (
                    <div className="mt-2 text-xs text-[var(--v2-warning-text)]">
                      {t("delegations.fallbackWarning")}
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.status === "admitted" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={isSaving && savingTaskId === item.task_id}
                        onClick={() => transitionDelegation(item, "dispatch")}
                      >
                        Dispatch
                      </Button>
                    )}

                    {item.status === "dispatched" && (
                      <>
                        <Select
                          value={resolveState[item.task_id] || "completed"}
                          onChange={(event) =>
                            setResolveState((state) => ({
                              ...state,
                              [item.task_id]: event.currentTarget.value,
                            }))}
                          className="h-8 w-[150px]"
                        >
                          <option value="completed">completed</option>
                          <option value="failed">failed</option>
                          <option value="rejected">rejected</option>
                        </Select>
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={isSaving && savingTaskId === item.task_id}
                          onClick={() =>
                            transitionDelegation(
                              item,
                              "resolve",
                              resolveState[item.task_id] || "completed"
                            )}
                        >
                          Resolve
                        </Button>
                      </>
                    )}

                    {(item.status === "admitted" || item.status === "dispatched") && (
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={isSaving && savingTaskId === item.task_id}
                        onClick={() => transitionDelegation(item, "cancel")}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </Card>
    </div>
  );
}
