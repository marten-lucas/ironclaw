import { React, html } from "../../lib/html.js";
import {
  THREAD_STATE,
  clearThreadState,
  setThreadState,
} from "../../lib/thread-state.js";
import { ApprovalCard } from "./components/approval-card.js";
import { AuthGenericCard } from "./components/auth-generic-card.js";
import { AuthOauthCard } from "./components/auth-oauth-card.js";
import { AuthTokenCard } from "./components/auth-token-card.js";
import { ChannelConnectCard } from "./components/channel-connect-card.js";
import { ChatInput } from "./components/chat-input.js";
import { ConnectionStatus } from "./components/connection-status.js";
import { EmptyState } from "./components/empty-state.js";
import { KeyboardShortcuts } from "./components/keyboard-shortcuts.js";
import { MessageList } from "./components/message-list.js";
import { RecoveryNotice } from "./components/recovery-notice.js";
import { SuggestionChips } from "./components/suggestion-chips.js";
import { TypingIndicator } from "./components/typing-indicator.js";
import { useChat } from "./hooks/useChat.js";
import { NEW_DRAFT_KEY } from "./lib/draft-store.js";
import { buildRuntimeContext } from "./lib/runtime-context.js";
import { useLlmProviders } from "../settings/hooks/useLlmProviders.js";
import {
  isProviderConfigured,
  providerDefaultModel,
  providerEffectiveBaseUrl,
} from "../settings/lib/llm-providers.js";
import { setActiveLlm } from "../settings/lib/settings-api.js";
import {
  getThreadModelBinding,
  setThreadModelBinding,
} from "./lib/thread-model-bindings.js";

/* Grace window before an active thread's sidebar state is cleared to idle.
 * Long enough for SSE to rehydrate a gate/run after a thread switch (so a
 * persisted "needs attention" badge isn't wiped-then-restored), short
 * enough that a genuinely resolved thread clears promptly.
 *
 * Assumption: SSE rehydration of a live gate/run completes within this
 * window. If it doesn't, a still-pending thread's badge clears here and
 * reappears when the gate finally arrives — a one-off re-flicker, never a
 * wrong state. The downside is purely cosmetic and self-correcting, so it
 * is intentionally not instrumented; revisit this constant (not add
 * telemetry) if slow links make the re-flicker noticeable. */
const THREAD_STATE_CLEAR_GRACE_MS = 1500;

function buildModelProbePayload(provider, builtinOverrides) {
  const model = providerDefaultModel(provider, builtinOverrides).trim();
  const payload = {
    adapter: provider.adapter,
    base_url: providerEffectiveBaseUrl(provider, builtinOverrides).trim() || provider.base_url || "",
    provider_id: String(provider.id || "").trim(),
    provider_type: provider.builtin ? "builtin" : "custom",
  };
  if (model) payload.model = model;
  return payload;
}

export function Chat({
  threads,
  activeThreadId,
  onSelectThread,
  isCreatingThread,
  composerDraft = "",
  composerResetKey = "",
  gatewayStatus,
}) {
  const {
    messages,
    isProcessing,
    pendingGate,
    channelConnectAction,
    suggestions,
    sseStatus,
    historyLoading,
    historyLoadError,
    hasMore,
    cooldownSeconds,
    recoveryNotice,
    activeRun,
    send,
    cancelRun,
    retryMessage,
    approve,
    recoverHistory,
    loadMore,
    setSuggestions,
    submitAuthToken,
    dismissChannelConnectAction,
  } = useChat(activeThreadId);

  const activeThread = React.useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || null,
    [threads, activeThreadId]
  );
  const llmProviders = useLlmProviders({
    settings: {},
    gatewayStatus,
    enabled: true,
  });
  const [detectedModelsByProvider, setDetectedModelsByProvider] = React.useState({});
  const [detectedModelsMessage, setDetectedModelsMessage] = React.useState("");
  const [detectingModels, setDetectingModels] = React.useState(false);

  const configuredProviders = React.useMemo(
    () =>
      (llmProviders.providers || []).filter((provider) =>
        isProviderConfigured(provider, llmProviders.builtinOverrides)
      ),
    [llmProviders.providers, llmProviders.builtinOverrides]
  );

  const detectModels = React.useCallback(
    async ({ silent = false } = {}) => {
      if (configuredProviders.length === 0) {
        if (!silent) {
          setDetectedModelsMessage("No configured providers available for model detection.");
        }
        return;
      }

      setDetectingModels(true);
      if (!silent) setDetectedModelsMessage("");

      const updates = {};
      let successCount = 0;
      let modelCount = 0;

      await Promise.all(
        configuredProviders.map(async (provider) => {
          try {
            const result = await llmProviders.listModels(
              buildModelProbePayload(provider, llmProviders.builtinOverrides)
            );
            if (!result?.ok || !Array.isArray(result.models)) return;
            const models = Array.from(
              new Set(
                result.models
                  .map((model) => String(model || "").trim())
                  .filter(Boolean)
              )
            );
            if (models.length === 0) return;
            updates[provider.id] = models;
            successCount += 1;
            modelCount += models.length;
          } catch {
            // Individual provider failures should not block other detections.
          }
        })
      );

      setDetectedModelsByProvider((prev) => ({
        ...prev,
        ...updates,
      }));

      if (!silent) {
        if (successCount > 0) {
          setDetectedModelsMessage(
            `Detected ${modelCount} model${modelCount === 1 ? "" : "s"} from ${successCount} provider${successCount === 1 ? "" : "s"}.`
          );
        } else {
          setDetectedModelsMessage("No models detected. Verify provider credentials and connectivity.");
        }
      }

      setDetectingModels(false);
    },
    [configuredProviders, llmProviders]
  );

  const initialModelDetectionStartedRef = React.useRef(false);
  React.useEffect(() => {
    if (initialModelDetectionStartedRef.current) return;
    if (llmProviders.isLoading) return;
    initialModelDetectionStartedRef.current = true;
    detectModels({ silent: true });
  }, [detectModels, llmProviders.isLoading]);

  const newThreadModelChoices = React.useMemo(() => {
    const options = [];
    const providersSource = configuredProviders.length > 0 ? configuredProviders : llmProviders.providers || [];
    for (const provider of providersSource) {
      const providerId = String(provider.id || "").trim();
      if (!providerId) continue;
      const detectedModels = detectedModelsByProvider[providerId] || [];
      if (detectedModels.length > 0) {
        for (const model of detectedModels) {
          options.push({
            key: `${providerId}::${model}`,
            label: `${providerId} / ${model}`,
            providerId,
            model,
          });
        }
        continue;
      }

      const fallbackModel = providerDefaultModel(provider, llmProviders.builtinOverrides);
      if (!fallbackModel) continue;
      options.push({
        key: `${providerId}::${fallbackModel}`,
        label: `${providerId} / ${fallbackModel}`,
        providerId,
        model: fallbackModel,
      });
    }
    return options;
  }, [
    configuredProviders,
    detectedModelsByProvider,
    llmProviders.providers,
    llmProviders.builtinOverrides,
  ]);
  const [newThreadModelKey, setNewThreadModelKey] = React.useState("");

  React.useEffect(() => {
    if (newThreadModelChoices.length === 0) {
      setNewThreadModelKey("");
      return;
    }
    if (newThreadModelChoices.some((choice) => choice.key === newThreadModelKey)) {
      return;
    }
    const activeKey = `${llmProviders.activeProviderId || ""}::${llmProviders.selectedModel || ""}`;
    const preferred =
      newThreadModelChoices.find((choice) => choice.key === activeKey) ||
      newThreadModelChoices[0];
    setNewThreadModelKey(preferred.key);
  }, [
    newThreadModelChoices,
    newThreadModelKey,
    llmProviders.activeProviderId,
    llmProviders.selectedModel,
  ]);

  const selectedNewThreadModel = React.useMemo(
    () => newThreadModelChoices.find((choice) => choice.key === newThreadModelKey) || null,
    [newThreadModelChoices, newThreadModelKey]
  );

  React.useEffect(() => {
    if (!activeThreadId) return;
    const binding = getThreadModelBinding(activeThreadId);
    if (!binding) return;
    if (
      binding.providerId === llmProviders.activeProviderId &&
      binding.model === llmProviders.selectedModel
    ) {
      return;
    }
    setActiveLlm({
      provider_id: binding.providerId,
      model: binding.model,
    }).catch((error) => {
      console.error("Failed to activate thread model binding:", error);
    });
  }, [
    activeThreadId,
    llmProviders.activeProviderId,
    llmProviders.selectedModel,
  ]);
  const runtimeContext = React.useMemo(
    () => buildRuntimeContext({ gatewayStatus, activeThread }),
    [gatewayStatus, activeThread]
  );
  const hasMessages =
    messages.length > 0 || isProcessing || Boolean(pendingGate) || Boolean(channelConnectAction);
  // Don't show the landing composer when history failed to load — show the
  // error banner instead so the user is not misled into thinking the thread
  // is empty.
  const showLanding = !historyLoading && !hasMessages && !historyLoadError;
  const composerDisabled = (isProcessing && !pendingGate) || cooldownSeconds > 0;
  const composerStatusText =
    cooldownSeconds > 0 ? `Retry in ${cooldownSeconds}s` : undefined;
  // Scope the persisted composer draft to the open thread (or the
  // shared new-conversation slot when there's no active thread yet).
  const composerDraftKey = activeThreadId || NEW_DRAFT_KEY;
  const canCancelRun = Boolean(
    activeThreadId &&
      activeRun?.runId &&
      activeRun.threadId === activeThreadId &&
      isProcessing &&
      !pendingGate
  );
  const handleSend = React.useCallback(
    async (content, { images = [], attachments = [] } = {}) => {
      if (!activeThreadId && selectedNewThreadModel) {
        await setActiveLlm({
          provider_id: selectedNewThreadModel.providerId,
          model: selectedNewThreadModel.model,
        });
      }
      const response = await send(content, {
        images,
        attachments,
        threadId: activeThreadId,
      });
      const responseThreadId = response?.thread_id || activeThreadId;
      if (!activeThreadId && responseThreadId && selectedNewThreadModel) {
        setThreadModelBinding(responseThreadId, selectedNewThreadModel);
      }
      if (!activeThreadId && responseThreadId && onSelectThread) {
        onSelectThread(responseThreadId, { replace: true });
      }
      return response;
    },
    [activeThreadId, onSelectThread, selectedNewThreadModel, send]
  );

  const handleSuggestion = React.useCallback(
    async (text) => {
      setSuggestions([]);
      await handleSend(text);
    },
    [handleSend, setSuggestions]
  );

  const handleCancelRun = React.useCallback(
    () => cancelRun("user_requested"),
    [cancelRun]
  );

  /* Mirror the active thread's lifecycle into the per-thread state store
   * so the sidebar row reflects what's happening on the open thread:
   *
   *   pendingGate                   → NEEDS_ATTENTION (amber)
   *   isProcessing && !pendingGate  → RUNNING (green)
   *   neither                       → clear (idle)
   *
   * Priority is pendingGate-first because a gate logically subsumes
   * processing — the run is paused waiting on the user, not actively
   * working.
   *
   * Invariant: useChat resets pendingGate (and isProcessing reaches a
   * fresh value) on threadId change via the thread-reset effect in
   * useChat, so within a single React commit batch we never observe
   * stale state from a previous thread paired with a new activeThreadId.
   *
   * Coverage gap (writer is per-active-thread only): this seam only
   * flags whichever thread the user is currently viewing. Cross-thread
   * visibility — the green/amber dot appearing on background threads
   * — requires either a user-scoped SSE channel or list_threads state
   * enrichment. Both are deferred follow-ups; see
   * docs/webui-v2-followup-picks-02-05.md.
   *
   * Clearing is deferred by a short grace period: opening a thread resets
   * pendingGate to null until SSE rehydrates it, so an immediate clear
   * would wipe a persisted "needs attention" badge and re-set it a beat
   * later — a visible flicker on the sidebar row when you click into the
   * thread. An incoming gate/run cancels the pending clear before it
   * fires; a genuinely resolved thread still clears, just after the
   * window. Setting NEEDS_ATTENTION / RUNNING stays immediate. */
  React.useEffect(() => {
    if (!activeThreadId) return undefined;
    if (pendingGate) {
      setThreadState(activeThreadId, THREAD_STATE.NEEDS_ATTENTION);
      return undefined;
    }
    if (isProcessing) {
      setThreadState(activeThreadId, THREAD_STATE.RUNNING);
      return undefined;
    }
    const timer = setTimeout(
      () => clearThreadState(activeThreadId),
      THREAD_STATE_CLEAR_GRACE_MS
    );
    return () => clearTimeout(timer);
  }, [activeThreadId, pendingGate, isProcessing]);

  const [shortcutsOpen, setShortcutsOpen] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setShortcutsOpen(false);
        return;
      }
      if (event.key !== "?") return;
      const target = event.target;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;
      event.preventDefault();
      setShortcutsOpen((open) => !open);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return html`
    <div className="flex h-full min-h-0 overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col">
        <${ConnectionStatus} status=${sseStatus} />

        ${historyLoadError &&
        html`
          <div
            className="mx-4 mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            role="alert"
          >
            ${historyLoadError}
          </div>
        `}

        ${showLanding &&
        html`
          <${EmptyState}
            onSuggestion=${handleSuggestion}
            onSend=${handleSend}
            disabled=${composerDisabled}
            initialText=${composerDraft}
            resetKey=${composerResetKey}
            draftKey=${composerDraftKey}
            context=${runtimeContext}
            statusText=${composerStatusText}
            canCancel=${canCancelRun}
            onCancel=${handleCancelRun}
            preComposerContent=${html`
              <div className="mb-3 space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-left text-xs font-medium uppercase tracking-[0.12em] text-iron-300">
                  <span>Model For New Conversation</span>
                  <div className="ml-auto flex min-w-[260px] items-center gap-2">
                    <select
                      value=${newThreadModelKey}
                      onChange=${(event) => setNewThreadModelKey(event.target.value)}
                      className="v2-select h-8 min-w-0 flex-1 rounded-[8px] px-2.5 py-0 text-xs normal-case tracking-normal"
                      disabled=${newThreadModelChoices.length === 0}
                    >
                      ${newThreadModelChoices.map(
                        (choice) => html`
                          <option key=${choice.key} value=${choice.key}>${choice.label}</option>
                        `
                      )}
                    </select>
                    <button
                      type="button"
                      className="h-8 rounded-[8px] border border-[var(--v2-panel-border)] px-3 text-xs normal-case tracking-normal text-[var(--v2-text-muted)] hover:bg-[var(--v2-surface-muted)] hover:text-[var(--v2-text-strong)]"
                      onClick=${() => detectModels({ silent: false })}
                      disabled=${detectingModels}
                    >
                      ${detectingModels ? "Detecting..." : "Detect Models"}
                    </button>
                  </div>
                </div>
                ${detectedModelsMessage
                  ? html`
                      <p className="text-[11px] text-[var(--v2-text-muted)]">${detectedModelsMessage}</p>
                    `
                  : null}
              </div>
            `}
          />
        `}
        ${!showLanding &&
        html`
          <${MessageList}
            messages=${messages}
            isLoading=${historyLoading}
            hasMore=${hasMore}
            onLoadMore=${loadMore}
            onRetryMessage=${retryMessage}
            threadId=${activeThreadId}
            pending=${isProcessing}
          >
            ${recoveryNotice &&
            html`
              <${RecoveryNotice}
                notice=${recoveryNotice}
                onRecover=${recoverHistory}
              />
            `}
            ${isProcessing && !pendingGate && html`<${TypingIndicator} />`}
            ${channelConnectAction &&
            html`
              <${ChannelConnectCard}
                connectAction=${channelConnectAction}
                onDismiss=${dismissChannelConnectAction}
              />
            `}
            ${pendingGate &&
            (pendingGate.kind === "auth_required"
              ? (pendingGate.challengeKind === "oauth_url"
                ? html`
                  <${AuthOauthCard}
                    gate=${pendingGate}
                    onCancel=${() =>
                      approve(pendingGate.requestId, "cancel", pendingGate.kind)}
                  />
                `
                : pendingGate.challengeKind === "manual_token"
                  ? html`
                  <${AuthTokenCard}
                    gate=${pendingGate}
                    onSubmit=${submitAuthToken}
                    onCancel=${() =>
                      approve(pendingGate.requestId, "cancel", pendingGate.kind)}
                  />
                `
                  : html`
                  <${AuthGenericCard}
                    gate=${pendingGate}
                    onCancel=${() =>
                      approve(pendingGate.requestId, "cancel", pendingGate.kind)}
                  />
                `)
              : html`
              <${ApprovalCard}
                gate=${pendingGate}
                onApprove=${() =>
                  approve(pendingGate.requestId, "approve", pendingGate.kind)}
                onDeny=${() =>
                  approve(pendingGate.requestId, "deny", pendingGate.kind)}
                onAlways=${() =>
                  approve(pendingGate.requestId, "always", pendingGate.kind)}
              />
            `)}
          <//>

          <${SuggestionChips}
            suggestions=${suggestions}
            onSelect=${handleSuggestion}
          />

          <${ChatInput}
            onSend=${handleSend}
            disabled=${composerDisabled}
            initialText=${composerDraft}
            resetKey=${composerResetKey}
            draftKey=${composerDraftKey}
            context=${runtimeContext}
            statusText=${composerStatusText}
            canCancel=${canCancelRun}
            onCancel=${handleCancelRun}
          />
        `}
      </div>
      <${KeyboardShortcuts}
        open=${shortcutsOpen}
        onClose=${() => setShortcutsOpen(false)}
      />
    </div>
  `;
}
