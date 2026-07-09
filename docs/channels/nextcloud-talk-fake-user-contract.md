# Nextcloud Talk Fake-User Contract

Status: active
Last updated: 2026-07-09
Scope: native Nextcloud Talk channel path (fake-user auth), inbound webhook to outbound chat delivery.

## Inbound Contract

Source system sends webhook events to:
- /webhooks/nextcloud/talk

Expected payload shape (subset):
- type: string (Create triggers processing)
- actor.id: string
- actor.type: optional string
- actor.name: optional string
- object.id: optional string (message id)
- object.content: string (raw or JSON-encoded message content)
- target.id: optional string (room token)

Host policy expectations:
- Signature mode (preferred):
  - Header X-Nextcloud-Talk-Signature
  - Header X-Nextcloud-Talk-Random
- Bridge signature mode (native Nextcloud internal app path):
  - Header X-Ironclaw-Signature
  - Header X-Ironclaw-Timestamp
  - Header X-Ironclaw-Nonce
  - Signature base string: "{timestamp}\n{nonce}\n{raw_body}"
  - Timestamp window: +/- 300s
  - Replay guard: nonce is accepted once per active window
- Transitional mode (temporary): if webhook secret is not configured, route remains active with allowlist/rate-limit/audit controls.

Ingress behavior:
1. Reject malformed payloads with HTTP 400.
2. If signature is configured and invalid, return HTTP 401.
3. In bridge signature mode, stale timestamp or replay nonce is rejected with HTTP 401.
4. Ignore bot-authored events and non-Create events with HTTP 200 (no-op).
5. Mention gate is exact token @<bot_display_name>.
6. If no exact mention, return HTTP 200 (no-op).
7. On accepted mention event, submit inbound workflow and return HTTP 200 immediately.

## Outbound Contract

Final reply egress endpoint:
- POST /ocs/v2.php/apps/spreed/api/v1/chat/{room_token}

Required headers:
- Content-Type: application/json
- Accept: application/json
- OCS-APIRequest: true

Authentication:
- HTTP Basic Auth using fake-user credentials:
  - username: nextcloud_talk_bot_username
  - password: nextcloud_talk_app_password
- Credentials are resolved from secret store/runtime credential selection.

Body schema:
- message: string
- replyTo: number

replyTo behavior:
- Use original message id when parseable as u64.
- Fallback to 0 when missing/unparseable.

## Delivery Semantics

- Only Completed runs are delivered.
- Failed/Cancelled/non-terminal-aborted flows do not post outbound replies.
- Non-2xx outbound statuses are treated as delivery failure.
- Retry classification:
  - retryable: 429 and 5xx
  - permanent: remaining non-2xx statuses

## Error Surface

Inbound:
- 400 for invalid payload/json/auth context
- 401 for missing/invalid signature (when signature mode enabled)
- 503 for workflow/service unavailability

Outbound:
- Policy/build/network failures mapped to Nextcloud delivery error path.
- Non-2xx status captures:
  - HTTP status
  - status class
  - retry decision
  - OCS meta detail/body excerpt

## Credential Handles (UI/Secret Store)

- nextcloud_talk_base_url
- nextcloud_talk_bot_username
- nextcloud_talk_app_password
- nextcloud_talk_webhook_secret

Legacy note:
- nextcloud_talk_bot_secret is deprecated and not used in the fake-user primary path.
