import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CaseStudy } from '../models/case-study.model';
import { HttpClient } from '@angular/common/http';
import { FEATURE_FLAGS } from '../config/feature-flags';

const MOCK_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'ai-recommendation-engine',
    title: 'AI Recommendation Engine',
    category: 'AI & Cloud',
    icon: '🤖',
    summary: 'Built a real-time recommendation system that increased conversion rate by 38%.',
    client: 'RetailX',
    duration: '14 weeks',
    stack: ['Python', 'AWS', 'Redis', 'PostgreSQL'],
    challenge: 'The client had strong traffic but low conversion due to generic product recommendations.',
    solution: 'We designed an event-driven recommendation service with near real-time ranking and A/B testing.',
    impact: ['+38% conversion rate', '-22% bounce rate', '+18% average order value'],
    detailHtml: `
      <h2>Business context</h2>
      <p>The team needed personalization that could adapt to user behavior quickly without major platform disruption.</p>

      <h2>Implementation</h2>
      <p>We introduced streaming events, feature engineering pipelines, and a recommendation API consumed by the storefront.</p>

      <h2>Result</h2>
      <p>The solution delivered measurable uplift within one quarter and provided a foundation for future personalization features.</p>
    `,
  },
  {
    slug: 'cloud-migration-fintech',
    title: 'Cloud Migration for Fintech',
    category: 'AI & Cloud',
    icon: '☁️',
    summary: 'Migrated legacy workloads to AWS and improved uptime to 99.9%.',
    client: 'FinStack',
    duration: '6 months',
    stack: ['AWS', '.NET', 'Terraform', 'PostgreSQL'],
    challenge: 'Legacy infrastructure caused release delays, high operating costs, and recurring outages.',
    solution: 'We delivered phased migration, infrastructure as code, observability, and zero-downtime cutover playbooks.',
    impact: ['-45% infrastructure cost', '99.9% uptime', 'Release frequency improved 3x'],
    detailHtml: `
      <h2>Business context</h2>
      <p>The platform was constrained by on-prem infrastructure and manual operations.</p>

      <h2>Implementation</h2>
      <p>We modernized deployment pipelines, migrated data and APIs, and established operational guardrails.</p>

      <h2>Result</h2>
      <p>The engineering team now deploys faster with lower risk and improved reliability.</p>
    `,
  },
  {
    slug: 'saas-hr-management-platform',
    title: 'SaaS HR Management Platform',
    category: 'SaaS',
    icon: '📊',
    summary: 'Built a full-stack HR platform for payroll, attendance, and performance workflows.',
    client: 'BuildPro',
    duration: '5 months',
    stack: ['Angular', '.NET', 'Stripe', 'Azure'],
    challenge: 'HR operations were fragmented across spreadsheets and disconnected systems.',
    solution: 'We delivered a multi-tenant SaaS platform with role-based access, reporting, and secure payroll automation.',
    impact: ['500+ employees onboarded', '-60% HR admin time', '+30% payroll processing speed'],
    detailHtml: `
      <h2>Business context</h2>
      <p>The company wanted one system to unify people operations across departments.</p>

      <h2>Implementation</h2>
      <p>We built modular HR workflows and integrated payment and reporting services for end-to-end operations.</p>

      <h2>Result</h2>
      <p>The platform became the central operating layer for HR teams and line managers.</p>
    `,
  },
  {
    slug: 'healthcare-scheduling-app',
    title: 'Healthcare Scheduling App',
    category: 'Web / App',
    icon: '🏥',
    summary: 'Delivered scheduling and telemedicine for three clinics with real-time availability.',
    client: 'MediCare',
    duration: '12 weeks',
    stack: ['Angular', 'Node.js', 'PostgreSQL'],
    challenge: 'Patients faced long wait times and staff spent hours coordinating appointments manually.',
    solution: 'We built patient self-booking, provider calendars, and reminder workflows with secure telemedicine integration.',
    impact: ['-40% scheduling calls', '+25% appointment utilization', 'Reduced no-show rate'],
    detailHtml: `
      <h2>Business context</h2>
      <p>Manual scheduling hurt patient experience and administrative efficiency.</p>

      <h2>Implementation</h2>
      <p>The new platform aligned patient, provider, and staff workflows in a single interface.</p>

      <h2>Result</h2>
      <p>Clinics now serve more patients with less administrative overhead.</p>
    `,
  },
  {
    slug: 'ai-support-chatbot',
    title: 'AI Chatbot for Customer Support',
    category: 'AI & Cloud',
    icon: '💬',
    summary: 'Deployed a GPT-powered support assistant handling 70% of tier-1 queries.',
    client: 'EduCore',
    duration: '10 weeks',
    stack: ['OpenAI', 'Azure', 'React'],
    challenge: 'Support demand spiked faster than team capacity, leading to response delays.',
    solution: 'We implemented retrieval-augmented responses, confidence thresholds, and seamless human handoff.',
    impact: ['70% tier-1 ticket deflection', 'First response time reduced by 64%', 'CSAT improved by 11 points'],
    detailHtml: `
      <h2>Business context</h2>
      <p>The support team needed to scale while preserving answer quality and brand tone.</p>

      <h2>Implementation</h2>
      <p>We combined knowledge retrieval with controlled generation and robust escalation rules.</p>

      <h2>Result</h2>
      <p>The solution delivered always-on support and freed agents for complex requests.</p>
    `,
  },
  {
    slug: 'digital-transformation-roadmap',
    title: 'Digital Transformation Roadmap',
    category: 'Consulting',
    icon: '🗺️',
    summary: 'Led cross-functional modernization planning across operations, data, and technology.',
    client: 'LogiFlow',
    duration: '6 months',
    stack: ['Strategy', 'Training', 'Cloud'],
    challenge: 'The organization lacked a shared transformation plan and clear execution priorities.',
    solution: 'We facilitated workshops, mapped capability gaps, and built a phased roadmap with executive governance.',
    impact: ['12 initiatives prioritized', '3 high-impact pilots launched', 'Organization-wide adoption framework created'],
    detailHtml: `
      <h2>Business context</h2>
      <p>Leaders needed a practical path to modernize systems and ways of working.</p>

      <h2>Implementation</h2>
      <p>We aligned strategy with delivery by defining outcomes, ownership, and milestones.</p>

      <h2>Result</h2>
      <p>The roadmap became the operating playbook for modernization across teams.</p>
    `,
  },
];

@Injectable({ providedIn: 'root' })
export class CaseStudyService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CaseStudy[]> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<CaseStudy[]>('/api/case-studies');
    }
    return of(MOCK_CASE_STUDIES);
  }

  getBySlug(slug: string): Observable<CaseStudy | undefined> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<CaseStudy>(`/api/case-studies/${slug}`);
    }
    return of(MOCK_CASE_STUDIES.find((item) => item.slug === slug));
  }

  getAllSlugs(): string[] {
    // Only used in FE for routing, not needed for BE
    return MOCK_CASE_STUDIES.map((item) => item.slug);
  }
}
