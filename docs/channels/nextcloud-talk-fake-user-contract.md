# Nextcloud Talk Fake-User Contract

Status: active
Last updated: 2026-07-14
Scope: native Nextcloud Talk channel path (fake-user auth), inbound webhook to outbound chat delivery.

## Inbound Contract

Source system sends webhook events to:
- /webhooks/nextcloud/talk

Expected payload shape (subset):
- type: string (`Create`, `ReactionAdded`, `ReactionRemoved`)
- actor.id: string
- actor.type: optional string
- actor.name: optional string
- object.id: optional string (message id)
- object.content: string (raw or JSON-encoded message content)
- object.replyTo: optional number (parent message id for reply flows)
- object.attachments: optional array (normalized attachment descriptors from Talk parameters)
- object.attachmentErrors: optional array (server-side download/extraction policy errors)
- target.id: optional string (room token)
- mention.userId: optional string (declared reply user id from bridge payload)
- bridgeMessage.raw: optional string (original raw text from Nextcloud event)
- bridgeMessage.mentionEntities: optional array of mention descriptors
  - token: mention token string as it appeared in message (for example `@KI Gerda`)
  - isBot: boolean (true when entity addresses configured fake user)
- bridgeMessage.attachments: optional array (same normalized descriptors as object.attachments)
- bridgeMessage.attachmentErrors: optional array (same normalized errors as object.attachmentErrors)
- replyContext.parentMessageId: optional number (message id referenced by reply)
- replyContext.parentMessage.raw: optional string (parent message text)
- reaction.emoji: optional string (reaction symbol for reaction events)
- reaction.eventType: optional string (`ReactionAdded` or `ReactionRemoved`)
- reaction.semantic: optional string (mapped semantics such as `helpful_feedback`, `human_approved`)

Canonical producer shape (recommended):
- Send only canonical keys: `type`, `actor`, `object`, `target`, `mention`, `bridgeMessage`, `replyContext`, `reaction`.
- Keep scalar fields as JSON strings; avoid numbers/objects in string slots.
- Keep `bridgeMessage.mentionEntities` as an array of objects (never object/map).
- Avoid alias keys in producer output (`eventType`, `user_id`, `room_name`, etc.).
- Do not wrap payloads in extra envelopes (`payload`, `data`, `body`) when direct JSON can be sent.

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
4. Ignore bot-authored events and unsupported event types with HTTP 200 (no-op).
5. Process every non-empty user-authored `Create` message as an inbound chat turn. Attachment-only `Create` messages are accepted when `object.attachments` is present.
6. If `mention.userId` is present, require it to match configured `nextcloud_talk_bot_username` (case-insensitive, optional leading `@` ignored); reject mismatch with HTTP 400.
7. Before submit, strip mention entities marked with `bridgeMessage.mentionEntities[].isBot=true`, then apply fallback leading-address sanitization.
8. Submit the accepted inbound workflow as `direct_chat` and return HTTP 200 immediately.
9. On every accepted event, sync the Ironclaw thread title to the Nextcloud room name when present in payload fields (`target.name`/`target.displayName`/`target.roomName` aliases and object-level fallbacks).
10. For `ReactionAdded` and `ReactionRemoved`, map reactions to semantics:
  - `👍`: helpful feedback (`helpful_feedback`)
  - `👎`: reformulation request (`needs_rephrase`)
  - `🔁`: regenerate with same context (`regenerate_same_context`)
  - `✅`: HITL approval (`human_approved`, authorization required)
  - `❌`: HITL rejection (`human_not_approved`, authorization required)
  - `❗`: escalation/review (`escalation_flag`)
11. Authorization for HITL `✅` and `❌` is controlled by app config key `reaction_approval_user_ids` (CSV of user ids). Unauthorized approvals are forwarded with `reaction.isAuthorized=false`.
12. Attachment processing policy is enforced before forwarding:
  - MIME allowlist via `attachment_allowed_mime_patterns`
  - per-file size limit via `attachment_max_file_size_bytes`
  - per-message total size limit via `attachment_max_total_size_bytes`
  - extraction output truncation via `attachment_max_extract_chars`
13. Attachment extraction behavior:
  - text-like MIME types are decoded directly
  - PDF uses heuristic text extraction
  - image OCR is optional and controlled by `attachment_enable_ocr` and `attachment_ocr_languages`
14. Policy/extraction failures are forwarded in `object.attachmentErrors` and `bridgeMessage.attachmentErrors` with `code` and `message` fields.

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
- Delivery binding lookup uses Direct route first with Shared fallback for legacy bindings.
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
