# Hostinger deployment assessment findings

## Verified official documentation

The Hostinger Agency Hosting Build Assets operation is documented as **Build website NodeJS assets**. It builds and deploys a Node.js application for an **Agency Plan website** from an archive that has already been uploaded to the file browser. The request body requires an `archive_path`, commonly `public_html`, and the resulting website contents are overwritten by the build result and deployed to `public_html`.

The separate Hostinger Node.js Web Apps documentation states that Node.js applications are supported on **Business and Cloud hosting plans**. It lists Node.js 18.x, 20.x, 22.x and 24.x, and supports React/Vite frontend applications plus Express.js backend applications. It describes GitHub, ZIP upload and Hostinger Connector deployment paths, managed environment variables, logs, restarts and a Database Connect Wizard. It also states that backend build files are stored outside `public_html`, with routing handled through an automatically created `.htaccess` file.

## Initial implication

The Build Assets endpoint is not merely a static-file upload endpoint; its official description explicitly covers Node.js build/deploy for Agency Plan websites. However, the endpoint is scoped to Agency Hosting and does not by itself prove that a particular four-year Business shared-hosting subscription has an Agency Plan website UID. The user’s hPanel Node.js Web App deployment path is the more direct route for a Business plan.

## Project fit to validate

The current project uses React 19/Vite on the frontend and Node.js/Express/tRPC with Drizzle/MySQL on the backend. It also depends on Manus OAuth, built-in Manus environment variables and S3/storage helpers. A Hostinger deployment would therefore need an explicit external replacement or retained service for OAuth, storage, database connectivity and all required environment variables; copying only the frontend build assets would not deploy the full application behavior.

Sources:

1. https://developers.hostinger.com/#tag/agency-hosting-websites/POST/api/agency-hosting/v1/websites/{website_uid}/build-assets
2. https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/

## Agency-plan distinction

Hostinger’s official Hostinger Pro page describes Agency Hosting as a separate professional product for managing multiple client sites, with website isolation, access sharing and up to 300 sites on one plan. This supports treating the Agency Hosting API’s `website_uid` as distinct from an ordinary Business shared-hosting website unless the user’s hPanel explicitly exposes that Agency website resource.

3. https://www.hostinger.com/pro
