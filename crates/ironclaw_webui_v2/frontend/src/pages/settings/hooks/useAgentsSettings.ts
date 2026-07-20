// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettingsAgents, upsertSettingsAgent } from "../lib/settings-api";

function agentFromEntry(entry) {
  if (!entry?.key?.startsWith("agent.roster.")) return null;
  const agent_id = entry.key.slice("agent.roster.".length);
  const value = entry.value || {};
  return {
    agent_id,
    display_name: String(value.display_name || agent_id),
    role: String(value.role || "specialist"),
    default_profile_id: String(value.default_profile_id || "default"),
    policy_binding_id: String(value.policy_binding_id || "policy/global-safe"),
    status: value.status === "inactive" ? "inactive" : "active",
  };
}

export function useAgentsSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-agents"],
    queryFn: fetchSettingsAgents,
  });

  const agents = React.useMemo(
    () => (query.data?.entries || []).map(agentFromEntry).filter(Boolean),
    [query.data]
  );

  const mutation = useMutation({
    mutationFn: ({ agentId, payload }) => upsertSettingsAgent(agentId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-agents"], (old) => {
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

  const saveAgent = React.useCallback(
    (agentId, payload) => mutation.mutate({ agentId, payload }),
    [mutation]
  );

  return {
    agents,
    query,
    saveAgent,
    isSaving: mutation.isPending,
    savingAgentId: mutation.variables?.agentId,
    error: mutation.error,
  };
}
