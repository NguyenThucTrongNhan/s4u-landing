# Lead reception API — proposal for separate .NET service

Status: PROPOSED, not an implemented or approved API. Owner confirmed separate .NET service on another VPS (D-01). Do not enable frontend automatic submission until the backend contract and origin are confirmed.

## Candidate endpoint
POST /api/v1/demo-requests, JSON over HTTPS. This path is a proposal only.

Candidate input:
```json
{
  "fullName": "Demo Person",
  "email": "demo@example.com",
  "company": "Demo Organization",
  "product": "document-platform",
  "message": "Need document management",
  "sourcePath": "/products/document-platform"
}
```

Match current frontend limits: fullName 100, email 254, company 160, message 1200 characters. Trim and validate on server; product allowlist lawfirm/document-platform/consulting. Do not accept arbitrary email destinations: recipient is server configuration nhan.nguyen@solution4u.top. No file upload. Do not log message/email bodies or include them in analytics. Retention and persistence remain owner decisions.

## Acceptance semantics to agree
A 2xx acceptance response must mean the service has accepted responsibility for delivery according to its chosen durability mechanism. Decide whether storage/queue is required before selecting 202. Do not return success merely because an in-memory task was started. Provider acceptance is not proof of inbox delivery.

Candidate success envelope: requestId and status=accepted; no customer details echoed. Use consistent problem responses for validation (400), throttling (429 with retry guidance) and temporary unavailability (503). Failure should preserve the user's form contents; duplicate/retry behavior must be specified before integration.

## Hosted readiness
- Confirm backend repo, HTTPS origin, allowed frontend origins and deployment access.
- Configure recipient/sender and provider credentials on server only; verify sender domain and actual mailbox receipt.
- Enforce request size/field validation, abuse controls and delivery limits. CORS is not authentication or spam protection.
- Choose duplicate handling and client retry rules; do not auto-retry non-idempotent requests blindly.
- Decide persistence, retention and deletion responsibilities and update privacy notice before activation.
- Verify valid input, invalid input, provider outage, throttling, duplicate submission and frontend network failure.

Current fallback remains honest email preparation. No provider account, VPS rental, deployment, secret or DNS modification is performed by this proposal.
