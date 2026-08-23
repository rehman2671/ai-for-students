# Hybrid Guest/Login E2E Verification

## Automated coverage completed

The Vitest suite covers protected progress access, invalid progress input, guest expiry, stronger-account merge preservation and stronger-guest merge acceptance. The production build and TypeScript check pass.

## Manual browser checklist

| Scenario | Steps | Expected result | Status |
|---|---|---|---|
| Guest play | Open `/play` without signing in, complete a game, refresh `/progress` | Local score and badge remain available | Ready for user run |
| Guest retention | Set `ai-students-guest-session` to an ISO timestamp older than 90 days, open `/progress` | Local progress is cleared and the dashboard starts empty | Ready for user run |
| Login prompt | Click `Save progress` as a guest | OAuth flow starts without blocking guest play | Ready for user run |
| Migration | Complete guest progress, sign in, open `/progress` | Server merge preserves the stronger value and dashboard remains populated | Requires real OAuth session |
| Logout | Click `Log out`, revisit `/progress` | Guest wording appears and no protected data is shown | Requires real OAuth session |
| Multi-device | Sign in from a second browser/device and open `/progress` | Account progress is available on the second device | Requires second session/device |
| Conflict safety | Use an account with a higher score, then migrate a stale lower-score guest session | Account score does not decrease | Covered by merge unit test; browser confirmation pending |

No names, emails, free-text answers or learner identity should be entered in the testing notes. Record only scenario, pass/fail, browser/device class and an optional defect description.
