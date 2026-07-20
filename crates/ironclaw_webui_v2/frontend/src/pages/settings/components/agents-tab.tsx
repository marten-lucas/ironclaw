// @ts-nocheck
import { Badge } from "../../../design-system/badge";
import { Button } from "../../../design-system/button";
import { Card } from "../../../design-system/card";
import { FormField, Input } from "../../../design-system/input";
import React from "react";
import { useT } from "../../../lib/i18n";
import { SettingsSearchEmpty } from "./settings-search-empty";
import { matchesSearch } from "../lib/settings-search";
import { useAgentsSettings } from "../hooks/useAgentsSettings";

function AgentRow({ agent, onRename, onToggleStatus }) {
  const t = useT();
  const [nameDraft, setNameDraft] = React.useState(agent.display_name);

  React.useEffect(() => {
    setNameDraft(agent.display_name);
  }, [agent.display_name]);

  return (
    <div className="rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[var(--v2-text-strong)]">{agent.display_name}</div>
          <div className="font-mono text-[11px] text-[var(--v2-text-faint)]">{agent.agent_id}</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            size="sm"
            tone={agent.status === "active" ? "positive" : "muted"}
            label={
              agent.status === "active"
                ? t("agents.status.active")
                : t("agents.status.inactive")
            }
          />
          <Badge size="sm" tone="accent" label={`${t("agents.defaultProfile")}: ${agent.default_profile_id}`} />
          <Badge size="sm" tone="muted" label={agent.role} />
        </div>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
        <FormField label={t("agents.rename")} htmlFor={`rename-${agent.agent_id}`}>
          <Input
            id={`rename-${agent.agent_id}`}
            value={nameDraft}
            onChange={(event) => setNameDraft(event.currentTarget.value)}
          />
        </FormField>
        <Button
          variant="secondary"
          onClick={() => {
            if (nameDraft.trim()) onRename(agent.agent_id, nameDraft.trim());
          }}
        >
          {t("agents.saveName")}
        </Button>
        <Button variant="ghost" onClick={() => onToggleStatus(agent.agent_id)}>
          {agent.status === "active" ? t("agents.deactivate") : t("agents.activate")}
        </Button>
      </div>

      <div className="mt-2 font-mono text-[11px] text-[var(--v2-text-faint)]">
        {t("agents.policy")}: {agent.policy_binding_id}
      </div>
    </div>
  );
}

export function AgentsTab({ searchQuery = "" }) {
  const t = useT();
  const { agents, query, saveAgent } = useAgentsSettings();
  const [newAgentName, setNewAgentName] = React.useState("");
  const [newAgentRole, setNewAgentRole] = React.useState("specialist");
  const [newAgentProfile, setNewAgentProfile] = React.useState("default");

  if (query.isLoading) {
    return (
      <Card padding="md">
        <div className="mb-4 h-3 w-24 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-3 rounded-lg border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] p-3 last:mb-0">
            <div className="h-4 w-40 animate-pulse rounded bg-[var(--v2-surface-muted)]" />
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto_auto]">
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
          {t("agents.failedLoad", { message: query.error?.message || t("common.unknown") })}
        </p>
      </Card>
    );
  }

  const filteredAgents = agents.filter((agent) =>
    matchesSearch(searchQuery, [
      agent.agent_id,
      agent.display_name,
      agent.role,
      agent.default_profile_id,
      agent.policy_binding_id,
      agent.status,
    ])
  );

  function createAgent() {
    const name = newAgentName.trim();
    if (!name) return;
    const idBase = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const candidate = idBase || "agent";
    const collisionCount = agents.filter((agent) => agent.agent_id.startsWith(candidate)).length;
    const agent_id = collisionCount ? `${candidate}-${collisionCount + 1}` : candidate;
    saveAgent(agent_id, {
      display_name: name,
      role: newAgentRole,
      default_profile_id: newAgentProfile,
      policy_binding_id: "policy/global-safe",
      status: "active",
    });
    setNewAgentName("");
    setNewAgentRole("specialist");
    setNewAgentProfile("default");
  }

  return (
    <div className="space-y-5">
      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("agents.createTitle")}
        </h3>
        <div className="grid gap-3 md:grid-cols-4 md:items-end">
          <FormField label={t("agents.displayName")} htmlFor="agent-create-name">
            <Input
              id="agent-create-name"
              value={newAgentName}
              onChange={(event) => setNewAgentName(event.currentTarget.value)}
              placeholder={t("agents.createPlaceholder")}
            />
          </FormField>
          <FormField label={t("agents.role")} htmlFor="agent-create-role">
            <Input
              id="agent-create-role"
              value={newAgentRole}
              onChange={(event) => setNewAgentRole(event.currentTarget.value)}
            />
          </FormField>
          <FormField label={t("agents.defaultProfile")} htmlFor="agent-create-profile">
            <select
              id="agent-create-profile"
              value={newAgentProfile}
              onChange={(event) => setNewAgentProfile(event.currentTarget.value)}
              className="v2-select h-9 rounded-md border border-[var(--v2-panel-border)] bg-[var(--v2-surface-soft)] px-3 text-sm text-[var(--v2-text-strong)] outline-none focus:border-[color-mix(in_srgb,var(--v2-accent)_45%,var(--v2-panel-border))]"
            >
              <option value="default">default</option>
              <option value="coding">coding</option>
              <option value="vision">vision</option>
            </select>
          </FormField>
          <Button onClick={createAgent}>{t("agents.create")}</Button>
        </div>
      </Card>

      <Card padding="md">
        <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-accent-text)]">
          {t("agents.title", { count: filteredAgents.length })}
        </h3>
        {filteredAgents.length === 0
          ? searchQuery
            ? <SettingsSearchEmpty query={searchQuery} />
            : <p className="py-2 text-sm text-[var(--v2-text-muted)]">{t("agents.empty")}</p>
          : (
            <div className="space-y-3">
              {filteredAgents.map((agent) => (
                <AgentRow
                  key={agent.agent_id}
                  agent={agent}
                  onRename={(agentId, nextName) => {
                    const current = agents.find((item) => item.agent_id === agentId);
                    if (!current) return;
                    saveAgent(agentId, {
                      display_name: nextName,
                      role: current.role,
                      default_profile_id: current.default_profile_id,
                      policy_binding_id: current.policy_binding_id,
                      status: current.status,
                    });
                  }}
                  onToggleStatus={(agentId) => {
                    const current = agents.find((item) => item.agent_id === agentId);
                    if (!current) return;
                    saveAgent(agentId, {
                      display_name: current.display_name,
                      role: current.role,
                      default_profile_id: current.default_profile_id,
                      policy_binding_id: current.policy_binding_id,
                      status: current.status === "active" ? "inactive" : "active",
                    });
                  }}
                />
              ))}
            </div>
          )}
      </Card>
    </div>
  );
}
