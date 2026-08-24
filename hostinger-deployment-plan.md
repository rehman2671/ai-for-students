# Hostinger deployment recommendation

## Decision

The current React/Vite + Node.js/Express/tRPC application can be deployed to Hostinger Business hosting through Hostinger’s managed Node.js Web App workflow. The official Hostinger guide explicitly lists Business and Cloud plans as supporting Node.js applications, including React/Vite frontends and Express.js backends.

The user-provided `POST /api/agency-hosting/v1/websites/{website_uid}/build-assets` endpoint is suitable only when the target `website_uid` belongs to an Agency Plan website. Its documented behavior builds and deploys a Node.js application from an archive already uploaded to that website’s file browser and writes the result to `public_html`. It does not establish that a normal Business-plan site has an Agency website UID.

## Same-host architecture

For a single Business-hosted application, the recommended shape is one Hostinger Node.js Web App containing the built React frontend and the Express/tRPC backend. The frontend is served by Express, while `/api/trpc` and OAuth or email-auth endpoints remain server-side. One MySQL database can be shared by the core backend and a separate management UI, but the management UI should call backend admin procedures rather than connect directly to the database from the browser.

A separate management frontend can either be a route in the same app or a second Hostinger website. A second site is easier to isolate operationally, but the API and database remain the shared integration boundary. The Build Assets API does not guarantee that multiple sites are placed on the same physical server; it manages website deployment resources, not database topology.

## Migration blockers to resolve before production

The project currently depends on Manus OAuth, Manus-provided environment variables and Manus storage helpers. These are not automatically portable to Hostinger. Keeping Manus OAuth and Manus storage would require those services to remain reachable and their secrets to be configured in Hostinger; replacing them with custom Hostinger email OTP and Hostinger-compatible storage would be a separate migration. The Hostinger Mail API adapter is already provider-neutral and can continue to send from `auth@aiforstudents.in`.

The current production build outputs the browser assets and bundles the Express server as `dist/index.js`, with `pnpm start` launching `node dist/index.js`. Hostinger’s Node.js Web App setup should be configured with the project build command, start command, Node 22.x, required environment variables, and the correct entry/output settings. The assigned `PORT` must be honored by the process.

## Safer sequence

First confirm in hPanel that the user’s Business plan exposes **Node.js Web App** creation. Then deploy a staging copy from GitHub or ZIP, configure environment variables without committing secrets, connect a MySQL database, and test guest play, login, progress sync, email delivery, storage and account deletion. Only after these tests pass should the domain be pointed to the Hostinger app.

## Sources

1. https://developers.hostinger.com/#tag/agency-hosting-websites/POST/api/agency-hosting/v1/websites/{website_uid}/build-assets
2. https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
3. https://www.hostinger.com/pro
