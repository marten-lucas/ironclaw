// @ts-nocheck
import React from "react";
import { Button } from "../../../design-system/button";
import { Card } from "../../../design-system/card";
import { FormField, Input, Select, Textarea } from "../../../design-system/input";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useMemorySettings } from "../hooks/useMemorySettings";

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

export function MemoryTab({ searchQuery = "" }) {
  const t = useT();
  const {
    memories,
    query,
    saveMemory,
    isSaving,
    savingMemoryId,
    restoreMemory,
    isRestoring,
    restoringMemoryId,
    restoreError,
    restoredMemoryId,
    restoredAuditId,
  } = useMemorySettings();
  const [drafts, setDrafts] = React.useState({});
  const [createDraft, setCreateDraft] = React.useState({
    memory_id: "",
    scope: "global",
    owner_id: "",
    title: "",
    content: "",
    tags: "",
    visibility: "",
    version: "",
  });

  React.useEffect(() => {
    const next = {};
    for (const item of memories) {
      next[item.memory_id] = {
        ...item,
        tags: (item.tags || []).join(", "),
        version: item.version ?? "",
      };
    }
    setDrafts(next);
  }, [memories]);

  if (query.isLoading) {
    return <Card padding="md"><p className="text-sm text-[var(--v2-text-muted)]">{t("common.loading")}</p></Card>;
  }
  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          Memory settings failed to load: {query.error?.message || t("common.unknown")}
        </p>
      </Card>
    );
  }

  const rows = memories.filter((item) =>
    matchesSearch(searchQuery, [
      item.memory_id,
      item.scope,
      item.owner_id,
      item.title,
      item.content,
      item.tags,
      item.visibility,
      item.version,
    ])
  );

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Memory Authoring
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <FormField label="Memory ID" htmlFor="memory-create-id">
            <Input
              id="memory-create-id"
              value={createDraft.memory_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, memory_id: event.currentTarget.value }))}
              placeholder="global-rules"
            />
          </FormField>
          <FormField label="Scope" htmlFor="memory-create-scope">
            <Select
              id="memory-create-scope"
              value={createDraft.scope}
              onChange={(event) => setCreateDraft((v) => ({ ...v, scope: event.currentTarget.value }))}
            >
              <option value="identity">identity</option>
              <option value="project">project</option>
              <option value="agent">agent</option>
              <option value="global">global</option>
            </Select>
          </FormField>
          <FormField label="Owner ID" htmlFor="memory-create-owner">
            <Input
              id="memory-create-owner"
              value={createDraft.owner_id}
              onChange={(event) => setCreateDraft((v) => ({ ...v, owner_id: event.currentTarget.value }))}
              placeholder="optional"
            />
          </FormField>
          <FormField label="Title" className="md:col-span-3" htmlFor="memory-create-title">
            <Input
              id="memory-create-title"
              value={createDraft.title}
              onChange={(event) => setCreateDraft((v) => ({ ...v, title: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Content" className="md:col-span-3" htmlFor="memory-create-content">
            <Textarea
              id="memory-create-content"
              rows={3}
              value={createDraft.content}
              onChange={(event) => setCreateDraft((v) => ({ ...v, content: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Tags (comma-separated)">
            <Input
              value={createDraft.tags}
              onChange={(event) => setCreateDraft((v) => ({ ...v, tags: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Visibility">
            <Input
              value={createDraft.visibility}
              onChange={(event) => setCreateDraft((v) => ({ ...v, visibility: event.currentTarget.value }))}
            />
          </FormField>
          <FormField label="Version">
            <Input
              value={createDraft.version}
              onChange={(event) => setCreateDraft((v) => ({ ...v, version: event.currentTarget.value }))}
            />
          </FormField>
          <div className="md:col-span-3">
            <Button
              onClick={() => {
                const id = String(createDraft.memory_id || "").trim();
                if (!id) return;
                saveMemory(id, {
                  scope: createDraft.scope,
                  owner_id: String(createDraft.owner_id || "").trim() || null,
                  title: String(createDraft.title || "").trim(),
                  content: String(createDraft.content || "").trim(),
                  tags: parseList(createDraft.tags),
                  visibility: String(createDraft.visibility || "").trim() || null,
                  version: parseVersion(createDraft.version),
                });
              }}
            >
              Create Memory Item
            </Button>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          Memory Records ({rows.length})
        </h3>
        {rows.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="text-sm text-[var(--v2-text-muted)]">No memory records configured.</p>
          : (
            <div className="space-y-3">
              {rows.map((item) => {
                const draft = drafts[item.memory_id] || item;
                return (
                  <div key={item.memory_id} className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3">
                    <div className="mb-2 text-sm font-semibold text-[var(--v2-text-strong)]">{item.memory_id}</div>
                    <div className="grid gap-3 md:grid-cols-3">
                      <FormField label="Scope">
                        <Select
                          value={draft.scope}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, scope: event.currentTarget.value } }))}
                        >
                          <option value="identity">identity</option>
                          <option value="project">project</option>
                          <option value="agent">agent</option>
                          <option value="global">global</option>
                        </Select>
                      </FormField>
                      <FormField label="Owner ID">
                        <Input
                          value={draft.owner_id}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, owner_id: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Version">
                        <Input
                          value={String(draft.version ?? "")}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, version: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Title" className="md:col-span-3">
                        <Input
                          value={draft.title}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, title: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Content" className="md:col-span-3">
                        <Textarea
                          rows={3}
                          value={draft.content}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, content: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Tags (comma-separated)">
                        <Input
                          value={draft.tags}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, tags: event.currentTarget.value } }))}
                        />
                      </FormField>
                      <FormField label="Visibility">
                        <Input
                          value={draft.visibility}
                          onChange={(event) => setDrafts((v) => ({ ...v, [item.memory_id]: { ...draft, visibility: event.currentTarget.value } }))}
                        />
                      </FormField>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        disabled={isSaving && savingMemoryId === item.memory_id}
                        onClick={() => {
                          const current = drafts[item.memory_id] || item;
                          saveMemory(item.memory_id, {
                            scope: current.scope,
                            owner_id: String(current.owner_id || "").trim() || null,
                            title: String(current.title || "").trim(),
                            content: String(current.content || "").trim(),
                            tags: parseList(current.tags),
                            visibility: String(current.visibility || "").trim() || null,
                            version: parseVersion(current.version),
                          });
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        disabled={isRestoring && restoringMemoryId === item.memory_id}
                        onClick={() => restoreMemory(item.memory_id)}
                      >
                        {isRestoring && restoringMemoryId === item.memory_id
                          ? "Reverting..."
                          : "Revert Last Change"}
                      </Button>
                    </div>
                    {restoredMemoryId === item.memory_id && restoredAuditId && (
                      <p className="mt-2 text-xs text-[var(--v2-success-text)]">
                        Restored from audit {restoredAuditId}.
                      </p>
                    )}
                    {restoringMemoryId === item.memory_id && restoreError && (
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
