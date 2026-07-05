#!/usr/bin/env bash
# Build the Nextcloud Talk channel WASM component.

set -euo pipefail

cd "$(dirname "$0")"

if ! command -v wasm-tools &> /dev/null; then
    echo "Error: wasm-tools not found. Install with: cargo install wasm-tools"
    exit 1
fi

if ! command -v mold &> /dev/null; then
    echo "Error: mold not found. Install with your package manager (e.g. apt install mold)."
    exit 1
fi

if ! command -v cargo-sweep &> /dev/null; then
    echo "Error: cargo-sweep not found. Install with: cargo install cargo-sweep --locked"
    exit 1
fi

if ! rustup target list --installed | grep -q '^wasm32-wasip2$'; then
    echo "Error: rust target wasm32-wasip2 is not installed. Install with: rustup target add wasm32-wasip2"
    exit 1
fi

if pgrep -af 'cargo build|cargo test|rustc' >/dev/null 2>&1; then
    echo "Error: active Rust build/test process already running"
    pgrep -af 'cargo build|cargo test|rustc' || true
    exit 1
fi

echo "Cleaning old artifacts (cargo sweep -t 14)..."
cargo sweep -t 14

echo "Building Nextcloud Talk channel WASM component..."
CARGO_BUILD_JOBS="${CARGO_BUILD_JOBS:-2}" mold -run cargo build --release --target wasm32-wasip2

WASM_PATH="target/wasm32-wasip2/release/nextcloud_talk_channel.wasm"

if [ -f "$WASM_PATH" ]; then
    wasm-tools component new "$WASM_PATH" -o nextcloud-talk.wasm 2>/dev/null || cp "$WASM_PATH" nextcloud-talk.wasm
    wasm-tools strip nextcloud-talk.wasm -o nextcloud-talk.wasm

    echo "Built: nextcloud-talk.wasm ($(du -h nextcloud-talk.wasm | cut -f1))"
    echo ""
    echo "To install as Reborn v2 extension package:"
    echo "  mkdir -p ~/.ironclaw-reborn/local-dev/system/extensions/nextcloud-talk/wasm"
    echo "  cp nextcloud-talk.wasm ~/.ironclaw-reborn/local-dev/system/extensions/nextcloud-talk/wasm/nextcloud-talk.wasm"
    echo "  cp nextcloud-talk.manifest.toml ~/.ironclaw-reborn/local-dev/system/extensions/nextcloud-talk/manifest.toml"
else
    echo "Error: WASM output not found at $WASM_PATH"
    exit 1
fi
