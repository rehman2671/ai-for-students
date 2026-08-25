# Comparison notes: user-provided repository

Source inspected: https://github.com/sahilk267/aiforstudents

The repository is public, TypeScript 100%, on `main`, with 6 commits and visible top-level folders/files including `src/`, `database/`, `package.json`, `tsconfig.json`, `env.example`, `README.md`, `BACKEND_STATUS_REPORT.md`, `IMPLEMENTATION_COMPLETE.md` and `VERIFICATION.md`. The latest visible commit is `8c9f86c`, described as a jsonwebtoken TypeScript/import fix.

The README describes it primarily as a backend API. It claims Node.js 18+, npm/yarn, MySQL, JWT-based authentication with email/password register/login, user/profile endpoints, progress endpoints, courses/games/study-material tables, parameterized queries, bcryptjs password hashing, CORS and Hostinger MySQL deployment. It says the server runs on port 3001 in development, builds with `npm run build`, and starts with `npm start`.

The README’s documented database model includes users, user preferences, courses, user course progress, games, user game progress, user study materials and user activity logs. Its documented auth is password-based (`/api/auth/register` and `/api/auth/login`) rather than the current project’s Manus OAuth plus Hostinger email OTP approach.

The repository’s own README references a `BACKEND_DEPLOYMENT_HOSTINGER.md` guide, but that file was not visible in the top-level listing during the initial inspection. Source-level inspection is still required before judging whether the README matches the implementation.

The current AI for Students project is a full-stack React 19/Vite + Node.js/Express/tRPC + Drizzle/MySQL application with 12 learning modules, expanded topic discovery, seeded answer-order protections, guest and account progress flows, Hostinger Mail OTP, and Manus OAuth fallback. The comparison must distinguish claimed features from verified implementation.
