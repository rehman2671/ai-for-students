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

## Future work

Add a dedicated answer-state interaction test, optional progress dashboard, more lesson packs and analytics events after the public content model is added. Keep question explanations human-reviewed.
