import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { FEATURE_FLAGS } from '../config/feature-flags';

// ---------------------------------------------------------------------------
// MOCK DATA — swap the return values for real Sanity/HTTP calls in Phase 3
// ---------------------------------------------------------------------------
const MOCK_ARTICLES: Article[] = [
  {
    slug: 'apply-ai-smes',
    title: 'How to Apply AI in SMEs Without a Big Budget',
    excerpt:
      'A practical guide for small and medium businesses to leverage AI tools affordably — from chatbots to data analytics.',
    category: 'AI',
    tags: ['AI', 'SME', 'Strategy'],
    featured: true,
    publishedAt: '2026-04-01',
    readTimeMin: 6,
    author: { name: 'Minh Tran', role: 'AI Consultant' },
    content: `
      <h2>Why AI matters for SMEs</h2>
      <p>Artificial Intelligence is no longer the exclusive domain of large enterprises. With the rise of affordable cloud services and open-source tools, small and medium-sized businesses can now harness the power of AI to automate tasks, gain insights, and compete more effectively.</p>

      <h2>Step 1 — Identify repetitive tasks</h2>
      <p>Start by mapping out processes that your team repeats daily: answering customer emails, sorting leads, generating reports. These are the easiest wins for AI automation.</p>

      <h2>Step 2 — Use off-the-shelf AI tools</h2>
      <p>You don't need to build custom models. Tools like ChatGPT, Google Gemini, and Zapier AI can handle a large portion of automation without any coding required.</p>

      <h2>Step 3 — Pilot with one workflow</h2>
      <p>Pick one high-impact, low-risk workflow. Automate it, measure the time saved, and build the business case for expanding AI across the company.</p>

      <h2>Step 4 — Train your team</h2>
      <p>Technology is only half the equation. Invest in short training sessions to help your team understand and trust AI-assisted tools.</p>

      <h2>Conclusion</h2>
      <p>AI adoption for SMEs does not require a massive budget — it requires clarity on where AI adds value and the discipline to start small and scale up.</p>

      <div class="faq-block">
        <h3>FAQ</h3>
        <details><summary>What is the minimum budget to start with AI?</summary><p>You can start for free using tools like ChatGPT Free, Google Gemini, or Microsoft Copilot. Paid tiers start from $20/month.</p></details>
        <details><summary>Do I need a technical team?</summary><p>No. Many modern AI tools are no-code or low-code and can be used by non-technical staff.</p></details>
      </div>
    `,
    seo: {
      metaTitle: 'How to Apply AI in SMEs Without a Big Budget | AI Solutions',
      metaDescription:
        'Practical steps for small and medium businesses to adopt AI affordably — automation, tools, and team training.',
      keywords: 'AI for SME, affordable AI, AI automation small business',
    },
  },
  {
    slug: 'cloud-architecture-startups-2026',
    title: 'Best Cloud Architecture for Startups in 2026',
    excerpt:
      'Comparing AWS, GCP, and Azure for early-stage startups — cost, speed, and scalability breakdown.',
    category: 'Cloud',
    tags: ['Cloud', 'AWS', 'GCP', 'Architecture'],
    featured: true,
    publishedAt: '2026-03-20',
    readTimeMin: 8,
    author: { name: 'Linh Nguyen', role: 'Cloud Architect' },
    content: `
      <h2>Choosing your cloud provider</h2>
      <p>For startups, the choice of cloud provider has long-term implications on cost, developer velocity, and ecosystem lock-in. This guide compares the three major providers in 2026.</p>

      <h2>AWS — The safe default</h2>
      <p>AWS remains the most feature-rich platform with the largest community. Best for: teams with prior AWS experience or those needing a broad service catalogue.</p>

      <h2>Google Cloud (GCP) — AI-first advantage</h2>
      <p>GCP leads in AI/ML tooling with Vertex AI, BigQuery, and Gemini integrations built natively. Best for: AI-focused startups.</p>

      <h2>Azure — Enterprise integrations</h2>
      <p>Azure wins when your customers are enterprises using Microsoft 365. Best for: B2B SaaS targeting corporate customers.</p>

      <h2>Recommended starter architecture</h2>
      <p>For most startups we recommend: <strong>Vercel (frontend) + Railway or Render (backend) + Supabase (database)</strong>. Zero DevOps overhead, scales to tens of thousands of users.</p>

      <h2>When to move to a full cloud provider</h2>
      <p>Once you reach $10k MRR or 50k MAU — at that point the savings from optimizing directly on AWS/GCP justify the operational complexity.</p>
    `,
    seo: {
      metaTitle: 'Best Cloud Architecture for Startups in 2026 | AI Solutions',
      metaDescription:
        'AWS vs GCP vs Azure for startups — an honest breakdown of cost, speed, and scalability for 2026.',
      keywords: 'cloud architecture startup, AWS GCP Azure comparison, cloud for startups 2026',
    },
  },
  {
    slug: 'digital-transformation-guide',
    title: 'Digital Transformation: A Step-by-Step Guide for Traditional Businesses',
    excerpt:
      'How traditional businesses can modernize with AI and cloud — a complete, practical roadmap.',
    category: 'Business',
    tags: ['Digital Transformation', 'Business', 'Strategy'],
    featured: true,
    publishedAt: '2026-03-10',
    readTimeMin: 10,
    author: { name: 'Minh Tran', role: 'AI Consultant' },
    content: `
      <h2>What is digital transformation?</h2>
      <p>Digital transformation is the process of integrating digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers.</p>

      <h2>Phase 1 — Audit your current processes</h2>
      <p>Document every core business process. Identify which are manual, paper-based, or disconnected. This audit becomes your transformation backlog.</p>

      <h2>Phase 2 — Digitize core operations</h2>
      <p>Move from spreadsheets and paper to digital systems. Start with CRM, inventory, and financial management tools.</p>

      <h2>Phase 3 — Connect your data</h2>
      <p>Isolated systems create blind spots. Integrate your tools so data flows automatically — from sales to finance to operations.</p>

      <h2>Phase 4 — Automate with AI</h2>
      <p>Once your processes are digital and your data is connected, AI can generate insights, automate repetitive tasks, and predict outcomes.</p>

      <h2>Phase 5 — Build a data culture</h2>
      <p>Technology is only an enabler. Train teams to use data in daily decisions and measure what matters.</p>
    `,
    seo: {
      metaTitle: 'Digital Transformation Guide for Traditional Businesses | AI Solutions',
      metaDescription:
        'Step-by-step digital transformation roadmap — audit, digitize, connect, automate, and build a data culture.',
      keywords: 'digital transformation, business modernization, AI transformation guide',
    },
  },
  {
    slug: 'angular-ssr-seo-guide',
    title: 'Angular SSR + SEO: Complete Setup Guide for 2026',
    excerpt:
      'How to configure Angular Universal SSR for perfect Google and AI search engine rankings.',
    category: 'Tutorial',
    tags: ['Angular', 'SSR', 'SEO', 'Tutorial'],
    publishedAt: '2026-02-28',
    readTimeMin: 7,
    author: { name: 'Linh Nguyen', role: 'Cloud Architect' },
    content: `
      <h2>Why SSR matters for SEO</h2>
      <p>Single Page Applications (SPA) are problematic for search engine crawlers. With SSR, your server sends fully-rendered HTML — making every page instantly indexable.</p>

      <h2>Angular 17+ SSR setup</h2>
      <p>Angular 17 ships with SSR support built in. Create a new project with: <code>ng new my-app --ssr</code></p>

      <h2>Dynamic meta tags</h2>
      <p>Use Angular's <code>Meta</code> and <code>Title</code> services to update page metadata on every route change — including Open Graph and Twitter Card tags.</p>

      <h2>JSON-LD structured data</h2>
      <p>Inject JSON-LD schemas (Organization, Article, Course) into the document head to help AI engines understand your content.</p>

      <h2>Sitemap & robots.txt</h2>
      <p>Expose <code>/sitemap.xml</code> and <code>/robots.txt</code> from your server routes to ensure full crawl coverage.</p>
    `,
    seo: {
      metaTitle: 'Angular SSR + SEO Complete Setup Guide 2026 | AI Solutions',
      metaDescription:
        'Configure Angular Universal SSR for perfect SEO — meta tags, structured data, sitemap, and robots.txt.',
      keywords: 'Angular SSR SEO, Angular Universal, Angular meta tags, JSON-LD Angular',
    },
  },
  {
    slug: 'aeo-ai-engine-optimization',
    title: 'AEO: How to Make Your Website Visible to AI Tools Like ChatGPT',
    excerpt:
      'AI Engine Optimization (AEO) is the new SEO. Learn how to structure your content so AI tools recommend your brand.',
    category: 'AI',
    tags: ['AEO', 'SEO', 'AI', 'Content Strategy'],
    publishedAt: '2026-04-05',
    readTimeMin: 5,
    author: { name: 'Minh Tran', role: 'AI Consultant' },
    content: `
      <h2>What is AEO?</h2>
      <p>AEO — AI Engine Optimization — is the practice of structuring your website content so that AI tools like ChatGPT, Google AI Overview, and Perplexity understand and recommend your brand.</p>

      <h2>Key AEO techniques</h2>
      <p>1. Use JSON-LD structured data (Organization, Article, Course, FAQ schemas)<br>
         2. Write clear, authoritative content that directly answers questions<br>
         3. Build topical authority by covering your niche deeply<br>
         4. Use FAQ sections on key pages<br>
         5. Ensure your site is fast and mobile-friendly</p>

      <h2>Why AEO matters now</h2>
      <p>Over 30% of Google searches in 2026 are answered by AI-generated summaries. If your content is not structured for AI consumption, you are invisible to this growing traffic source.</p>

      <h2>Getting started</h2>
      <p>Start by adding <code>Organization</code> JSON-LD to your homepage and <code>BlogPosting</code> to every article. Then focus on writing content that answers specific, high-intent questions your customers are asking AI.</p>
    `,
    seo: {
      metaTitle: 'AEO: Make Your Website Visible to ChatGPT & AI Tools | AI Solutions',
      metaDescription:
        'Learn AI Engine Optimization (AEO) — how to structure content so ChatGPT, Google AI, and Perplexity recommend your brand.',
      keywords: 'AEO, AI engine optimization, ChatGPT SEO, AI content strategy',
    },
  },
  {
    slug: 'dotnet-clean-architecture-2026',
    title: '.NET 8 Clean Architecture: The Right Way to Structure Your API',
    excerpt:
      'A complete guide to building maintainable, testable .NET 8 Web APIs using Clean Architecture principles.',
    category: 'Tutorial',
    tags: ['.NET', 'Clean Architecture', 'API', 'Tutorial'],
    publishedAt: '2026-02-15',
    readTimeMin: 9,
    author: { name: 'Linh Nguyen', role: 'Cloud Architect' },
    content: `
      <h2>What is Clean Architecture?</h2>
      <p>Clean Architecture separates your application into concentric layers — each depending only inward. The result is code that is easy to test, maintain, and extend.</p>

      <h2>Layer structure</h2>
      <p><strong>Domain</strong> — Entities, value objects, domain events. No dependencies.<br>
         <strong>Application</strong> — Use cases, interfaces, DTOs. Depends on Domain.<br>
         <strong>Infrastructure</strong> — EF Core, external services. Implements Application interfaces.<br>
         <strong>API</strong> — Controllers, middleware. Depends on Application.</p>

      <h2>Why it matters for SaaS</h2>
      <p>SaaS applications evolve constantly. Clean Architecture lets you swap out databases, add new payment providers, or change API frameworks without touching your business logic.</p>

      <h2>Getting started</h2>
      <p>Create four projects: <code>MyApp.Domain</code>, <code>MyApp.Application</code>, <code>MyApp.Infrastructure</code>, <code>MyApp.Api</code>. Reference them inward only.</p>
    `,
    seo: {
      metaTitle: '.NET 8 Clean Architecture Guide 2026 | AI Solutions',
      metaDescription:
        'Structure your .NET 8 Web API with Clean Architecture — domain, application, infrastructure, and API layers explained.',
      keywords: '.NET clean architecture, .NET 8 API structure, clean architecture tutorial',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    if (FEATURE_FLAGS.useRealApi) {
      // Replace with your real API endpoint
      return this.http.get<Article[]>('/api/articles');
    }
    return of(MOCK_ARTICLES);
  }

  getBySlug(slug: string): Observable<Article | undefined> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Article>(`/api/articles/${slug}`);
    }
    return of(MOCK_ARTICLES.find((a) => a.slug === slug));
  }

  getByCategory(category: string): Observable<Article[]> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Article[]>(`/api/articles?category=${encodeURIComponent(category)}`);
    }
    if (category === 'All') return this.getAll();
    return of(MOCK_ARTICLES.filter((a) => a.category === category));
  }

  getFeatured(): Observable<Article[]> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Article[]>(`/api/articles?featured=true`);
    }
    return of(MOCK_ARTICLES.filter((a) => a.featured));
  }

  getAllSlugs(): string[] {
    // Only used in FE for routing, not needed for BE
    return MOCK_ARTICLES.map((a) => a.slug);
  }
}
