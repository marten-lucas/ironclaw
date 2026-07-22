// @ts-nocheck
import React from "react";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettingsDelegations, upsertSettingsDelegation } from "../lib/settings-api";

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
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-delegations"],
    queryFn: fetchSettingsDelegations,
  });

  const delegations = useMemo(
    () => (query.data?.entries || []).map(delegationFromEntry).filter(Boolean),
    [query.data]
  );

  const mutation = useMutation({
    mutationFn: ({ taskId, payload }) => upsertSettingsDelegation(taskId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-delegations"], (old) => {
        const currentEntries = old?.entries || [];
        const entry = data?.entry;
        if (!entry?.key) return old;
        const withoutUpdated = currentEntries.filter((item) => item.key !== entry.key);
        return {
          ...(old || {}),
          entries: [...withoutUpdated, entry],
        };
      });
    },
  });

  const saveDelegation = React.useCallback(
    (taskId, payload) => mutation.mutate({ taskId, payload }),
    [mutation]
  );

  return {
    delegations,
    query,
    saveDelegation,
    isSaving: mutation.isPending,
    savingTaskId: mutation.variables?.taskId,
    error: mutation.error,
  };
}
