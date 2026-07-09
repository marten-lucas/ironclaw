# Nextcloud Talk Contract

Status: Draft
Date: 2026-07-09

## Scope

This contract describes the native Ironclaw Nextcloud Talk channel after the fake-user rework.

## Inbound

- Transport: HTTPS webhook into the native channel route.
- Event types handled: `Create` mention events.
- Message gating: only exact mentions of the configured bot display name are accepted.
- Bot-loop prevention: bot-authored events are ignored.
- Empty or non-mention events: return HTTP 200 and do not activate the workflow.

### Signature handling

- Primary mode: verify `X-Nextcloud-Talk-Signature` with `X-Nextcloud-Talk-Random`.
- Transitional mode: when the webhook secret is not configured, accept requests without signature verification but emit an operator warning.

## Outbound

- Endpoint: `POST /ocs/v2.php/apps/spreed/api/v1/chat/{room_token}`
- Authentication: HTTP Basic using the fake-user username and app password.
- Required headers:
  - `OCS-APIRequest: true`
  - `Accept: application/json`
  - `Content-Type: application/json`
- Payload fields:
  - `message`: the final assistant text
  - `replyTo`: the original message id when available, otherwise `0`

## Error handling

- Missing or invalid webhook signature: reject with 401 in primary mode.
- Missing/invalid outbound credentials: the delivery path fails closed and logs the error.
- Missing reply target id: use `replyTo = 0`.

## Migration notes

- The legacy OCC bot-secret bridge is deprecated and should only be kept as a fallback during rollout.
- Deployment scripts must not patch `config.toml` for Nextcloud Talk.
- UI-configured secrets are the source of truth for the native channel.
