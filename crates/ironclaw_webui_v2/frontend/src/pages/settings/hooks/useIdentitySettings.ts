// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettingsIdentity, upsertSettingsIdentity } from "../lib/settings-api";

function identityFromEntry(entry) {
  if (!entry?.key?.startsWith("identity.")) return null;
  const identity_id = entry.key.slice("identity.".length);
  const value = entry.value || {};
  return {
    identity_id,
    subject_type: String(value.subject_type || "system"),
    subject_id: String(value.subject_id || "default"),
    tone: String(value.tone || ""),
    role_description: String(value.role_description || ""),
    organization_context: String(value.organization_context || ""),
    constraints: Array.isArray(value.constraints) ? value.constraints.map(String) : [],
    version: value.version ?? "",
  };
}

export function useIdentitySettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-identity"],
    queryFn: fetchSettingsIdentity,
  });

  const identities = React.useMemo(() => {
    const rows = (query.data?.entries || []).map(identityFromEntry).filter(Boolean);
    rows.sort((a, b) => a.identity_id.localeCompare(b.identity_id));
    return rows;
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: ({ identityId, payload }) => upsertSettingsIdentity(identityId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-identity"], (old) => {
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

  const saveIdentity = React.useCallback(
    (identityId, payload) => mutation.mutate({ identityId, payload }),
    [mutation]
  );

  return {
    identities,
    query,
    saveIdentity,
    isSaving: mutation.isPending,
    savingIdentityId: mutation.variables?.identityId,
    error: mutation.error,
  };
}
