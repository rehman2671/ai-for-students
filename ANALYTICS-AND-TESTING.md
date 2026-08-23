# Analytics and Student Testing

## Umami event contract

The site emits privacy-conscious events through the existing Umami script. These events contain a game identifier, question number, correctness boolean, score, total and selected difficulty only. No name, email, answer text or personal identifier is sent.

| Event name | Goal purpose | Properties |
|---|---|---|
| `learning_game_start` | Measure game starts | `game`, optional `lesson` |
| `learning_game_answer` | Measure answer participation and accuracy | `game`, `question`, `correct` |
| `learning_game_complete` | Measure completion and score | `game`, `score`, `total` |
| `learning_game_exit` | Measure early exits | `game`, `question` |
| `learning_feedback` | Compare perceived difficulty | `game`, `difficulty` |
| `certificate_share` | Measure certificate sharing intent | `game`, `score`, `total` |
| `certificate_print` | Measure printable certificate use | `game`, `score`, `total` |
| `learning_progress_reset` | Monitor local reset usage | none |

## Live Umami setup

The current session has no connected Umami connector or dashboard URL, so I did not claim that live goals were configured. In the Umami website settings, create goals using the event names above. The most useful initial goals are `learning_game_complete`, `certificate_share`, `learning_feedback` and `learning_game_start`. Filter reports by the `game` property to compare Prompt Detective, Fact Check Quest and AI Safety Lab. If the project later receives a connected Umami dashboard, verify one real event from each game before relying on the reports.

## Student-testing protocol

Recruit five to ten students across beginner and intermediate AI experience. Ask each tester to complete one assigned game without coaching. Observe whether they understand the instructions, answer choices and feedback without explaining the intended answer. After each session, ask whether the difficulty felt too easy, about right or too hard, and ask them to describe one thing they learned in their own words.

Record only anonymous session codes, game name, completion status, observed confusion point, feedback selection and a short facilitator note. Do not collect names, email addresses, school identifiers or submitted personal data. Treat a question as a revision candidate when multiple learners misunderstand the wording, select an answer for the wrong reason or cannot explain the takeaway. Keep the question’s learning objective unchanged when revising its wording.

## Acceptance thresholds for the next content revision

| Signal | Review threshold |
|---|---:|
| Learners who can explain the key takeaway | Less than 4 of 5 testers |
| Learners completing the session | Less than 4 of 5 testers |
| Same question causes confusion | At least 2 testers |
| Feedback marked “too hard” | At least 40% of testers |
| Feedback marked “too easy” | At least 60% of testers |
