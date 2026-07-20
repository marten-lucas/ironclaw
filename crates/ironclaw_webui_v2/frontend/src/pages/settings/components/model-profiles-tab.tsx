// @ts-nocheck
import { Badge } from "../../../design-system/badge";
import { Button } from "../../../design-system/button";
import { Card } from "../../../design-system/card";
import { FormField, Input } from "../../../design-system/input";
import React from "react";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useModelProfiles } from "../hooks/useModelProfiles";

export function ModelProfilesTab({ searchQuery = "" }) {
  const t = useT();
  const { profiles, query, saveProfile, isSaving, savingName } = useModelProfiles();
  const [drafts, setDrafts] = React.useState({});

  if (query.isLoading) {
    return (
      <Card padding="md">
        <div className="mb-4 h-3 w-28 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3 mb-3 last:mb-0">
            <div className="h-4 w-40 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_120px_auto]">
              <div className="h-9 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              <div className="h-9 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
              <div className="h-9 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            </div>
          </div>
        ))}
      </Card>
    );
  }

  if (query.isError) {
    return (
      <Card padding="md">
        <p className="text-sm text-[var(--v2-danger-text)]">
          {t("modelProfiles.failedLoad", { message: query.error?.message || t("common.unknown") })}
        </p>
      </Card>
    );
  }

  React.useEffect(() => {
    const nextDrafts = {};
    for (const profile of profiles) {
      nextDrafts[profile.name] = {
        model: profile.model,
        temperature: profile.temperature,
      };
    }
    setDrafts(nextDrafts);
  }, [profiles]);

  const profilesWithDrafts = profiles.map((profile) => ({
    ...profile,
    model: drafts[profile.name]?.model ?? profile.model,
    temperature: drafts[profile.name]?.temperature ?? profile.temperature,
  }));

  const visibleProfiles = profilesWithDrafts.filter((profile) =>
    matchesSearch(searchQuery, [profile.name, profile.model, profile.temperature])
  );

  const defaultProfile = profilesWithDrafts.find((profile) => profile.name === "default");
  const isDefaultMissing = !defaultProfile || !String(defaultProfile.model || "").trim();

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("modelProfiles.title")}
        </h3>

        {visibleProfiles.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="py-2 text-sm text-[var(--v2-text-muted)]">{t("modelProfiles.empty")}</p>
          : (
            <div className="space-y-3">
              {visibleProfiles.map((profile) => (
                <div
                  key={profile.name}
                  className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="text-sm font-medium text-[var(--v2-text-strong)]">{profile.name}</div>
                    <Badge
                      size="sm"
                      tone={profile.name === "default" ? "accent" : "muted"}
                      label={profile.name === "default" ? t("modelProfiles.required") : t("modelProfiles.optional")}
                    />
                  </div>

                  <div className="grid gap-3 md:grid-cols-[1fr_120px_auto] md:items-end">
                    <FormField label={t("modelProfiles.model")} htmlFor={`profile-model-${profile.name}`}>
                      <Input
                        id={`profile-model-${profile.name}`}
                        value={profile.model}
                        onChange={(event) => {
                          const next = event.currentTarget.value;
                          setDrafts((current) => ({
                            ...current,
                            [profile.name]: {
                              ...(current[profile.name] || {
                                model: profile.model,
                                temperature: profile.temperature,
                              }),
                              model: next,
                            },
                          }));
                        }}
                      />
                    </FormField>
                    <FormField label={t("modelProfiles.temperature")} htmlFor={`profile-temp-${profile.name}`}>
                      <Input
                        id={`profile-temp-${profile.name}`}
                        value={profile.temperature}
                        onChange={(event) => {
                          const next = event.currentTarget.value;
                          setDrafts((current) => ({
                            ...current,
                            [profile.name]: {
                              ...(current[profile.name] || {
                                model: profile.model,
                                temperature: profile.temperature,
                              }),
                              temperature: next,
                            },
                          }));
                        }}
                      />
                    </FormField>
                    <Button
                      variant="secondary"
                      disabled={isSaving && savingName === profile.name}
                      onClick={() => {
                        const draft = drafts[profile.name] || {
                          model: profile.model,
                          temperature: profile.temperature,
                        };
                        saveProfile(profile.name, {
                          model: String(draft.model || "").trim(),
                          temperature: String(draft.temperature || "").trim(),
                        });
                      }}
                    >
                      {t("modelProfiles.saveInline")}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </Card>

      {isDefaultMissing && (
        <Card padding="md">
          <div className="text-sm text-[var(--v2-danger-text)]">{t("modelProfiles.defaultMissing")}</div>
        </Card>
      )}
    </div>
  );
}
