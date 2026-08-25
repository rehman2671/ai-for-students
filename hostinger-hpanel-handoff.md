# Hostinger hPanel deployment handoff

## Application source

Use the private GitHub repository `rehman2671/ai-for-students`, branch `main`. The current validated release builds successfully with TypeScript, Vite and the Node.js server bundle. Do not upload `.env` files, database dumps containing personal data or generated `dist/` artifacts manually unless Hostinger’s Web App workflow requires a build output.

## Node.js Web App settings

| hPanel field | Value |
|---|---|
| Application source | GitHub repository `rehman2671/ai-for-students` |
| Branch | `main` |
| Node.js version | 22.x, or the newest version supported by the account |
| Build command | `pnpm install --frozen-lockfile && pnpm build` |
| Start command | `pnpm start` |
| Application type | Node.js / Express.js |
| Public port | Use the `PORT` supplied by Hostinger; the server must not be forced to a fixed port |
| First deployment | Staging hostname first; connect the production domain only after smoke tests |

If the hPanel runtime does not provide pnpm, use the equivalent npm-compatible install/build commands supported by the lockfile and Hostinger runtime, then retain `pnpm start` only if pnpm is available. Do not change the application to a fixed port.

## Server-side environment variables

Configure these only in Hostinger’s protected environment-variable panel. Never put their values in GitHub, frontend source or screenshots.

| Variable | Purpose | Required for local OTP deployment |
|---|---|---|
| `DATABASE_URL` | Production MySQL/TiDB connection string | Yes |
| `JWT_SECRET` | Signs local session cookies; use a new long random value | Yes |
| `HOSTINGER_MAIL_API_TOKEN` | Sends authentication codes through Hostinger Mail API | Yes |
| `AUTH_MAIL_FROM` | Verified sender, `auth@aiforstudents.in` | Yes |
| `HOSTINGER_MAIL_API_URL` | Hostinger Mail API base URL if not already supplied by the project configuration | Confirm in hPanel/config |
| `VITE_APP_TITLE` | Public application title | Yes |
| `VITE_APP_LOGO` | Public logo setting if used | Optional |
| `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL` | Manus OAuth fallback | Optional during local-OTP primary cutover |
| `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY` | Manus-backed services still used by the application | Confirm before disabling |
| `VITE_FRONTEND_FORGE_API_URL`, `VITE_FRONTEND_FORGE_API_KEY` | Browser-side configured service access where still required | Confirm before disabling |

The production database must be created and migrated before testing authenticated progress. Do not run destructive schema operations against any existing database. Confirm whether the Hostinger MySQL database can be reached by the Node.js Web App using the account’s internal hostname and SSL requirements, then set the resulting connection string in `DATABASE_URL`.

## Cutover order

First deploy the staging app, verify `/health` or the application landing page, and inspect server logs. Next verify that a guest can play and that the local OTP dialog requests a code without exposing it in the response. Verify the code arrives from `auth@aiforstudents.in`, complete sign-in, refresh the page and confirm the signed session remains valid. Finally verify guest-progress merge, logout, account export/deletion and mobile layout before attaching the production domain.

Manus OAuth remains an explicit fallback, not the primary sender. If its callback variables are absent on Hostinger, local OTP should still issue and verify the application session. Keep Manus variables configured during the first staging cutover if existing users may still use OAuth.

## User-owned prerequisites

The owner must create the Hostinger Node.js Web App, provide the staging URL, create or select the production database, add protected environment variables and connect the domain. The owner must not send secret values in chat. Once the staging URL is available, use it for the real HTTPS OTP and guest-progress verification.
