# AI for Students — Game Feature Todo

- [x] Define the first game's learning outcomes and target age/level.
- [x] Choose the first game loop and question format.
- [x] Create a reusable game data schema for lessons, questions, answers and explanations.
- [x] Define scoring, streaks, progress and replay behavior.
- [x] Add responsible-AI and academic-integrity content to game feedback.
- [x] Implement the first playable learning game inside the existing frontend.
- [x] Add game entry points to the Study with AI and homepage flows.
- [x] Add keyboard, mobile and reduced-motion support.
- [x] Add analytics events for starts, answers, completion and replay.
- [x] Test learning flow, answer correctness, accessibility and responsive layout.
- [x] Document future game modules and content authoring workflow.

## Next game: Fact Check Quest

- [x] Define fact-checking learning outcomes and reviewed scenarios.
- [x] Add a reusable game selection/progression model.
- [x] Implement Fact Check Quest gameplay and explanations.
- [x] Add game selector and continuity between both games.
- [x] Verify mobile, keyboard, scoring and replay behavior.
- [x] Save a new checkpoint after production verification.

## Learning platform expansion

- [x] Define privacy-conscious events for Prompt Detective and Fact Check Quest.
- [x] Create shared local progress storage and completion records.
- [x] Add AI Safety Lab reviewed scenarios and learning explanations.
- [x] Add third-game selector entry and route continuity.
- [x] Build learner progress dashboard with badges and empty states.
- [x] Verify mobile, keyboard, reduced motion and scoring flows.
- [x] Save a new checkpoint after full release verification.

## Analytics, certificates and student testing

- [x] Inspect the Umami connector/configuration and verify the live website identifier.
- [x] Define Umami goal names and event properties for the three games.
- [x] Add completion badge animation with reduced-motion fallback.
- [x] Add shareable certificate view with print and Web Share support.
- [x] Add a short post-game student feedback flow for difficulty and clarity.
- [x] Add difficulty feedback analytics without collecting student identity.
- [x] Create a facilitator test checklist for real student sessions.
- [x] Verify the complete release and save a checkpoint.

## Testing and live analytics readiness

- [x] Verify whether a live Umami dashboard URL or connector is available.
- [x] Prepare a no-identity tester session log template.
- [x] Map every game question to a review record and revision status.
- [x] Add a facilitator-friendly feedback summary workflow.
- [ ] Apply question revisions only after real tester evidence is supplied.
- [ ] Save a checkpoint after external inputs are incorporated.

## Hybrid guest and login accounts

- [x] Define guest-session limits, retention and privacy messaging.
- [x] Add optional login entry points without blocking guest play.
- [x] Upgrade project with authentication and persistent user data.
- [x] Define guest-progress-to-account migration and conflict rules.
- [x] Sync game progress, badges, feedback and certificates for logged-in users.
- [ ] Add account settings, export and deletion behavior.
- [x] Separate anonymous analytics from account data.
- [x] Test guest, login, logout, migration and multi-device flows.

## Hybrid-account gap remediation

- [x] Document and enforce guest-progress retention and expiry behavior.
- [x] Move guest-to-account merge conflict resolution to the server.
- [x] Add deterministic merge tests for downgrade and race cases.
- [x] Decide and document whether feedback and certificates are account-scoped or anonymous/browser-scoped.
- [x] Add persistence and retrieval only if account-scoped feedback/certificates are required.
- [ ] Run end-to-end guest, login, logout, migration and multi-device verification before marking those flows complete.
