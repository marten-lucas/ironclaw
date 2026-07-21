// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettingsToolPolicies, upsertSettingsToolPolicy } from "../lib/settings-api";

function policyFromEntry(entry) {
  if (!entry?.key?.startsWith("tool_policy.")) return null;
  const policy_id = entry.key.slice("tool_policy.".length);
  const value = entry.value || {};
  return {
    policy_id,
    scope: String(value.scope || "global"),
    allow_rules: Array.isArray(value.allow_rules) ? value.allow_rules.map(String) : [],
    deny_rules: Array.isArray(value.deny_rules) ? value.deny_rules.map(String) : [],
    escalation_rules: Array.isArray(value.escalation_rules)
      ? value.escalation_rules.map(String)
      : [],
    version: value.version ?? "",
  };
}

export function useToolPoliciesSettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-tool-policies"],
    queryFn: fetchSettingsToolPolicies,
  });

  const policies = React.useMemo(() => {
    const rows = (query.data?.entries || []).map(policyFromEntry).filter(Boolean);
    rows.sort((a, b) => a.policy_id.localeCompare(b.policy_id));
    return rows;
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: ({ policyId, payload }) => upsertSettingsToolPolicy(policyId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-tool-policies"], (old) => {
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

  const savePolicy = React.useCallback(
    (policyId, payload) => mutation.mutate({ policyId, payload }),
    [mutation]
  );

  return {
    policies,
    query,
    savePolicy,
    isSaving: mutation.isPending,
    savingPolicyId: mutation.variables?.policyId,
    error: mutation.error,
  };
}
