# Field-game content audit

Generated for the current AI for Students catalog contract. The audit intentionally distinguishes the five authored baseline scenarios in each field game from the twenty-five extension scenarios that remain flagged for facilitator review.

| Game | Total scenarios | Reviewed baseline | Needs facilitator review | Unique prompts | One correct choice | Topic/skill metadata |
|---|---:|---:|---:|---:|---:|---|
| Bias Buster | 30 | 5 | 25 | 30 | 30/30 | Yes |
| AI Decoder | 30 | 5 | 25 | 30 | 30/30 | Yes |
| Data Detective | 30 | 5 | 25 | 30 | 30/30 | Yes |
| Creative Director | 30 | 5 | 25 | 30 | 30/30 | Yes |
| Code Coach | 30 | 5 | 25 | 30 | 30/30 | Yes |
| Decision Studio | 30 | 5 | 25 | 30 | 30/30 | Yes |
| Tool Matchmaker | 30 | 5 | 25 | 30 | 30/30 | Yes |

## Interpretation

The catalog has **210 field-game scenarios** in total. All prompts are unique within their game, every scenario has exactly one correct choice, and every scenario carries review-status metadata. The 175 extension scenarios are deliberately labeled `needs-facilitator-review` in the source; they are not presented as independently validated content. The companion Vitest contract rechecks these totals and uniqueness constraints on every test run.
