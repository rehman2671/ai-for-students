# Hybrid Account Policy

## Guest progress

Guest progress is stored only in the learner's browser `localStorage`. The inactivity retention window is **90 days**. Every game start or completion refreshes the activity timestamp. If the timestamp is older than 90 days, the browser removes the guest progress and session marker before returning data. The dashboard explains this behavior and offers sign-in without blocking play.

Guest progress is not treated as an account, is not sent to the server until the learner signs in, and contains no name, email or free-text answer data.

## Guest-to-account migration

After OAuth authentication, the progress page waits for the authenticated progress query before requesting migration. The server is authoritative for the merge. For each game, attempts, completions, best score and last score are merged using the maximum of the account value and the incoming guest value. This prevents a stale browser from downgrading an account. The server also writes the migration time as the latest activity time.

The current static guest record remains available in the browser after migration so the learner can continue the same session. Future cleanup may remove it after explicit confirmation, but it must not be removed silently before a successful server response.

## Feedback and certificates

Post-game difficulty feedback remains anonymous and analytics-scoped. It is intentionally not attached to a learner account because it is product research rather than a learner record. Certificates are browser-generated milestone views based on progress and are intentionally not stored as personal documents. A learner can print or share a certificate from the device where it was earned.

If the product later needs official credentials, the implementation must add a reviewed certificate identity policy, a persistent certificate record, revocation behavior and an account deletion policy before changing this scope.

## Account controls

Authenticated users can view synced progress and log out. Account deletion, data export and server-side feedback/certificate history are not enabled in this release because those capabilities require an explicit product and data-retention decision.
