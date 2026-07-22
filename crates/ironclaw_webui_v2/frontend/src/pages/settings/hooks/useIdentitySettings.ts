// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSettingsAudit,
  fetchSettingsIdentity,
  revertSettingsIdentity,
  upsertSettingsIdentity,
} from "../lib/settings-api";

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
      queryClient.invalidateQueries({ queryKey: ["settings-audit"] });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (identityId) => {
      const audit = await fetchSettingsAudit();
      const entries = Array.isArray(audit?.entries) ? audit.entries : [];
      const candidates = entries
        .filter((entry) => entry?.key?.startsWith("audit."))
        .map((entry) => {
          const value = entry?.value || {};
          const auditId = String(value.id || entry.key.slice("audit.".length));
          return {
            auditId,
            entityType: String(value.entity_type || ""),
            entityId: String(value.entity_id || ""),
            beforeSnapshot: value.before_snapshot,
            createdAt: String(value.created_at || ""),
          };
        })
        .filter((entry) =>
          entry.entityType === "identity"
          && entry.entityId === identityId
          && entry.beforeSnapshot != null
          && entry.auditId
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      const latest = candidates[0];
      if (!latest) {
        throw new Error("No eligible audit snapshot found for this identity.");
      }

      await revertSettingsIdentity(identityId, latest.auditId);
      return { identityId, auditId: latest.auditId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-identity"] });
      queryClient.invalidateQueries({ queryKey: ["settings-audit"] });
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
    restoreIdentity: (identityId) => restoreMutation.mutate(identityId),
    isRestoring: restoreMutation.isPending,
    restoringIdentityId: restoreMutation.variables,
    restoreError: restoreMutation.error,
    restoredIdentityId: restoreMutation.data?.identityId,
    restoredAuditId: restoreMutation.data?.auditId,
  };
}
