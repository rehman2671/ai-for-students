# Remaining verification gates

The autonomous implementation and QA pass is complete for the current codebase. The following items remain intentionally open because they require evidence that cannot be generated safely by the application or by static tests.

| Gate | Why it remains open | Smallest acceptable evidence |
|---|---|---|
| Independent field-game authorship review | The 25 extension scenarios per field game are transparently labeled `needs-facilitator-review`; static uniqueness does not prove pedagogical quality. | A reviewer marks each game’s extension set approved or supplies scenario IDs for revision. |
| Real student evidence and question revisions | No real learner confusion or difficulty data has been supplied. | Anonymous notes from even a small pilot, without names or emails. |
| Guest-to-account multi-device OAuth | The connected browser session timed out before a safe authenticated migration test could be completed. | One user-run sign-in plus a second browser/device sync observation. |
| Live keyboard verification | Source contracts verify native controls and escape affordances, but static checks cannot prove focus order and screen-reader behavior. | A short keyboard pass using Tab, Enter/Space and Escape on the game hub and one game. |
| External-input checkpoint | This depends on one of the evidence sets above being incorporated. | Save a checkpoint after revisions or test findings are applied. |

No learner identity, email address, verification code or fabricated test result is stored in this document.
