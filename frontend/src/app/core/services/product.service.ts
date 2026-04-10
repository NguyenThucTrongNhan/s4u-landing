import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { FEATURE_FLAGS } from '../config/feature-flags';

const MOCK_PRODUCTS: Product[] = [
  {
    slug: 'smart-lead-engine',
    name: 'Smart Lead Engine',
    category: 'SaaS',
    summary: 'AI-powered lead scoring and outreach recommendations for B2B growth teams.',
    priceLabel: 'From $49/month',
    audience: 'Sales and growth teams',
    features: [
      'Predictive lead scoring',
      'Email sequence recommendations',
      'CRM sync with HubSpot and Salesforce',
      'Weekly growth insights dashboard',
    ],
    outcomes: [
      'Increase qualified pipeline by up to 32%',
      'Reduce manual lead triage by 70%',
      'Speed up outreach workflows',
    ],
    descriptionHtml: `
      <h2>Grow pipeline without growing headcount</h2>
      <p>Smart Lead Engine helps revenue teams prioritize the right accounts at the right time. It combines behavioral data, firmographics, and deal history to rank opportunities and suggest next best actions.</p>

      <h2>How teams use it</h2>
      <p>Teams connect their CRM in minutes, choose scoring goals, and launch recommendation workflows. Sales reps get actionable prompts directly in their day-to-day process.</p>

      <h2>Why customers choose this product</h2>
      <p>It is simple to onboard, integrates with existing tools, and provides measurable impact in the first month.</p>
    `,
  },
  {
    slug: 'cloud-cost-optimizer',
    name: 'Cloud Cost Optimizer',
    category: 'Platform',
    summary: 'Continuous cloud spend monitoring with optimization recommendations and guardrails.',
    priceLabel: 'From $99/month',
    audience: 'FinOps and engineering teams',
    features: [
      'Real-time multi-cloud spend visibility',
      'Idle resource and rightsizing detection',
      'Budget alerts and policy rules',
      'Cost anomaly detection',
    ],
    outcomes: [
      'Reduce infrastructure spend by 20-40%',
      'Improve budget predictability',
      'Enable engineering ownership of cloud costs',
    ],
    descriptionHtml: `
      <h2>Control cloud costs without slowing delivery</h2>
      <p>Cloud Cost Optimizer surfaces waste quickly and recommends safe actions your team can execute. It supports AWS, Azure, and GCP with a unified dashboard.</p>

      <h2>Governance made practical</h2>
      <p>Set team budgets, enforce tagging compliance, and track cost per service. Leaders get clarity while developers keep shipping features.</p>
    `,
  },
  {
    slug: 'ai-support-assistant',
    name: 'AI Support Assistant',
    category: 'SaaS',
    summary: '24/7 customer support assistant trained on your docs, tickets, and product data.',
    priceLabel: 'From $79/month',
    audience: 'Customer success and support teams',
    features: [
      'Multi-language support chatbot',
      'Knowledge-base grounded answers',
      'Ticket triage and routing',
      'Escalation to human agents',
    ],
    outcomes: [
      'Deflect up to 60% of tier-1 tickets',
      'Shorten first response time',
      'Improve support CSAT scores',
    ],
    descriptionHtml: `
      <h2>Scale support quality across channels</h2>
      <p>AI Support Assistant resolves common requests instantly and escalates complex cases with full context. Your support team focuses on high-value conversations.</p>

      <h2>Fast setup, strong control</h2>
      <p>Import documentation, connect your helpdesk, and tune answer styles by brand voice. Admin controls ensure safe, compliant responses.</p>
    `,
  },
  {
    slug: 'ai-readiness-workshop',
    name: 'AI Readiness Workshop',
    category: 'Service',
    summary: 'A 2-week consulting package to identify AI use cases, roadmap, and pilot plan.',
    priceLabel: 'Fixed scope package',
    audience: 'Business and technology leaders',
    features: [
      'Executive alignment workshop',
      'Use-case prioritization matrix',
      'Data and architecture assessment',
      '90-day pilot roadmap',
    ],
    outcomes: [
      'Clear AI investment priorities',
      'Faster pilot launches',
      'Lower delivery risk',
    ],
    descriptionHtml: `
      <h2>Turn AI ambition into a practical roadmap</h2>
      <p>Our workshop helps your team move from ideas to execution. You get a concrete plan, stakeholder buy-in, and a scoped pilot with measurable outcomes.</p>

      <h2>Designed for speed and clarity</h2>
      <p>In two weeks, we align teams on priorities and define what to build first, why it matters, and how to deliver it safely.</p>
    `,
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Product[]>('/api/products');
    }
    return of(MOCK_PRODUCTS);
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Product>(`/api/products/${slug}`);
    }
    return of(MOCK_PRODUCTS.find((product) => product.slug === slug));
  }

  getAllSlugs(): string[] {
    // Only used in FE for routing, not needed for BE
    return MOCK_PRODUCTS.map((product) => product.slug);
  }
}
