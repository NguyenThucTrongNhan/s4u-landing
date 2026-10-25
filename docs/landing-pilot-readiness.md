# Landing pilot readiness

Scope: LAND-001 and LAND-002 plus honest email contact preparation. Published to main with explicit owner authorization on 2026-10-25; broader go-live acceptance remains pending.

Acceptance criteria:
- Public navigation exposes S4U, LawFirm and Document Platform with accurate pilot status.
- Sample clients, performance metrics, testimonials and prices are not published.
- Direct subscription/register/login paths cannot expose simulated payment/account success.
- Product CTA preselects its demo topic. Contact does not claim delivery.
- Unknown routes display not-found content.

Deferred: real form delivery and spam controls, analytics, articles with approved authorship, screenshots, canonical/social assets and SSR/prerender verification, domain/DNS activation. Recipient address approved by the owner on 2026-10-25; actual mailbox receipt remains unverified. Automatic form reception will be a separate .NET service on another VPS. See [decisions and debt](landing-decisions-and-debt.md). Hosting-level HTTP 404 status remains a deployment task.

Deployment: Vercel root directory `frontend`; main is connected to Vercel; hosted acceptance remains pending. Domain and DNS unchanged. Domain, analytics and screenshots deferred to next week by the owner.
