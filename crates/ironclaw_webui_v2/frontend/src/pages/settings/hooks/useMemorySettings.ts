// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSettingsAudit,
  fetchSettingsMemory,
  revertSettingsMemory,
  upsertSettingsMemory,
} from "../lib/settings-api";

function memoryFromEntry(entry) {
  if (!entry?.key?.startsWith("memory.")) return null;
  const memory_id = entry.key.slice("memory.".length);
  const value = entry.value || {};
  return {
    memory_id,
    scope: String(value.scope || "global"),
    owner_id: String(value.owner_id || ""),
    title: String(value.title || ""),
    content: String(value.content || ""),
    tags: Array.isArray(value.tags) ? value.tags.map(String) : [],
    visibility: String(value.visibility || ""),
    version: value.version ?? "",
  };
}

export function useMemorySettings() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-memory"],
    queryFn: fetchSettingsMemory,
  });

  const memories = React.useMemo(() => {
    const rows = (query.data?.entries || []).map(memoryFromEntry).filter(Boolean);
    rows.sort((a, b) => a.memory_id.localeCompare(b.memory_id));
    return rows;
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: ({ memoryId, payload }) => upsertSettingsMemory(memoryId, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-memory"], (old) => {
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
    mutationFn: async (memoryId) => {
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
          entry.entityType === "memory"
          && entry.entityId === memoryId
          && entry.beforeSnapshot != null
          && entry.auditId
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

      const latest = candidates[0];
      if (!latest) {
        throw new Error("No eligible audit snapshot found for this memory item.");
      }

      await revertSettingsMemory(memoryId, latest.auditId);
      return { memoryId, auditId: latest.auditId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings-memory"] });
      queryClient.invalidateQueries({ queryKey: ["settings-audit"] });
    },
  });

  const saveMemory = React.useCallback(
    (memoryId, payload) => mutation.mutate({ memoryId, payload }),
    [mutation]
  );

  return {
    memories,
    query,
    saveMemory,
    isSaving: mutation.isPending,
    savingMemoryId: mutation.variables?.memoryId,
    error: mutation.error,
    restoreMemory: (memoryId) => restoreMutation.mutate(memoryId),
    isRestoring: restoreMutation.isPending,
    restoringMemoryId: restoreMutation.variables,
    restoreError: restoreMutation.error,
    restoredMemoryId: restoreMutation.data?.memoryId,
    restoredAuditId: restoreMutation.data?.auditId,
  };
}
