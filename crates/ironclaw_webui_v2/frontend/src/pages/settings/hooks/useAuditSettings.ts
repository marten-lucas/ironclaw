// @ts-nocheck
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSettingsAudit } from "../lib/settings-api";

function auditFromEntry(entry) {
  if (!entry?.key?.startsWith("audit.")) return null;
  const audit_id = entry.key.slice("audit.".length);
  const value = entry.value || {};
  return {
    audit_id,
    actor_id: String(value.actor_id || "system"),
    entity_type: String(value.entity_type || "setting"),
    entity_id: String(value.entity_id || "unknown"),
    action: String(value.action || "update"),
    summary: String(value.summary || ""),
    created_at: String(value.created_at || new Date().toISOString()),
    before_snapshot: value.before_snapshot ?? null,
    after_snapshot: value.after_snapshot ?? null,
    has_before_snapshot: value.before_snapshot != null,
    has_after_snapshot: value.after_snapshot != null,
  };
}

export function useAuditSettings() {
  const query = useQuery({
    queryKey: ["settings-audit"],
    queryFn: fetchSettingsAudit,
  });

  const entries = useMemo(
    () => (query.data?.entries || []).map(auditFromEntry).filter(Boolean),
    [query.data]
  );

  return { entries, query };
}
