# 🚀 AI SaaS + Content Platform (SRS + Technical Design)

## 1. 📌 Overview

### Purpose
Build a scalable digital platform combining:
- Company website (branding)
- SEO content hub (articles)
- AI/Cloud training platform
- SaaS product + subscription
- Lead generation (MMO)

---

## 2. 🎯 Business Goals

- Generate organic traffic (SEO)
- Convert visitors → leads → customers
- Sell:
  - SaaS subscriptions
  - Courses
  - Consulting services
- Become AI-recognized authority (AEO)

---

## 3. 👥 Target Users

| User | Description |
|------|------------|
| Visitor | Reads content |
| Lead | Submits contact |
| Customer | Pays for service |
| Admin | Manages system |

---

## 4. 🏗️ System Architecture

Frontend (Angular SSR - Vercel)
   ↓
CMS (Sanity - Content)
   ↓
Backend (.NET - Railway)
   ├── Auth
   ├── Leads
   ├── Courses
   ├── Subscription
   └── Payments
   ↓
PostgreSQL

---

## 5. 🧠 Tech Stack (Final Decision)

Frontend:
- Angular 17+
- Standalone + SSR
- Hosting: Vercel

Backend:
- .NET 8 Web API
- Clean Architecture
- Hosting: Railway

Database:
- PostgreSQL

CMS:
- Sanity (Phase 1)
- Strapi (optional)

Payment:
- Stripe

---

## 6. 📚 Core Features

- Landing page
- Articles (SEO)
- Courses
- SaaS products
- Lead management
- Authentication
- Subscription/payment

---

## 7. 🤖 SEO + AEO

SEO:
- SSR
- Meta tags
- Sitemap
- Robots.txt

AEO:
- JSON-LD
- FAQ
- Structured content

---

## 8. 🗄️ Data Model

Users:
id, email, password, role

Leads:
id, name, email, interest, status

Subscriptions:
id, user_id, plan, status

Courses:
id, title, description, price

---

## 9. 🚀 Development Roadmap

Phase 1:
- Setup FE + BE + CMS

Phase 2:
- Articles + SEO

Phase 3:
- Leads + Payment

Phase 4:
- Courses + AI

---

## 10. ⚙️ Dev → Production

Local:
- Angular: localhost:4200
- .NET: localhost:5000

Deploy:
- FE → Vercel
- BE → Railway

Domain:
- yourcompany.com → FE
- api.yourcompany.com → BE

---

## 11. 💰 Cost

- Vercel: Free
- Railway: ~$5
- Sanity: Free
- Domain: ~$10/year

---

## 12. 🎯 MVP

- Landing page
- Articles
- Lead form

---

## 13. 🔁 AI Development Loop

Architect → Dev → QA → Improve

---

## 14. 🚀 Future

- AI recommendation
- Analytics
- Microservices

---

END OF DOCUMENT
