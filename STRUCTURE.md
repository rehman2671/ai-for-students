# Prompt Detective — Architecture

## Integration model

The game is a route-level React feature embedded in the existing AI for Students platform. The platform header and visual language remain intact. The game itself is a self-contained learning module that can later be replaced by additional lessons without changing the navigation shell.

## Current module structure

```text
client/src/
  components/game/
    PromptDetective.tsx
    GameQuestionCard.tsx
    GameProgress.tsx
    GameResult.tsx
  data/
    gameQuestions.ts
  pages/
    GamePage.tsx
  lib/
    gameStorage.ts
```

## Boundaries

- `gameQuestions.ts` contains only reviewed, declarative lesson data.
- `PromptDetective.tsx` owns session state, scoring, answer transitions and lesson selection.
- `GameQuestionCard.tsx` renders a question and answer choices.
- `GameResult.tsx` renders score, concepts and next action.
- `gameStorage.ts` handles localStorage only; no account or server dependency exists in MVP.
- `App.tsx` owns route registration and does not contain game logic.

## State model

```text
GameState
- lessonId
- questionOrder[]
- currentIndex
- score
- selectedAnswerId
- status: idle | answering | feedback | complete
- bestScore
```

## Future extension points

Lessons can be added through the same schema. A later backend can replace localStorage with a user progress API. A future AI-powered evaluator must be isolated behind a server-side adapter and must never expose provider credentials in browser code.
