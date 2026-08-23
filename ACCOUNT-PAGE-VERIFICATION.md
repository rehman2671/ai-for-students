# Account Page Verification

## Verification matrix

| Scenario | Expected behavior | Evidence/status |
|---|---|---|
| Guest view | Page explains sign-in while preserving guest access; sign-in button starts OAuth from an event handler | Implemented; route and code reviewed |
| Authenticated view | Shows private-data explanation and account actions | Verified visually on `/account` with authenticated session |
| Export loading | Export button remains disabled while saved progress loads; loading message is visible | Implemented in `AccountPage.tsx` |
| Export empty | Empty account shows a clear no-progress message; export remains unavailable until data exists | Verified in authenticated visual capture |
| Export error | Retry action is shown and no misleading download is offered | Implemented in `AccountPage.tsx` |
| Export success | JSON file downloads and a success toast confirms readiness | Implemented; protected procedure covered by access test |
| Delete confirmation | Browser confirmation is required before destructive action | Implemented and reviewed in code |
| Delete pending | Delete button is disabled and shows `Deleting…` during mutation | Implemented in `AccountPage.tsx` |
| Delete success | Success toast appears, session logs out and user returns home | Implemented in mutation success handler |
| Delete failure | Error toast and inline explanation keep the account active | Implemented in mutation error handler |

Automated evidence: 8 Vitest tests pass, including protected export/deletion access, guest expiry and server merge safety. TypeScript check and production build pass. Visual evidence confirms the authenticated empty-state account page and the guest progress page.

User-assisted checks still required: run one export and one deletion using a disposable test account, then repeat guest migration in a second browser/device. No real learner identity or sensitive data should be entered in test notes.
