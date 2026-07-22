// @ts-nocheck
import React from "react";
import { Button } from "../../../design-system/button";
import { Card } from "../../../design-system/card";
import { FormField, Input, Select, Textarea } from "../../../design-system/input";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useIdentitySettings } from "../hooks/useIdentitySettings";

function parseList(value) {
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

export function IdentityTab({ searchQuery = "" }) {
  const t = useT();
  const {
    identities,
    query,
    saveIdentity,
    isSaving,
    savingIdentityId,
    restoreIdentity,
    isRestoring,
    restoringIdentityId,
    restoreError,
    restoredIdentityId,
    restoredAuditId,
  } = useIdentitySettings();
  const [drafts, setDrafts] = React.useState({});
  const [createDraft, setCreateDraft] = React.useState({
    identity_id: "",
    subject_type: "system",
    subject_id: "default",
    tone: "",
    role_description: "",
    organization_context: "",
    constraints: "",
    version: "",
  });

  React.useEffect(() => {
    const next = {};
    for (const item of identities) {
      next[item.identity_id] = {
        ...item,
        constraints: (item.constraints || []).join(", "),
        version: item.version ?? "",
      };
    }
    setDrafts(next);
  }, [identities]);

  if (query.isLoading) {
    return <Card padding="md"><p className="text-sm text-[var(--v2-text-muted)]">{t("common.loading")}</p></Card>;
  }
  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          Identity settings failed to load: {query.error?.message || t("common.unknown")}
        </p>
      </Card>
    );
  }

  const rows = identities.filter((item) =>
    matchesSearch(searchQuery, [
      item.identity_id,
      item.subject_type,
      item.subject_id,
      item.tone,
      item.role_description,
      item.organization_context,
      item.constraints,
      item.version,
    ])
  );

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Identity Authoring
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <FormField label="Identity ID" htmlFor="identity-create-id">
            <Input
              id="identity-create-id"
              value={createDraft.identity_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, identity_id: event.currentTarget.value }))}
              placeholder="system"
            />
          </FormField>
          <FormField label="Subject Type" htmlFor="identity-create-subject-type">
            <Select
              id="identity-create-subject-type"
              value={createDraft.subject_type}
              onChange={(event) => setCreateDraft((v) => ({ ...v, subject_type: event.currentTarget.value }))}
            >
              <option value="system">system</option>
              <option value="agent">agent</option>
              <option value="user">user</option>
              <option value="channel">channel</option>
            </Select>
          </FormField>
          <FormField label="Subject ID" htmlFor="identity-create-subject-id">
            <Input
              id="identity-create-subject-id"
              value={createDraft.subject_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, subject_id: event.currentTarget.value }))}
              placeholder="default"
            />
          </FormField>
          <div className="md:col-span-3">
            <Button
              onClick={() => {
                const id = String(createDraft.identity_id || "").trim();
                if (!id) return;
                saveIdentity(id, {
                  subject_type: createDraft.subject_type,
                  subject_id: String(createDraft.subject_id || "").trim(),
                  tone: String(createDraft.tone || "").trim() || null,
                  role_description: String(createDraft.role_description || "").trim() || null,
                  organization_context: String(createDraft.organization_context || "").trim() || null,
                  constraints: parseList(createDraft.constraints),
                  version: parseVersion(createDraft.version),
                });
              }}
            >
              Create Identity
            </Button>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Identity Records ({rows.length})
        </h3>
        {rows.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="text-sm text-[var(--v2-text-muted)]">No identity records configured.</p>
          : (
            <div className="space-y-3">
              {rows.map((item) => {
                const draft = drafts[item.identity_id] || item;
                return (
                  <div key={item.identity_id} className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3">
                    <div className="mb-2 text-sm font-semibold text-[var(--v2-text-strong)]">{item.identity_id}</div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <FormField label="Subject Type">
                        <Select
                          value={draft.subject_type}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, subject_type: event.currentTarget.value } }))}
                        >
                          <option value="system">system</option>
                          <option value="agent">agent</option>
                          <option value="user">user</option>
                          <option value="channel">channel</option>
                        </Select>
                      </FormField>
                      <FormField label="Subject ID">
                        <Input
                          value={draft.subject_id}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, subject_id: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Tone">
                        <Input
                          value={draft.tone}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, tone: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Role Description" className="md:col-span-2">
                        <Textarea
                          rows={3}
                          value={draft.role_description}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, role_description: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Version">
                        <Input
                          value={String(draft.version ?? "")}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, version: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Organization Context" className="md:col-span-2">
                        <Textarea
                          rows={2}
                          value={draft.organization_context}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, organization_context: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Constraints (comma-separated)">
                        <Input
                          value={draft.constraints}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.identity_id]: { ...draft, constraints: event.currentTarget.value } }))}
                        />
                      </FormField>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        disabled={isSaving && savingIdentityId === item.identity_id}
                        onClick={() => {
                          const current = drafts[item.identity_id] || item;
                          saveIdentity(item.identity_id, {
                            subject_type: current.subject_type,
                            subject_id: String(current.subject_id || "").trim(),
                            tone: String(current.tone || "").trim() || null,
                            role_description: String(current.role_description || "").trim() || null,
                            organization_context: String(current.organization_context || "").trim() || null,
                            constraints: parseList(current.constraints),
                            version: parseVersion(current.version),
                          });
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={isRestoring && restoringIdentityId === item.identity_id}
                        onClick={() => restoreIdentity(item.identity_id)}
                      >
                        {isRestoring && restoringIdentityId === item.identity_id
                          ? "Reverting..."
                          : "Revert Last Change"}
                      </Button>
                    </div>
                    {restoredIdentityId === item.identity_id && restoredAuditId && (
                      <p className="mt-2 text-xs text-[var(--v2-success-text)]">
                        Restored from audit {restoredAuditId}.
                      </p>
                    )}
                    {restoringIdentityId === item.identity_id && restoreError && (
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
