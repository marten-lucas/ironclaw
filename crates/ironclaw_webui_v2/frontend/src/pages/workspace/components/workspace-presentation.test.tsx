import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test, vi } from "vitest";

vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({ data: { entries: [] }, isLoading: false, isError: false }),
}));

vi.mock("../../../lib/i18n", () => ({
  useI18n: () => ({ lang: "de" }),
  useT: () => (key: string, params: Record<string, string> = {}) => {
    const labels: Record<string, string> = {
      "workspace.area.user": "Nutzer",
      "workspace.area.soul": "Seele",
      "workspace.area.agents": "Agenten",
      "workspace.fileMeta": "{mime} · {size}",
    };
    return (labels[key] || key)
      .replace("{mime}", params.mime || "")
      .replace("{size}", params.size || "");
  },
}));

import { WorkspaceTree } from "./workspace-tree";
import { WorkspaceViewer } from "./workspace-viewer";

test("workspace tree renders localized area labels instead of backend ids", () => {
  const html = renderToStaticMarkup(
    <WorkspaceTree
      entries={[
        { name: "workspace", path: "workspace", is_dir: true },
        { name: "memory", path: "memory", is_dir: true },
        { name: "skills", path: "skills", is_dir: true },
      ]}
      selectedPath=""
      expandedPaths={new Set()}
      filter=""
      onToggleDirectory={() => {}}
      onSelectFile={() => {}}
      isLoading={false}
    />,
  );

  assert.match(html, />Nutzer</);
  assert.match(html, />Seele</);
  assert.match(html, />Agenten</);
  assert.doesNotMatch(html, />workspace</);
  assert.doesNotMatch(html, />memory</);
  assert.doesNotMatch(html, />skills</);
});

test("workspace viewer renders a locale-aware human-readable file size", () => {
  const html = renderToStaticMarkup(
    <WorkspaceViewer
      path="workspace/archive.bin"
      file={{
        kind: "binary",
        mime: "application/octet-stream",
        size_bytes: 1536,
        download_path: "/api/webchat/v2/fs/content?mount=workspace&path=archive.bin",
      }}
      isLoading={false}
      onNavigate={() => {}}
    />,
  );

  assert.match(html, /application\/octet-stream · 1,5\s+kB/);
  assert.doesNotMatch(html, /1536/);
});
