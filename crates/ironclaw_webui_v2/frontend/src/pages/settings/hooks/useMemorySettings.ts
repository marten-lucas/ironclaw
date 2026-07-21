// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSettingsMemory, upsertSettingsMemory } from "../lib/settings-api";

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
  };
}
