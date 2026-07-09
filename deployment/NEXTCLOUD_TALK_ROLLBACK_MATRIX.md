# Nextcloud Talk Rollback Matrix

This matrix covers the native fake-user rework for the Nextcloud Talk channel.

| Component | Failure sign | Impact | Rollback action |
| --- | --- | --- | --- |
| Ingress webhook | 401/403 on valid Talk events, or no webhook deliveries | Channel stops receiving user mentions | Restore the previous channel artifact bundle and re-enable the bridge only if the native path cannot be recovered quickly |
| Egress delivery | Replies never appear in Talk, or outbound POSTs fail | Users receive no final answer in the room | Verify the fake-user username/app password, then roll back to the previous artifact bundle if the issue is in the native egress path |
| Setup credentials | UI cannot save base URL, bot username, app password, or webhook secret | Channel cannot be configured | Revert the recent setup change and keep the prior saved credential values intact |
| Deployment scripts | Script patches `config.toml` or rewrites legacy Nextcloud fields | Drift between deploy and UI state | Remove the script patch, redeploy the native channel artifact, and keep the bridge disabled |

## Operational notes

- Prefer restoring the previous native artifact bundle over re-enabling the legacy bridge.
- The legacy bridge is a migration fallback, not the primary rollback target.
- If a rollback is due to signature verification problems, confirm whether the environment is intentionally in transitional mode before re-enabling the old path.
