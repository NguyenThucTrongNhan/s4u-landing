# Verification

Baseline remote main: b01de565af3e326875a952d794731704514de1ba.
- npm run build: PASS (existing unused-source warnings).
- npx tsc --project tsconfig.spec.json --noEmit: PASS.
- git diff --check: PASS.
- Routing regression added: listing author, sequential article navigation, product-specific CTA, schema author, unknown article, stale schema removal and recovery.
- Local Karma runtime: NOT RUN, local Chrome unavailable.
- Hosted article acceptance: pending deployment.
- Owner content approval: explicit in conversation on 2026-10-25.
- Mobile, SSR/full SEO, domain and provider-backed form delivery are not certified by this publication.
