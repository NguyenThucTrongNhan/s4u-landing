# Project Requirements: AI SaaS + Content Platform

## What You're Building

A **hybrid digital platform** that combines company branding, SEO content, AI/Cloud education, and a SaaS product — all in one ecosystem.

---

## Core Business Domains

| # | Domain | Purpose |
|---|--------|---------|
| 1 | Company Introduction | Branding, trust, consulting services |
| 2 | Article / Content Hub | SEO traffic engine — AI, Tech, Business articles |
| 3 | Courses / Training | AI, Cloud, technical training & certification |
| 4 | SaaS Products | Demo, registration, subscriptions, payments |
| + | Lead Management | Capture & convert visitors → paying customers |
| + | MMO / Revenue | Subscriptions, consulting, affiliate, course sales |

---

## Tech Stack (Finalized)

| Layer | Tool | Hosting |
|-------|------|---------|
| Frontend | Angular 17+ (SSR, Standalone) | Vercel (free) |
| Backend | .NET 8 Web API (Clean Architecture) | Railway (~$5/mo) |
| Database | PostgreSQL | Railway |
| CMS | Sanity (Phase 1) | Managed (free tier) |
| Payment | Stripe | — |

---

## Architecture

```
User Browser
   ↓
yourcompany.com → Vercel (Angular SSR)
   ↓
api.yourcompany.com → Railway (.NET API)
   ├── Auth / Users
   ├── Leads / CRM
   ├── Courses
   ├── Subscription / Payment
   └── Products
   ↓
PostgreSQL (Railway)
   +
Sanity CMS → Articles / SEO content
```

---

## Frontend Structure (Angular 17 Standalone)

```
src/
 ├── app/
 │   ├── core/              # auth, services, interceptors
 │   ├── shared/            # reusable components
 │   ├── features/
 │   │    ├── landing/
 │   │    ├── articles/
 │   │    ├── courses/
 │   │    ├── products/
 │   │    ├── auth/
 │   │    └── dashboard/
 │   ├── layouts/
 │   └── app.routes.ts
```

### Route Design (SEO-Friendly)

| Route | Page |
|-------|------|
| `/` | Landing / Home |
| `/about` | Company Introduction |
| `/articles` | Article List |
| `/articles/:slug` | Article Detail |
| `/courses` | Course List |
| `/products` | Product Showcase |
| `/pricing` | Subscription Plans |
| `/demo` | Demo Booking |

---

## Core Features

### 1. Landing Page (Conversion Focus)
- Hero section with clear value proposition
- Trust signals (clients, stats)
- Services overview (AI / Cloud / Consulting)
- CTA buttons (Register / Book Demo)
- Structured data: `Organization` JSON-LD

### 2. Article / Content Hub (SEO Engine)
- Categories: AI / Tech / Business
- Tags, Author profiles, Related articles
- Table of contents, FAQ sections
- Structured data: `BlogPosting` JSON-LD
- Supports 1,000+ articles with pagination

### 3. Courses / Training
- Course listing and detail pages
- Enroll / register flow
- Future: video player, progress tracking, certificates

### 4. SaaS Product Showcase
- Product listing with descriptions
- Demo request form
- Pricing / subscription plans
- CTA to register or subscribe

### 5. Authentication & Dashboard
- Register / Login (JWT)
- Social login (Google — future)
- User dashboard
- Subscription management

### 6. Lead Management (CRM)
- Collect: name, email, phone, interest, source
- Track lead status: Cold → Warm → Hot
- Sources: contact form, demo request, newsletter, course signup
- API: `POST /api/leads`

### 7. Subscription & Payment (Stripe)
- Plans: Free → Basic → Pro → Enterprise
- Feature access control by plan
- Payment history
- Webhook handling

---

## Backend Modules (.NET 8)

| Module | Responsibility |
|--------|---------------|
| Auth | JWT, registration, login |
| Leads | CRM, lead capture, status tracking |
| Courses | Course logic, enrollment, progress |
| Subscription | Plans, feature gating, renewal |
| Payment | Stripe integration, webhooks |
| Products | Product catalog, demo requests |

---

## CMS (Sanity)

Used for all **content & marketing** (not business logic):
- Articles / Blog posts
- Landing page content blocks
- SEO metadata (meta title, description, OG tags)
- FAQ content
- Static pages (About, Contact)

---

## SEO + AEO Strategy

### SEO (Google)
- Angular SSR (server-side rendering)
- Dynamic meta tags per page
- `sitemap.xml` and `robots.txt`
- Clean URL slugs

### AEO (AI Engine Optimization)
Structured data (JSON-LD) to help AI tools (ChatGPT, Google AI) understand and recommend the platform:

```json
// Organization
{ "@type": "Organization", "name": "Your Company", "url": "https://yourcompany.com" }

// Article
{ "@type": "BlogPosting", "headline": "AI Trends 2026", "author": "..." }

// Course
{ "@type": "Course", "name": "AI for Business" }
```

---

## Revenue Streams (MMO)

| Stream | Description |
|--------|-------------|
| SaaS Subscriptions | Main revenue — monthly/annual plans |
| Course Sales | AI, Cloud, technical training |
| Lead → Consulting | High-value client services |
| Content → Affiliate | SEO articles driving product upsells |

### Conversion Funnel
```
SEO Article
   ↓
Free Value (content, demo)
   ↓
Email / Lead Capture
   ↓
Course or Demo
   ↓
Subscription / Payment
```

---

## Deployment & Domain Setup

| Service | URL | Hosting |
|---------|-----|---------|
| Frontend | `yourcompany.com` | Vercel |
| Backend API | `api.yourcompany.com` | Railway |

- Vercel → auto SSL, CDN, GitHub auto-deploy
- Railway → auto SSL, PostgreSQL plugin included
- Domain DNS: A record for root → Vercel; CNAME `api` → Railway

---

## Development Roadmap

### Phase 1 — Foundation (1–2 weeks)
- [ ] Angular 17 SSR project setup
- [ ] Landing page with hero, services, CTA
- [ ] Basic routing structure
- [ ] Deploy to Vercel + Railway

### Phase 2 — Content Engine (2–3 weeks)
- [ ] Sanity CMS setup + content schema
- [ ] Article list & detail pages
- [ ] SEO metadata + JSON-LD structured data
- [ ] Sitemap + robots.txt

### Phase 3 — Business Features (2–4 weeks)
- [ ] Auth (register/login, JWT)
- [ ] Lead capture forms
- [ ] Course list & detail
- [ ] Product showcase
- [ ] Stripe subscription & payment

### Phase 4 — Growth (later)
- [ ] AI-driven content recommendations
- [ ] Analytics dashboard
- [ ] Email marketing automation
- [ ] Microservices expansion
- [ ] API Gateway (nginx / YARP)

---

## Cost Summary

| Service | Cost |
|---------|------|
| Vercel (Frontend) | $0 |
| Railway (API + DB) | ~$5/month |
| Sanity (CMS) | $0 (free tier) |
| Domain | ~$10/year |
| **Total** | **~$5/month** |
