# Landing decisions and remaining delivery plan

Confirmed by owner, 2026-10-25 (Asia/Ho_Chi_Minh).

| ID | Decision | Status |
|---|---|---|
| D-01 | Automated form reception will use a separate .NET backend service hosted on another VPS. Do not implement a Vercel serverless email backend. | ACCEPTED |
| D-02 | Lead recipient: nhan.nguyen@solution4u.top. Address approved; actual receipt is not yet verified. | ACCEPTED |
| D-05 | Article author display name: Nguyễn Thúc Trọng Nhân. Drafts require content approval before publication. | ACCEPTED |

## Deferred debt — target review 2026-10-26 through 2026-11-01

The owner deferred these items to next week. This is a planning target, not a scheduled automation or approval of any provider/configuration.

| ID | Debt | Exit criterion |
|---|---|---|
| D-03 | Domain selection/configuration, DNS and redirects | Confirm canonical domain and DNS owner; preserve mail records; verify TLS and redirects before enabling final canonical/sitemap URLs. No DNS change now. |
| D-04 | Analytics provider, cost and configuration | Owner selects provider/budget; event schema excludes form contents; update privacy information before activation. No analytics enabled now. |
| D-06 | Product screenshots and publication rights | Obtain real screenshots with demo data, inspect for sensitive information, confirm publication permission, then add accessible images. No customer name/logo/screenshots published now. |

## Next implementation sequence

1. Verify current Vercel deployment, public routes and desktop/mobile user flows; fix material regressions.
2. Complete SEO that does not require the deferred canonical-domain decision. Keep final domain-specific metadata/sitemap activation pending D-03.
3. Prepare three Vietnamese article drafts under the approved author name; do not publish until approved.
4. Prepare frontend/backend API contract proposal for review, then implement form integration when the .NET endpoint and hosted configuration exist.
5. Resume D-03/D-04/D-06 next week, then perform final hosted acceptance.

## .NET form integration dependencies

The separate backend is a confirmed architecture choice. Its repository, API origin, endpoint contract, deployment access, persistence/retention rules and mail delivery configuration have not been supplied or approved.

Before enabling automatic submission, agree request/response and validation rules, permitted frontend origins, spam/rate controls, duplicate handling, delivery semantics, error states and secret management. Keep secrets server-side. Only acknowledge acceptance when the backend actually accepts the request; do not equate provider acceptance with inbox delivery.

Until then, keep the existing honest mailto preparation flow. It does not send or store a lead through an API. No new VPS rental, backend deployment, provider subscription or DNS change is performed by recording these decisions.
