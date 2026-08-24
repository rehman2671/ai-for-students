# Verification notes

The game hub and progress dashboard were captured at a 390×844 mobile viewport. The discovery controls stack cleanly and remain reachable; the twelve-game switcher remains visible and the progress cards render with 30-item totals. The visual pass also exposed an outdated Prompt Detective “Fifteen cases” label, which was corrected to “Thirty cases.”

The desktop game hub and progress dashboard were previously captured at 1280×720. Automated tests, TypeScript checking and the production build pass after the content expansion. Remaining evidence gaps are the user-assisted OAuth/multi-device journey, real learner difficulty feedback, and independent authorship review of the padded field-game scenarios.

The account page was opened while signed out. It clearly states that guest play remains available and offers a separate Sign in action for cross-device persistence. No runtime error was visible. The sign-in action was not activated because completing OAuth requires user-controlled authentication.

A guest Source Hunt replay opened successfully and showed the first sequence challenge without login. The initial replay exposed a 28-case count, which was corrected by adding two distinct challenges; the source now has a 30-case bank and the direct count test passes. Field-game extensions remain transparently tagged as needing facilitator review rather than being represented as fully reviewed.

The final mobile pass on the Source Hunt route shows the search field, difficulty, age-band, topic and skill controls as separate full-width controls with clear labels and no visible clipping in the initial viewport.

Anti-bias repair checkpoint: added stable identity-based rotation of answer choices to Prompt Detective, Fact Check Quest, AI Safety Lab and all seven field games. The rendered game-hub screenshots for the three core routes show the updated 30-case flows and separate topic/skill controls without layout regressions; answer-position distribution is validated by the new regression test rather than inferred from the hub view.

The anti-bias regression suite now passes 10 tests: all eight choice-based game banks distribute correct answers across positions 0, 1 and 2 with no position exceeding 60%; Prompt Workshop and Source Hunt are verified as sequence games with valid ordered blocks rather than fixed-position multiple-choice quizzes. TypeScript checking and production build also pass after wiring deterministic answer ordering into every choice-based module.

Direct post-fix screenshots confirm answer-position diversity in the three core quiz routes: AI Safety Lab's first correct answer appears as B, Fact Check Quest's as C, and Prompt Detective's first correct answer appears as B. This directly addresses the reported “25/30 by always choosing option one” failure mode.

The new regression explicitly simulates selecting only the first visible answer for every choice-based bank. It passes with a score share below 60% for every bank, alongside full A/B/C position coverage; this is a direct guard against the reported 25/30 shortcut.

Reduced-burden visual pass: /play renders all 12 modules and topic/skill/level/age filters; Safety Lab, Fact Check Quest and Prompt Detective demo routes render 30-case playable views with three visible choices. The post-fix screenshots show Safety's correct option at B, Fact Check's at C and Prompt Detective's at B. No layout or stale fifteen-case copy was found in the source scan.

Self-QA limits: this pass does not fabricate real student difficulty evidence, independent facilitator approval of the pilot field-game extensions, or a second-browser authenticated OAuth migration/sync result. Those require either real participants/reviewers or user-controlled account credentials. Guest routes, demo routes, source contracts, answer ordering, tests, build and visual rendering were verified autonomously.

Stronger anti-pattern visual pass: AI Safety Lab, Fact Check Quest and Prompt Detective all render successfully after switching from fixed rotation to seeded Fisher–Yates ordering. The hub controls remain visible and each route shows three answer choices without layout regressions. Automated tests now include same-round stability, new-round variation, full A/B/C coverage and rejection of the repeating 012 cycle.
