# AI for Students — Game Implementation Memory

## Current state

Prompt Detective is implemented as a route-level React learning game at `/play`. The homepage study CTAs link to the game. The game uses a reviewed local question bank, three lesson themes, five-case sessions, feedback explanations, scoring, replay and local best-score storage.

## Important decisions

The game intentionally uses no realtime AI API, accounts, backend, leaderboard or multiplayer. This keeps it suitable for the static-first MVP and avoids exposing secrets or storing unnecessary learner data.

The visual system uses the same warm paper, ink, evergreen, sage, clay and saffron palette as the homepage. Saffron is reserved for signals, tabs, progress and key numerals.

## Verification

- `pnpm check` passes.
- `pnpm build` passes.
- `/play` picker state verified in desktop preview.
- `/play?demo` active gameplay state verified on a narrow mobile viewport.
- Final-score double-counting issue was corrected before checkpoint.

## Current expansion

AI Safety Lab is now the third game, covering privacy, academic integrity, high-stakes information and digital harm. The game hub supports Prompt Detective, Fact Check Quest and AI Safety Lab. `/progress` provides a local-first dashboard with completion stats and badges.

A shared `learningProgress.ts` helper stores attempts, completions, best score, last score and last played timestamp without identity data. `analytics.ts` forwards safe event names and non-identifying properties to the existing Umami integration. Tracked events include game start, answer, completion, exit and progress reset.

## Future work

Add dedicated answer-state interaction tests, more reviewed lesson packs and optional account sync only after the local-first model proves useful. Keep all question explanations human-reviewed.
