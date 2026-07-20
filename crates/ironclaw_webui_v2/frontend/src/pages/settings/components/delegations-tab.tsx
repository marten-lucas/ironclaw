// @ts-nocheck
import { Badge } from "../../../design-system/badge";
import { Card } from "../../../design-system/card";
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
  const { delegations, query } = useDelegationsSettings();

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

  return (
    <Card padding="md">
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
        {t("delegations.title", { count: rows.length })}
      </h3>

      {rows.length === 0
        ? searchQuery
          ? <SettingsSearchEmpty query={searchQuery} />
          : <p className="text-sm text-[var(--v2-text-muted)]">{t("delegations.empty")}</p>
        : (
          <div className="space-y-2">
            {rows.map((item) => (
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
              </div>
            ))}
          </div>
        )}
    </Card>
  );
}
