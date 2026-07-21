// @ts-nocheck
import React from "react";
import { Badge } from "../../../design-system/badge";
import { Card } from "../../../design-system/card";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useAuditSettings } from "../hooks/useAuditSettings";
import {
  revertSettingsChannelConfig,
  fetchSettingsAuditDiff,
  revertSettingsAgent,
  revertSettingsIdentity,
  revertSettingsMemory,
  revertSettingsModelProfile,
  revertSettingsSkill,
  revertSettingsToolPolicy,
} from "../lib/settings-api";

const VALIDATION_WARNINGS = [
  "model_profiles.default is required",
  "agent.default_profile_id must resolve to an existing model profile",
  "policy binding must exist for active agents",
];

function formatJson(value) {
  if (value === undefined) return "undefined";
  return JSON.stringify(value, null, 2);
}

export function AuditTab({ searchQuery = "" }) {
  const t = useT();
  const { entries, query } = useAuditSettings();
  const [diffState, setDiffState] = React.useState({});
  const [restoreState, setRestoreState] = React.useState({});

  const loadDiff = React.useCallback(async (auditId) => {
    setDiffState((current) => ({
      ...current,
      [auditId]: {
        ...(current[auditId] || {}),
        isOpen: true,
        isLoading: true,
        error: "",
      },
    }));
    try {
      const diff = await fetchSettingsAuditDiff(auditId);
      setDiffState((current) => ({
        ...current,
        [auditId]: {
          isOpen: true,
          isLoading: false,
          error: "",
          data: diff,
        },
      }));
      return diff;
    } catch (error) {
      setDiffState((current) => ({
        ...current,
        [auditId]: {
          ...(current[auditId] || {}),
          isOpen: true,
          isLoading: false,
          error: error?.message || t("common.unknown"),
        },
      }));
      return null;
    }
  }, [t]);

  const toggleDiff = React.useCallback((auditId) => {
    const current = diffState[auditId];
    if (!current || (!current.data && !current.isLoading)) {
      void loadDiff(auditId);
      return;
    }
    setDiffState((state) => ({
      ...state,
      [auditId]: {
        ...(state[auditId] || {}),
        isOpen: !state[auditId]?.isOpen,
      },
    }));
  }, [diffState, loadDiff]);

  const restoreFromDiff = React.useCallback(async (auditId) => {
    setRestoreState((state) => ({
      ...state,
      [auditId]: { isLoading: true, error: "", success: false },
    }));

    let diff = diffState[auditId]?.data;
    if (!diff) {
      diff = await loadDiff(auditId);
    }
    if (!diff?.restore_validation?.supported) {
      setRestoreState((state) => ({
        ...state,
        [auditId]: {
          isLoading: false,
          error: t("audit.restoreUnsupported"),
          success: false,
        },
      }));
      return;
    }

    const endpoint = String(diff.restore_validation.revert_endpoint || "");
    const segments = endpoint.split("/").filter(Boolean);
    const targetLabel = `${diff.entity_type}/${diff.entity_id}`;

    const confirmed = window.confirm(
      [
        `Restore ${targetLabel}?`,
        "",
        "This will overwrite current settings with the recorded before_snapshot.",
        `Endpoint: ${endpoint || "(not provided)"}`,
      ].join("\n")
    );

    if (!confirmed) {
      setRestoreState((state) => ({
        ...state,
        [auditId]: { isLoading: false, error: "", success: false },
      }));
      return;
    }

    try {
      if (segments[4] === "identity" && segments[6] === "revert") {
        await revertSettingsIdentity(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "memory" && segments[6] === "revert") {
        await revertSettingsMemory(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "tool-policies" && segments[6] === "revert") {
        await revertSettingsToolPolicy(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "model-profiles" && segments[6] === "revert") {
        await revertSettingsModelProfile(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "agents" && segments[6] === "revert") {
        await revertSettingsAgent(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "channel-config" && segments[6] === "revert") {
        await revertSettingsChannelConfig(decodeURIComponent(segments[5]), auditId);
      } else if (segments[4] === "skills" && segments[6] === "revert") {
        await revertSettingsSkill(decodeURIComponent(segments[5]), auditId);
      } else {
        throw new Error(t("audit.restoreUnsupported"));
      }

      setRestoreState((state) => ({
        ...state,
        [auditId]: { isLoading: false, error: "", success: true },
      }));
      void query.refetch();
      void loadDiff(auditId);
    } catch (error) {
      setRestoreState((state) => ({
        ...state,
        [auditId]: {
          isLoading: false,
          error: error?.message || t("common.unknown"),
          success: false,
        },
      }));
    }
  }, [diffState, loadDiff, query, t]);

  if (query.isLoading) {
    return (
      <div className="space-y-5">
        <Card padding="md">
          <div className="mb-3 h-3 w-36 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 animate-pulse rounded-md bg-[var(--v2-surface-muted)]" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          {t("audit.failedLoad", { message: query.error?.message || t("common.unknown") })}
        </p>
      </Card>
    );
  }

  const rows = entries.filter((entry) =>
    matchesSearch(searchQuery, [
      entry.audit_id,
      entry.actor_id,
      entry.entity_type,
      entry.entity_id,
      entry.action,
      entry.summary,
      entry.created_at,
    ])
  );

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("audit.validationTitle")}
        </h3>
        <ul className="space-y-2 text-sm text-[var(--v2-text-muted)]">
          {VALIDATION_WARNINGS.map((warning) => (
            <li key={warning} className="rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-3 py-2">
              {warning}
            </li>
          ))}
        </ul>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("audit.title", { count: rows.length })}
        </h3>

        {rows.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="text-sm text-[var(--v2-text-muted)]">{t("audit.empty")}</p>
          : (
            <div className="space-y-2">
              {rows.map((entry) => (
                <div
                  key={entry.audit_id}
                  className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium text-[var(--v2-text-strong)]">
                      {entry.entity_type} / {entry.entity_id}
                    </div>
                    <Badge tone="muted" size="sm" label={entry.action} />
                  </div>
                  <div className="mt-1 text-sm text-[var(--v2-text-muted)]">{entry.summary}</div>
                  <div className="mt-2 font-mono text-[11px] text-[var(--v2-text-faint)]">
                    {entry.actor_id} - {new Date(entry.created_at).toLocaleString()}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => toggleDiff(entry.audit_id)}
                      className="rounded-md border border-[var(--v2-panel-border)] px-2 py-1 text-xs font-medium text-[var(--v2-text-muted)] hover:text-[var(--v2-text-strong)]"
                    >
                      {diffState[entry.audit_id]?.isOpen
                        ? t("audit.hideDiff")
                        : t("audit.showDiff")}
                    </button>
                    <button
                      type="button"
                      onClick={() => restoreFromDiff(entry.audit_id)}
                      disabled={Boolean(restoreState[entry.audit_id]?.isLoading)}
                      className="rounded-md border border-[var(--v2-panel-border)] px-2 py-1 text-xs font-medium text-[var(--v2-text-muted)] hover:text-[var(--v2-text-strong)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {restoreState[entry.audit_id]?.isLoading
                        ? t("audit.restoring")
                        : t("audit.restore")}
                    </button>
                  </div>

                  {restoreState[entry.audit_id]?.error && (
                    <p className="mt-2 text-xs text-[var(--v2-danger-text)]">
                      {t("audit.restoreFailed", {
                        message: restoreState[entry.audit_id].error,
                      })}
                    </p>
                  )}
                  {restoreState[entry.audit_id]?.success && (
                    <p className="mt-2 text-xs text-[var(--v2-success-text)]">
                      {t("audit.restoreSuccess")}
                    </p>
                  )}

                  {diffState[entry.audit_id]?.isOpen && (
                    <div className="mt-3 rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface)] p-3">
                      {diffState[entry.audit_id]?.isLoading ? (
                        <p className="text-xs text-[var(--v2-text-muted)]">{t("audit.loadingDiff")}</p>
                      ) : diffState[entry.audit_id]?.error ? (
                        <p className="text-xs text-[var(--v2-danger-text)]">
                          {t("audit.diffFailed", { message: diffState[entry.audit_id].error })}
                        </p>
                      ) : (
                        <div className="space-y-2">
                          <div className="rounded border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-2 text-xs text-[var(--v2-text-muted)]">
                            <div>
                              <span className="font-semibold text-[var(--v2-text-strong)]">Restore Target:</span>{" "}
                              {diffState[entry.audit_id]?.data?.entity_type}/{diffState[entry.audit_id]?.data?.entity_id}
                            </div>
                            <div className="mt-1">
                              <span className="font-semibold text-[var(--v2-text-strong)]">Restore Endpoint:</span>{" "}
                              {diffState[entry.audit_id]?.data?.restore_validation?.revert_endpoint || "-"}
                            </div>
                            <div className="mt-1">
                              <span className="font-semibold text-[var(--v2-text-strong)]">Risk:</span>{" "}
                              Restoring applies the historical snapshot and replaces current values.
                            </div>
                          </div>

                          {(diffState[entry.audit_id]?.data?.diff || []).length === 0 ? (
                            <p className="text-xs text-[var(--v2-text-muted)]">{t("audit.diffEmpty")}</p>
                          ) : (
                            (diffState[entry.audit_id]?.data?.diff || []).map((delta) => (
                              <div
                                key={`${entry.audit_id}:${delta.path}:${delta.change}`}
                                className="rounded border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-2"
                              >
                                <div className="font-mono text-[11px] text-[var(--v2-text-strong)]">
                                  {delta.path}
                                </div>
                                <div className="text-xs text-[var(--v2-text-muted)]">{delta.change}</div>
                                <div className="mt-1 grid gap-1 sm:grid-cols-2">
                                  <pre className="overflow-x-auto rounded bg-[var(--v2-canvas)] p-2 text-[10px] text-[var(--v2-text-muted)]">
                                    {`before\n${formatJson(delta.before)}`}
                                  </pre>
                                  <pre className="overflow-x-auto rounded bg-[var(--v2-canvas)] p-2 text-[10px] text-[var(--v2-text-muted)]">
                                    {`after\n${formatJson(delta.after)}`}
                                  </pre>
                                </div>
                              </div>
                            ))
                          )}

                          {diffState[entry.audit_id]?.data?.restore_validation?.supported ? (
                            <p className="text-xs text-[var(--v2-text-muted)]">
                              {t("audit.restoreReady")}
                            </p>
                          ) : (
                            <p className="text-xs text-[var(--v2-text-muted)]">
                              {t("audit.restoreNotReady", {
                                reason:
                                  diffState[entry.audit_id]?.data?.restore_validation?.reason ||
                                  t("common.unknown"),
                              })}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </Card>
    </div>
  );
}
