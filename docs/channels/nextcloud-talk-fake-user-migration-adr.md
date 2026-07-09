# ADR: Nextcloud Talk Migration from OCC Bot-Secret to Fake-User Path

Date: 2026-07-09
Status: Accepted
Decision owner: Ironclaw Channel Team

## Context

The historic Nextcloud Talk integration used a legacy OCC bot-secret oriented path and deployment-era config patching. This caused operational drift, mixed trust boundaries, and difficult rollback behavior.

The channel has been reworked to a native fake-user architecture:
- inbound webhook route in runtime
- exact mention gating
- async delivery handoff
- outbound OCS chat API delivery with fake-user Basic auth
- UI/secret-store driven credentials

## Decision

Adopt fake-user channel architecture as the primary and supported path.

Primary authentication and routing model:
1. Inbound: signed webhook verification when secret is configured.
2. Transitional mode: if signature secret is absent, keep route active with allowlist/rate-limit/audit constraints and warning logs.
3. Outbound: OCS chat API with fake-user credentials (`nextcloud_talk_bot_username`, `nextcloud_talk_app_password`).

Configuration source of truth:
- Ironclaw setup UI and secret store.
- Deployment scripts must not patch Nextcloud Talk runtime config into config.toml.

## Consequences

Positive:
- Cleaner trust model and credential lifecycle.
- Mention-only trigger behavior is explicit and testable.
- Deployment drift reduced via CI guard and preflight checks.

Trade-offs:
- Live-room E2E proof still requires operational environment access.
- Transitional mode is less secure than strict signature mode and must be temporary.

## Migration plan

1. Disable legacy services (CT201 sidecar and CT300 bridge) for normal operation.
2. Deploy native channel artifacts via ct201 channel update flow.
3. Configure credentials only in setup UI:
   - nextcloud_talk_base_url
   - nextcloud_talk_bot_username
   - nextcloud_talk_app_password
   - nextcloud_talk_webhook_secret
4. Verify:
   - setup test connection passes
   - exact mention triggers reply
   - no-mention returns 200 no-op

## Rollback

1. Restore previous artifact backups produced by deployment script.
2. Restart active Ironclaw runtime service.
3. Emergency fallback only: re-enable legacy bridge/sidecar temporarily.

## Guardrails

- CI workflow rejects legacy bot-secret/config patch patterns.
- Preflight rejects deprecated manifest fields (`nextcloud_talk_bot_secret`).
- Runtime logs warning when operating in transitional unsigned mode.
