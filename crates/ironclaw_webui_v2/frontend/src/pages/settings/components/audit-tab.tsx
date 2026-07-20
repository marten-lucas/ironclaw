// @ts-nocheck
import { Badge } from "../../../design-system/badge";
import { Card } from "../../../design-system/card";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useAuditSettings } from "../hooks/useAuditSettings";

const VALIDATION_WARNINGS = [
  "model_profiles.default is required",
  "agent.default_profile_id must resolve to an existing model profile",
  "policy binding must exist for active agents",
];

export function AuditTab({ searchQuery = "" }) {
  const t = useT();
  const { entries, query } = useAuditSettings();

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
                </div>
              ))}
            </div>
          )}
      </Card>
    </div>
  );
}
