# AI for Students repository comparison

## Executive conclusion

The current `ai-for-students` project is the stronger foundation for the product the user described: a premium, scalable AI learning-game platform with twelve modules, a broad topic curriculum, hybrid guest/account use, anti-bias safeguards, progress synchronization and Hostinger email support. The user-provided repository, [`sahilk267/aiforstudents`](https://github.com/sahilk267/aiforstudents), is a useful lightweight backend reference, especially for conventional Hostinger MySQL deployment and password-based account endpoints, but it is not a replacement for the current platform.

The recommended decision is **keep the current project and selectively borrow deployment ideas only**. Do not replace the current codebase or merge the alternate repository wholesale. The alternate repository is backend-only, its own documentation is contradictory, and its schema does not contain the current platform’s curriculum, question-bank, review-status, guest-progress or OTP concepts.

## Direct comparison

| Dimension | Current `ai-for-students` | User-provided `aiforstudents` repository | Assessment |
|---|---|---|---|
| Product shape | Full-stack React 19/Vite frontend plus Node.js/Express/tRPC backend | Backend API only; no frontend build is served | Current project is much closer to the intended product |
| Learning games | 12 AI learning modules, including quizzes, labs and field games | SQL seeds only 6 generic games; no question bank or game loop | Current project wins decisively |
| Curriculum/discovery | 100+ topic catalog direction with topic, skill, difficulty and age filters | No topic catalog or discovery routes in the visible API/schema | Current project wins decisively |
| Content quality controls | Learning objectives, review-status labels, pilot transparency and anti-bias answer ordering | No question, answer, review-status or answer-distribution model | Current project has the required learning safeguards |
| Authentication | Manus OAuth fallback plus Hostinger email OTP primary flow, secure cookie session, guest-to-account progress path | Email/password register/login with bcrypt and bearer JWT responses | Alternate repo is simpler, but not aligned with the selected Hostinger OTP strategy |
| Persistence | Drizzle/MySQL-compatible server procedures, account export/deletion, server-side progress merge rules | Hand-written mysql2 queries with course/game progress and profile endpoints | Current project has richer product contracts; alternate repo is easier to understand but less typed |
| Guest experience | Guest play remains available and local progress can merge into an account | No guest session or migration flow visible | Current project wins decisively |
| Progress model | Attempts, completions, best/last score, badges, feedback and sharing-related contracts | Generic course/game progress, levels, scores and achievements | Current project matches the user’s learner journey better |
| Safety and privacy | Responsible-AI learning content, no public leaderboard requirement, anonymous analytics separation, account export/deletion and code privacy tests | Basic JWT, bcrypt, parameterized queries and CORS claims; no visible learning-safety or guest-privacy model | Current project is broader; alternate repo still offers useful baseline security patterns |
| Accessibility/responsiveness | Existing keyboard/mobile/reduced-motion work and source-contract checks | No visible frontend, accessibility layer or browser test suite | Current project wins decisively |
| Testing confidence | Vitest regression suite; current validation reached 21 passing tests plus TypeScript/build validation | No test harness in `package.json`; its `VERIFICATION.md` says implementation was pending despite other docs saying complete | Current project has stronger evidence |
| Hostinger fit | Node.js Web App path, environment-driven server, Hostinger Mail adapter and migration notes | Explicit Hostinger MySQL instructions and simple `npm run build`/`npm start` | Alternate repo has simpler deployment instructions; current project needs more environment configuration |

## What the alternate repository actually contains

The alternate repository is TypeScript 100% and uses Express 4, `mysql2`, `jsonwebtoken`, `bcryptjs`, `cors` and `dotenv`. Its package scripts compile TypeScript to `dist/` and start `dist/server.js`. The server exposes `/health` and three API areas: `/auth`, `/users` and `/progress`. It does not serve a frontend.

Its authentication controller implements email/password registration and login. Passwords are hashed with bcrypt, and the resulting JWT is returned in the JSON response for use as a Bearer token. There is no Hostinger Mail API adapter, no email OTP, no httpOnly session-cookie flow, no Manus OAuth integration, and no guest-to-account migration.

Its SQL schema defines users, preferences, courses, course progress, games, game progress, study materials and activity logs. The visible seed data contains six generic games and three generic courses. There is no topic catalog, question/answer bank, review-status metadata, guest-progress store, OTP challenge state, badge model or curriculum structure matching the current application.

The repository documentation is not internally consistent. `BACKEND_STATUS_REPORT.md` and `IMPLEMENTATION_COMPLETE.md` describe the backend as complete and production-ready, while `VERIFICATION.md` later says core database tables, controllers, queries, password hashing and JWT generation still need implementation, ending with “Structure Complete | Implementation Pending.” The README also references deployment documents that were not visible in the cloned repository tree. This is a maintainability and deployment-confidence risk.

## Merge and migration recommendation

Do not merge the alternate repository’s authentication or database layer into the current project. Its password/JWT model would create a third identity strategy beside Manus OAuth and Hostinger OTP, increase migration risk and potentially split users and progress records. Its generic numeric game model also cannot represent the current question IDs, answer IDs, learning objectives, review labels and seeded answer-order protections without a lossy redesign.

The only parts worth selectively borrowing are its deployment communication: explicit Hostinger MySQL field names, a health endpoint concept and a simple production-start explanation. The current project already has the more appropriate server architecture and now includes a Hostinger migration document. If a health endpoint is needed for Hostinger monitoring, add it to the current Express server rather than importing the alternate repository.

## Hostinger-specific decision

For the current project, use Hostinger’s Node.js Web App deployment path rather than assuming the Agency Build Assets endpoint applies to a normal Business hosting website. Configure production secrets in Hostinger, not GitHub. The database, `JWT_SECRET`, Hostinger Mail token and verified sender must be configured before live OTP testing. Manus OAuth can remain an explicit fallback during the transition, but the new primary local OTP path is designed not to require Manus OAuth variables for local session verification.

The remaining live gate is user-owned: deploy a staging Node.js app on Hostinger over HTTPS, configure the database and mail credentials, send a real code from `auth@aiforstudents.in`, sign in after guest play, refresh the page and confirm that progress is merged. That cannot be honestly marked complete from repository inspection alone.

## Final recommendation

**Keep the current project as the product codebase.** It has the richer verified learning experience, stronger testing evidence, safer account/progress contracts and a migration path that matches the user’s requested email sender. Use the alternate repository only as a reference for basic Hostinger MySQL deployment wording. Replacing the current project with it would remove most of the product functionality already built and would reintroduce the exact authentication, guest migration, content quality and accessibility gaps the current project was created to solve.
