// @ts-nocheck
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchSettingsModelProfiles,
  upsertSettingsModelProfile,
} from "../lib/settings-api";

function profileFromEntry(entry) {
  if (!entry?.key?.startsWith("model_profile.")) return null;
  const name = entry.key.slice("model_profile.".length);
  const value = entry.value || {};
  return {
    name,
    model: String(value.model || ""),
    temperature: String(value.temperature || ""),
  };
}

export function useModelProfiles() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["settings-model-profiles"],
    queryFn: fetchSettingsModelProfiles,
  });

  const profiles = React.useMemo(() => {
    const parsed = (query.data?.entries || []).map(profileFromEntry).filter(Boolean);
    parsed.sort((left, right) => {
      if (left.name === "default") return -1;
      if (right.name === "default") return 1;
      return left.name.localeCompare(right.name);
    });
    return parsed;
  }, [query.data]);

  const mutation = useMutation({
    mutationFn: ({ name, payload }) => upsertSettingsModelProfile(name, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["settings-model-profiles"], (old) => {
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

  const saveProfile = React.useCallback(
    (name, payload) => mutation.mutate({ name, payload }),
    [mutation]
  );

  return {
    profiles,
    query,
    saveProfile,
    isSaving: mutation.isPending,
    savingName: mutation.variables?.name,
    error: mutation.error,
  };
}
