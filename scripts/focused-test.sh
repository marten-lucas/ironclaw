#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  scripts/focused-test.sh <cargo-test-args...>

Examples:
  scripts/focused-test.sh -p ironclaw_reborn_composition inbound_turn_contract
  scripts/focused-test.sh -p ironclaw_reborn --test e2e_thread_scheduling

This wrapper intentionally requires explicit test scope so local runs do not
trigger the full workspace matrix and produce excessive debug artifacts.
EOF
}

if [[ $# -eq 0 ]]; then
  usage
  exit 2
fi

# Prevent overlapping Cargo builds/tests in the same workspace.
if pgrep -fa "cargo (build|test|check|clippy|nextest)" >/dev/null; then
  echo "Another cargo process appears to be running. Wait for it to finish first."
  pgrep -fa "cargo (build|test|check|clippy|nextest)" || true
  exit 1
fi

cargo sweep -t 14 .
CARGO_BUILD_JOBS=2 mold -run cargo test "$@" -- --test-threads=1