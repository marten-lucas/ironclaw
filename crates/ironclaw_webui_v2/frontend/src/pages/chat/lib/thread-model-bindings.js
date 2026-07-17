const THREAD_MODEL_BINDINGS_KEY = "ironclaw:v2-thread-model-bindings";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readBindings() {
  if (!canUseStorage()) return {};
  try {
    const raw = window.localStorage.getItem(THREAD_MODEL_BINDINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeBindings(bindings) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(THREAD_MODEL_BINDINGS_KEY, JSON.stringify(bindings));
  } catch {
    // Storage write failures should never block chat sends.
  }
}

function normalizeSelection(selection) {
  const providerId = String(selection?.providerId || "").trim();
  const model = String(selection?.model || "").trim();
  if (!providerId || !model) return null;
  return { providerId, model };
}

export function getThreadModelBinding(threadId) {
  const id = String(threadId || "").trim();
  if (!id) return null;
  return normalizeSelection(readBindings()[id]);
}

export function setThreadModelBinding(threadId, selection) {
  const id = String(threadId || "").trim();
  const normalized = normalizeSelection(selection);
  if (!id || !normalized) return;
  const bindings = readBindings();
  bindings[id] = normalized;
  writeBindings(bindings);
}

export function clearThreadModelBinding(threadId) {
  const id = String(threadId || "").trim();
  if (!id) return;
  const bindings = readBindings();
  if (!(id in bindings)) return;
  delete bindings[id];
  writeBindings(bindings);
}