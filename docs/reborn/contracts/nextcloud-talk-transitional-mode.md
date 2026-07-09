# Nextcloud Talk Transitional Mode ADR

Status: Accepted
Date: 2026-07-09

## Context

The native Nextcloud Talk channel now supports the fake-user delivery path and the signature-based webhook secret is configured through the IronClaw UI. During migration, some environments may still need a temporary period where the webhook secret is not yet present while the deployment is being rotated.

## Decision

The native Nextcloud Talk ingress accepts a transitional mode when the webhook signature secret is absent.

In transitional mode:

- the route remains protected by the existing host ingress policy and rate limits
- webhook requests are accepted without signature verification
- the runtime emits a warning so operators can see that the channel is running in a migration-only state

When the webhook secret is configured, signature verification remains the default path.

## Consequences

- Temporary migration windows are possible without blocking the channel rollout.
- Transitional mode is weaker than signed webhooks and should remain short-lived.
- The deployment runbook must call out the mode explicitly so operators know whether signature verification is active.
