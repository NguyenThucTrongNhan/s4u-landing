import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course.model';
import { HttpClient } from '@angular/common/http';
import { FEATURE_FLAGS } from '../config/feature-flags';

const MOCK_COURSES: Course[] = [
  {
    slug: 'ai-for-business-teams',
    title: 'AI for Business Teams',
    level: 'Beginner',
    category: 'Business',
    duration: '4 weeks',
    format: 'Live Online',
    priceLabel: '$299',
    summary: 'A practical program for non-technical teams to adopt AI safely and effectively.',
    outcomes: [
      'Identify high-impact AI use cases',
      'Draft AI adoption roadmap for your team',
      'Evaluate AI tools and governance risks',
    ],
    curriculum: [
      'AI fundamentals for business leaders',
      'Prompting and workflow automation',
      'Responsible AI and policy basics',
      'Use-case workshop and action plan',
    ],
    detailHtml: `
      <h2>Who this course is for</h2>
      <p>Managers, operations teams, and analysts who want practical AI adoption outcomes without deep coding requirements.</p>

      <h2>What you will build</h2>
      <p>By the end of the course, each participant produces a use-case plan and implementation checklist for immediate team adoption.</p>
    `,
  },
  {
    slug: 'cloud-architecture-bootcamp',
    title: 'Cloud Architecture Bootcamp',
    level: 'Intermediate',
    category: 'Cloud',
    duration: '6 weeks',
    format: 'Hybrid',
    priceLabel: '$499',
    summary: 'Design resilient, secure, and cost-efficient systems on AWS, Azure, and GCP.',
    outcomes: [
      'Design production-ready cloud architectures',
      'Apply cost and reliability patterns',
      'Implement observability and security baselines',
    ],
    curriculum: [
      'Architecture patterns and trade-offs',
      'Networking and security controls',
      'Scalability, resiliency, and SRE basics',
      'FinOps and optimization playbook',
    ],
    detailHtml: `
      <h2>Hands-on by design</h2>
      <p>This bootcamp combines architecture labs with peer reviews, ensuring participants can apply patterns to real projects.</p>

      <h2>Outcome-focused learning</h2>
      <p>You finish with a reference architecture and operational checklist ready for production rollout.</p>
    `,
  },
  {
    slug: 'applied-llm-engineering',
    title: 'Applied LLM Engineering',
    level: 'Advanced',
    category: 'AI',
    duration: '8 weeks',
    format: 'Live Online',
    priceLabel: '$699',
    summary: 'Build reliable LLM applications with retrieval, evaluation, and guardrails.',
    outcomes: [
      'Implement retrieval-augmented generation workflows',
      'Evaluate LLM quality and safety',
      'Deploy and monitor LLM apps in production',
    ],
    curriculum: [
      'LLM system architecture',
      'RAG and vector search pipelines',
      'Prompt and response safety controls',
      'Evaluation, monitoring, and cost optimization',
    ],
    detailHtml: `
      <h2>Engineering depth</h2>
      <p>This course targets developers who want to ship dependable AI products instead of demos.</p>

      <h2>Production deployment</h2>
      <p>Teams learn deployment strategies, telemetry, and fallback mechanisms for robust real-world usage.</p>
    `,
  },
  {
    slug: 'fullstack-dotnet-angular',
    title: 'Fullstack .NET + Angular Delivery',
    level: 'Intermediate',
    category: 'Engineering',
    duration: '6 weeks',
    format: 'Self-paced',
    priceLabel: '$449',
    summary: 'Ship scalable web apps with .NET APIs, Angular frontends, and CI/CD best practices.',
    outcomes: [
      'Design clean API boundaries',
      'Build maintainable Angular feature modules',
      'Deploy end-to-end with CI/CD',
    ],
    curriculum: [
      '.NET API architecture and testing',
      'Angular routing and state patterns',
      'Performance and security checklist',
      'Release pipelines and environment strategy',
    ],
    detailHtml: `
      <h2>Build what teams actually deploy</h2>
      <p>Participants work through realistic project slices to mirror day-to-day delivery constraints.</p>

      <h2>Career-ready outputs</h2>
      <p>You will complete a deployable reference app and reusable templates for future projects.</p>
    `,
  },
];

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Course[]>('/api/courses');
    }
    return of(MOCK_COURSES);
  }

  getBySlug(slug: string): Observable<Course | undefined> {
    if (FEATURE_FLAGS.useRealApi) {
      return this.http.get<Course>(`/api/courses/${slug}`);
    }
    return of(MOCK_COURSES.find((course) => course.slug === slug));
  }

  getAllSlugs(): string[] {
    // Only used in FE for routing, not needed for BE
    return MOCK_COURSES.map((course) => course.slug);
  }
}
