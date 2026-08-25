# Local OTP verification note

The unauthenticated `/progress` route was rendered successfully after the local OTP entry point was added. The page still presents guest progress and the sign-in action together, so guest play is not blocked. The `/account` route also compiles with the same reusable local sign-in component.

The server-level flow was verified with the real tRPC router test: requesting a code calls the mail adapter without returning the code; a verified six-digit code creates or updates a local user, signs the existing secure session cookie and clears the one-time challenge; the authenticated caller can then invoke the protected learning-progress merge procedure.

A live browser email-entry-to-session test remains a deployment gate rather than a source-level claim. It requires a Hostinger database, configured `JWT_SECRET`, a real `HOSTINGER_MAIL_API_TOKEN`, the verified `AUTH_MAIL_FROM` sender and a staging hostname over HTTPS. After those are configured, test one guest game, open Sign in, request the code, verify it, refresh the progress page and confirm that the guest rows are merged into the account.
