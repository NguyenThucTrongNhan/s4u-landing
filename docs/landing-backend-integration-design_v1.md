# Landing Page Backend Integration — Technical Design v1

**Document:** `landing-backend-integration-design_v1.md`  
**Version:** 1.0  
**Date:** 2026-04-09  
**Status:** Draft  
**Author:** AI Solutions Engineering

---

## 1. Context & Problem Statement

When a visitor completes the registration form on the landing page they select a target application (AI Bot, ERP, SME, CRM, UMS, DMS) and submits their account details. The system must:

- Persist the registration request durably
- Trigger a chain of downstream actions (email confirmation, tenant provisioning, sales/admin notifications) without blocking the HTTP response
- Scale independently of the operational application databases

---

## 2. Database Decision: Separate vs. Shared

### Recommendation: **Separate `landing_db` (PostgreSQL)**

| Concern | Shared App DB | ✅ Separate Landing DB |
|---|---|---|
| **Isolation** | Landing traffic/spikes affect app DBs | Fully isolated |
| **Security** | Landing API has access to production data | Zero access to ERP/SME data |
| **Schema coupling** | Register form changes break app schema | Independent evolution |
| **Multi-app routing** | Which DB do you write to? (ERP or SME?) | One neutral prospect registry |
| **GDPR / consent** | Mixed with operational data | Clean, auditable trail |
| **Tenant provisioning** | Circular dependency | Event triggers provisioning asynchronously |

> **Rule of thumb:** The landing DB holds *prospects before they are customers*. Once provisioned, operational data lives in the selected app's own database.

---

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  Angular SSR  (Vercel)                                          │
│  POST /api/register                                             │
│  Body: { appId, fullName, company, email, phone, password }     │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  LandingPage.API  (.NET 8 · Railway)                           │
│                                                                 │
│  RegisterCustomerCommandHandler:                                │
│    1. Validate + idempotency check (email + appId)              │
│    2. Hash password (bcrypt)                                    │
│    3. BEGIN TRANSACTION                                         │
│       INSERT registrations (status = PENDING)                   │
│       INSERT outbox_messages (published = false)                │
│    4. COMMIT                                                    │
│    5. Return 202 Accepted + registrationId                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │  Outbox Worker        │
                    │  (polls every 5s)     │
                    │  Publishes unpublished │
                    │  messages to broker   │
                    └───────────┬───────────┘
                                │ AMQP
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│  RabbitMQ  (CloudAMQP — free tier)                             │
│  Exchange: customer.registered  (fanout)                        │
└──┬────────────┬────────────┬────────────┬───────────────────────┘
   │            │            │            │
   ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────────┐
│  Email   │ │ App Init │ │  Sales   │ │  Admin / Owner       │
│  Confirm │ │ Consumer │ │  Notify  │ │  Notify              │
└──────────┘ └────┬─────┘ └──────────┘ └──────────────────────┘
                  │
                  ▼
        Calls target app's
        /api/tenants/provision
        → Creates org, trial plan,
          seeds admin user account
```

---

## 4. Message Event Schema

### `CustomerRegisteredEvent`

```json
{
  "registrationId": "550e8400-e29b-41d4-a716-446655440000",
  "appId": "erp",
  "fullName": "John Doe",
  "company": "Acme Corp",
  "email": "john@acme.com",
  "phone": "+84946893919",
  "registeredAt": "2026-04-09T07:00:00Z",
  "source": "landing-page"
}
```

> `appId` valid values: `ai-bot` | `erp` | `sme` | `crm` | `ums` | `dms`

---

## 5. Consumers & Responsibilities

| # | Consumer | Queue | Action | Failure Strategy |
|---|---|---|---|---|
| 1 | **EmailConfirmationConsumer** | `email-confirm` | Send branded confirmation email via SendGrid with verify link and app name | Retry 3× with exponential backoff → dead-letter queue |
| 2 | **AppInitConsumer** | `app-init` | Call target app's `/api/tenants/provision` — create org, trial plan, seed admin user | Retry 5× → dead-letter queue → alert admin |
| 3 | **SalesNotificationConsumer** | `sales-notify` | Email/Slack to sales team: "New lead: Acme Corp → ERP" | Best-effort, log failure only |
| 4 | **AdminNotificationConsumer** | `admin-notify` | Telegram/email to owner, create entry in internal ops dashboard | Best-effort, log failure only |
| 5 | **OnboardingStatusConsumer** | `onboarding-status` | Subscribes to app init completion event → update `registrations.status = PROVISIONED` | Retry 3× |

---

## 6. Critical Pattern: Transactional Outbox

### Problem

If the API saves to the database but the message broker is temporarily unavailable, the event is lost and downstream consumers never trigger.

### Solution

Write the event to an `outbox_messages` table **inside the same database transaction** as the registration record. A background worker polls and forwards pending messages to RabbitMQ.

```
BEGIN TRANSACTION
  INSERT INTO registrations (...)          -- prospect record
  INSERT INTO outbox_messages (            -- event envelope
    event_type = 'CustomerRegistered',
    payload    = '{ ... }',
    published  = false
  )
COMMIT

-- Background worker (IHostedService, runs every 5 seconds):
  SELECT * FROM outbox_messages WHERE published = false ORDER BY created_at
  FOR EACH message:
    → Publish to RabbitMQ exchange
    → UPDATE outbox_messages SET published = true, published_at = NOW()
```

This guarantees **at-least-once delivery** — if the broker is down, the message waits in the DB. The worker retries until it succeeds.

---

## 7. Database Schema (`landing_db`)

### `registrations`

| Column | Type | Notes |
|---|---|---|
| `id` | `UUID` PK | |
| `app_id` | `VARCHAR(20)` | `ai-bot`, `erp`, `sme`, `crm`, `ums`, `dms` |
| `full_name` | `VARCHAR(255)` | |
| `company` | `VARCHAR(255)` | |
| `email` | `VARCHAR(255)` | UNIQUE, indexed |
| `phone` | `VARCHAR(30)` | nullable |
| `password_hash` | `VARCHAR(255)` | bcrypt — temporary until user provisioned |
| `status` | `ENUM` | `PENDING` → `EMAIL_SENT` → `PROVISIONING` → `ACTIVE` → `FAILED` |
| `created_at` | `TIMESTAMPTZ` | |
| `updated_at` | `TIMESTAMPTZ` | |

### `registration_attempts`

| Column | Type | Notes |
|---|---|---|
| `id` | `UUID` PK | |
| `idempotency_key` | `VARCHAR(255)` | UNIQUE — `hash(email + appId)` |
| `registration_id` | `UUID` FK | → `registrations.id` |
| `created_at` | `TIMESTAMPTZ` | |

### `outbox_messages`

| Column | Type | Notes |
|---|---|---|
| `id` | `UUID` PK | |
| `event_type` | `VARCHAR(100)` | e.g. `CustomerRegistered` |
| `payload` | `JSONB` | full event envelope |
| `published` | `BOOLEAN` | default `false` |
| `published_at` | `TIMESTAMPTZ` | nullable |
| `created_at` | `TIMESTAMPTZ` | |

---

## 8. Technology Stack

| Component | Technology | Rationale |
|---|---|---|
| Backend API | .NET 8 Minimal API | Consistent with app services |
| ORM | EF Core 8 + Npgsql | PostgreSQL-native, migrations |
| Message bus abstraction | MassTransit | .NET-native, retry/saga/outbox built-in |
| Broker | RabbitMQ (CloudAMQP) | Free tier (1M msg/month), AMQP standard |
| Email | SendGrid | Free 100 emails/day, templating |
| Password hashing | BCrypt.Net-Next | Industry standard |
| Background worker | `IHostedService` | Outbox poller, same Railway dyno |

### Why MassTransit + RabbitMQ over alternatives

| Option | Verdict | Reason |
|---|---|---|
| MassTransit + RabbitMQ | ✅ **Chosen** | .NET-native, retry/saga/outbox, CloudAMQP free |
| Azure Service Bus | ⚠️ Pass | Managed but costs money, Azure vendor lock-in |
| Redis Pub/Sub | ❌ No | No message durability, no retry |
| Kafka | ❌ No | Massive overkill, heavy ops overhead |
| Direct HTTP chain | ❌ No | Tight coupling, single cascade failure point |

---

## 9. .NET 8 Project Structure

```
backend/
├── LandingPage.API/
│   ├── Program.cs
│   ├── Endpoints/
│   │   └── RegisterEndpoint.cs
│   └── appsettings.json
│
├── LandingPage.Application/
│   ├── Commands/
│   │   ├── RegisterCustomerCommand.cs
│   │   └── RegisterCustomerHandler.cs
│   ├── Events/
│   │   └── CustomerRegisteredEvent.cs
│   └── Consumers/
│       ├── EmailConfirmationConsumer.cs
│       ├── AppInitConsumer.cs
│       ├── SalesNotificationConsumer.cs
│       ├── AdminNotificationConsumer.cs
│       └── OnboardingStatusConsumer.cs
│
├── LandingPage.Domain/
│   ├── Registration.cs
│   └── RegistrationStatus.cs
│
└── LandingPage.Infrastructure/
    ├── Persistence/
    │   ├── LandingDbContext.cs
    │   └── Migrations/
    ├── Messaging/
    │   └── OutboxWorker.cs
    └── Email/
        └── SendGridEmailService.cs
```

---

## 10. API Contract

### `POST /api/register`

**Request body:**

```json
{
  "appId":      "erp",
  "fullName":   "John Doe",
  "company":    "Acme Corp",
  "email":      "john@acme.com",
  "phone":      "+84946893919",
  "password":   "********"
}
```

**Response `202 Accepted`:**

```json
{
  "registrationId": "550e8400-e29b-41d4-a716-446655440000",
  "status":         "PENDING",
  "message":        "Registration received. Check your email to confirm."
}
```

**Response `409 Conflict`** (duplicate email + appId):

```json
{
  "error": "ALREADY_REGISTERED",
  "message": "An account for this email and application already exists."
}
```

---

## 11. Deployment & Cost

| Service | Platform | Estimated Cost |
|---|---|---|
| LandingPage.API (.NET 8) | Railway | ~$5/month |
| `landing_db` (PostgreSQL) | Railway | ~$5/month |
| RabbitMQ | CloudAMQP (free tier) | Free (1M msg/month) |
| Email sending | SendGrid (free tier) | Free (100 emails/day) |
| Outbox background worker | Included in API dyno | $0 extra |
| **Total** | | **~$10/month** |

---

## 12. Implementation Order (Phase 1)

| Step | Task |
|---|---|
| 1 | Scaffold `LandingPage.API` — Minimal API, EF Core, PostgreSQL |
| 2 | Implement `RegisterCustomerCommand` + handler (save + idempotency) |
| 3 | Add `outbox_messages` table + `OutboxWorker` (IHostedService) |
| 4 | Wire MassTransit + CloudAMQP RabbitMQ |
| 5 | Implement `EmailConfirmationConsumer` (SendGrid) |
| 6 | Implement `AppInitConsumer` (calls target app `/api/tenants/provision`) |
| 7 | Implement `SalesNotificationConsumer` + `AdminNotificationConsumer` |
| 8 | Connect Angular register form → `POST /api/register` |
| 9 | Deploy to Railway, configure env vars, smoke test |

---

## 13. Open Questions / Decisions Needed

| # | Question | Options |
|---|---|---|
| 1 | Does each app (ERP, SME, CRM...) expose a provisioning API now, or does `AppInitConsumer` just email the admin to provision manually? | Auto-provision vs. Manual for v1 |
| 2 | Email confirmation link — where does it redirect? (`/app/verify?token=...`) | Need verify endpoint design |
| 3 | Sales notification channel — email only, or also Slack/Telegram? | Confirm channels |
| 4 | Password: store in `landing_db` until provisioned, then migrate to app DB? Or require re-set on first login? | Security tradeoff |
| 5 | Trial plan duration per app? | Business decision |
