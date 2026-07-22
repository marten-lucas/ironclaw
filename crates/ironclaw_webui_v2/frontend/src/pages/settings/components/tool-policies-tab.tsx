// @ts-nocheck
import React from "react";
import { Button } from "../../../design-system/button";
import { Card } from "../../../design-system/card";
import { FormField, Input, Select } from "../../../design-system/input";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useToolPoliciesSettings } from "../hooks/useToolPoliciesSettings";

function parseRules(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseVersion(value) {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function ToolPoliciesTab({ searchQuery = "" }) {
  const t = useT();
  const {
    policies,
    query,
    savePolicy,
    isSaving,
    savingPolicyId,
    restorePolicy,
    isRestoring,
    restoringPolicyId,
    restoreError,
    restoredPolicyId,
    restoredAuditId,
  } = useToolPoliciesSettings();
  const [drafts, setDrafts] = React.useState({});
  const [createDraft, setCreateDraft] = React.useState({
    policy_id: "",
    scope: "global",
    allow_rules: "",
    deny_rules: "",
    escalation_rules: "",
    version: "",
  });

  React.useEffect(() => {
    const next = {};
    for (const item of policies) {
      next[item.policy_id] = {
        ...item,
        allow_rules: (item.allow_rules || []).join(", "),
        deny_rules: (item.deny_rules || []).join(", "),
        escalation_rules: (item.escalation_rules || []).join(", "),
        version: item.version ?? "",
      };
    }
    setDrafts(next);
  }, [policies]);

  if (query.isLoading) {
    return <Card padding="md"><p className="text-sm text-[var(--v2-text-muted)]">{t("common.loading")}</p></Card>;
  }
  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          Tool policy settings failed to load: {query.error?.message || t("common.unknown")}
        </p>
      </Card>
    );
  }

  const rows = policies.filter((item) =>
    matchesSearch(searchQuery, [
      item.policy_id,
      item.scope,
      item.allow_rules,
      item.deny_rules,
      item.escalation_rules,
      item.version,
    ])
  );

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Tool Policy Authoring
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <FormField label="Policy ID" htmlFor="policy-create-id">
            <Input
              id="policy-create-id"
              value={createDraft.policy_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, policy_id: event.currentTarget.value }))}
              placeholder="global-safe"
            />
          </FormField>
          <FormField label="Scope" htmlFor="policy-create-scope">
            <Select
              id="policy-create-scope"
              value={createDraft.scope}
              onChange={(event) => setCreateDraft((v) => ({ ...v, scope: event.currentTarget.value }))}
            >
              <option value="global">global</option>
              <option value="channel">channel</option>
              <option value="agent">agent</option>
              <option value="profile">profile</option>
            </Select>
          </FormField>
          <FormField label="Version">
            <Input
              value={createDraft.version}
              onChange={(event) => setCreateDraft((v) => ({ ...v, version: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Allow Rules (comma-separated)">
            <Input
              value={createDraft.allow_rules}
              onChange={(event) => setCreateDraft((v) => ({ ...v, allow_rules: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Deny Rules (comma-separated)">
            <Input
              value={createDraft.deny_rules}
              onChange={(event) => setCreateDraft((v) => ({ ...v, deny_rules: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Escalation Rules (comma-separated)">
            <Input
              value={createDraft.escalation_rules}
              onChange={(event) => setCreateDraft((v) => ({ ...v, escalation_rules: event.currentTarget.value }))}
            />
          </FormField>
          <div className="md:col-span-3">
            <Button
              onClick={() => {
                const id = String(createDraft.policy_id || "").trim();
                if (!id) return;
                savePolicy(id, {
                  scope: createDraft.scope,
                  allow_rules: parseRules(createDraft.allow_rules),
                  deny_rules: parseRules(createDraft.deny_rules),
                  escalation_rules: parseRules(createDraft.escalation_rules),
                  version: parseVersion(createDraft.version),
                });
              }}
            >
              Create Tool Policy
            </Button>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Tool Policies ({rows.length})
        </h3>
        {rows.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="text-sm text-[var(--v2-text-muted)]">No tool policies configured.</p>
          : (
            <div className="space-y-3">
              {rows.map((item) => {
                const draft = drafts[item.policy_id] || item;
                return (
                  <div key={item.policy_id} className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3">
                    <div className="mb-2 text-sm font-semibold text-[var(--v2-text-strong)]">{item.policy_id}</div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <FormField label="Scope">
                        <Select
                          value={draft.scope}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.policy_id]: { ...draft, scope: event.currentTarget.value } }))}
                        >
                          <option value="global">global</option>
                          <option value="channel">channel</option>
                          <option value="agent">agent</option>
                          <option value="profile">profile</option>
                        </Select>
                      </FormField>
                      <FormField label="Version">
                        <Input
                          value={String(draft.version ?? "")}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.policy_id]: { ...draft, version: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <div />
                      <FormField label="Allow Rules (comma-separated)">
                        <Input
                          value={draft.allow_rules}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.policy_id]: { ...draft, allow_rules: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Deny Rules (comma-separated)">
                        <Input
                          value={draft.deny_rules}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.policy_id]: { ...draft, deny_rules: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Escalation Rules (comma-separated)">
                        <Input
                          value={draft.escalation_rules}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.policy_id]: { ...draft, escalation_rules: event.currentTarget.value } }))}
                        />
                      </FormField>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        disabled={isSaving && savingPolicyId === item.policy_id}
                        onClick={() => {
                          const current = drafts[item.policy_id] || item;
                          savePolicy(item.policy_id, {
                            scope: current.scope,
                            allow_rules: parseRules(current.allow_rules),
                            deny_rules: parseRules(current.deny_rules),
                            escalation_rules: parseRules(current.escalation_rules),
                            version: parseVersion(current.version),
                          });
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={isRestoring && restoringPolicyId === item.policy_id}
                        onClick={() => restorePolicy(item.policy_id)}
                      >
                        {isRestoring && restoringPolicyId === item.policy_id
                          ? "Reverting..."
                          : "Revert Last Change"}
                      </Button>
                    </div>
                    {restoredPolicyId === item.policy_id && restoredAuditId && (
                      <p className="mt-2 text-xs text-[var(--v2-success-text)]">
                        Restored from audit {restoredAuditId}.
                      </p>
                    )}
                    {restoringPolicyId === item.policy_id && restoreError && (
                      <p className="mt-2 text-xs text-[var(--v2-danger-text)]">
                        Restore failed: {restoreError?.message || t("common.unknown")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </Card>
    </div>
  );
}
