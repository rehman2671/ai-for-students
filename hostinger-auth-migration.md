# Hostinger authentication migration

## Current state

The application now supports a primary local email OTP login path. A learner can request a six-digit code, receive it through the Hostinger Mail API, and verify it. Successful verification creates or updates a local user record using a privacy-preserving deterministic identity key, signs the existing secure session cookie, and clears the one-time challenge cookie. The existing guest play and server-side guest-progress merge contracts are unchanged.

Manus OAuth remains registered as an explicit fallback. It is not required for local OTP sessions when the database, `JWT_SECRET` and Hostinger Mail variables are configured. The shared session helper uses a local application identifier when the Manus app ID is absent, so local sessions can still verify after a Hostinger move.

## Hostinger environment requirements

Configure these values in the Hostinger Node.js Web App environment-variable panel, never in GitHub:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Production MySQL/TiDB-compatible connection string |
| `JWT_SECRET` | Long random secret used to sign local sessions and OTP challenge digests |
| `HOSTINGER_MAIL_API_TOKEN` | Hostinger Mail API bearer token |
| `AUTH_MAIL_FROM` | Verified sender, `auth@aiforstudents.in` |
| `OAUTH_SERVER_URL` and `VITE_APP_ID` | Keep only if Manus OAuth fallback is retained |
| `BUILT_IN_FORGE_API_URL` and `BUILT_IN_FORGE_API_KEY` | Keep only if Manus storage/Forge services are retained |

## Cutover sequence

Create the Hostinger Node.js Web App from the private GitHub repository using Node 22.x, the project build command `pnpm install --frozen-lockfile && pnpm build`, and the start command `pnpm start`. Configure the database and secrets first, then test local OTP request and verification on a staging hostname. Confirm that the response never exposes the code, that the session cookie is `httpOnly` and secure under HTTPS, and that guest progress merges into the newly created local account.

Keep the Manus OAuth fallback until local OTP has been tested on the production domain. Once all existing users have a supported local identity migration plan, the fallback can be removed in a separate change. Do not delete Manus OAuth configuration before confirming that no active accounts depend on it.

## Known non-code gates

The project still needs user-owned Hostinger hPanel setup, production database credentials, domain/DNS cutover, and a real email delivery test from `auth@aiforstudents.in`. Independent content review, real student difficulty evidence and second-device OAuth evidence remain separate QA gates and are not fabricated by this migration.
