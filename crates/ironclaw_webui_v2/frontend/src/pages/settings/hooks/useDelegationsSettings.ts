// @ts-nocheck
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSettingsDelegations } from "../lib/settings-api";

function delegationFromEntry(entry) {
  if (!entry?.key?.startsWith("delegation.")) return null;
  const task_id = entry.key.slice("delegation.".length);
  const value = entry.value || {};
  return {
    task_id,
    source_agent_id: String(value.source_agent_id || "-"),
    target_agent_id: String(value.target_agent_id || "-"),
    requested_profile_id: String(value.requested_profile_id || "default"),
    resolved_model_profile_id: String(value.resolved_model_profile_id || "default"),
    status: String(value.status || "queued"),
  };
}

export function useDelegationsSettings() {
  const query = useQuery({
    queryKey: ["settings-delegations"],
    queryFn: fetchSettingsDelegations,
  });

  const delegations = useMemo(
    () => (query.data?.entries || []).map(delegationFromEntry).filter(Boolean),
    [query.data]
  );

  return { delegations, query };
}
