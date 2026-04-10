import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Seo } from '../../../core/services/seo';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { HeroCarousel } from '../components/hero-carousel/hero-carousel';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, FormsModule, DatePipe, HeroCarousel],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  private readonly seo = inject(Seo);
  private readonly articleService = inject(ArticleService);

  leadEmail = '';
  leadSubmitted = false;

  services = [
    {
      icon: '🤖',
      title: 'AI Consulting',
      desc: 'We help businesses integrate AI into their core operations — from strategy to deployment.',
      tag: 'Strategy',
    },
    {
      icon: '☁️',
      title: 'Cloud Architecture',
      desc: 'Design and build scalable cloud-native systems on AWS, GCP, or Azure with best practices.',
      tag: 'Infrastructure',
    },
    {
      icon: '📚',
      title: 'AI & Cloud Courses',
      desc: 'Practical training programs for developers and teams — from fundamentals to advanced AI.',
      tag: 'Education',
    },
    {
      icon: '⚡',
      title: 'SaaS Products',
      desc: 'Ready-to-use intelligent SaaS solutions to automate and accelerate your business.',
      tag: 'Product',
    },
  ];

  articles: Article[] = [];

  stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '200+', label: 'Students Trained' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '5+', label: 'Years Experience' },
  ];

  clients = [
    { name: 'TechCorp', initials: 'TC' },
    { name: 'FinStack', initials: 'FS' },
    { name: 'MediCare', initials: 'MC' },
    { name: 'BuildPro', initials: 'BP' },
    { name: 'EduCore', initials: 'EC' },
    { name: 'RetailX', initials: 'RX' },
    { name: 'LogiFlow', initials: 'LF' },
    { name: 'DataSync', initials: 'DS' },
  ];

  testimonials = [
    {
      quote: 'Their AI consulting transformed how we handle customer data. We reduced manual processing by 60% in just 3 months.',
      name: 'Michael Chen',
      role: 'CTO',
      company: 'FinStack',
      avatar: 'MC',
    },
    {
      quote: 'The cloud migration was seamless. Infrastructure costs dropped 45% while performance improved significantly.',
      name: 'Sarah Johnson',
      role: 'Tech Director',
      company: 'RetailX',
      avatar: 'SJ',
    },
    {
      quote: 'The SaaS HR platform they built handles 500+ employees effortlessly. Best tech investment we have ever made.',
      name: 'David Nguyen',
      role: 'CEO',
      company: 'MediCare',
      avatar: 'DN',
    },
    {
      quote: 'Their AI & Cloud courses upskilled our entire dev team in 8 weeks. Practical, hands-on, and immediately applicable.',
      name: 'Linh Tran',
      role: 'Engineering Lead',
      company: 'BuildPro',
      avatar: 'LT',
    },
  ];

  portfolioFilters = ['All', 'Web / App', 'AI & Cloud', 'SaaS', 'Consulting'];
  activeFilter = 'All';

  portfolio = [
    {
      slug: 'ai-recommendation-engine',
      title: 'AI Recommendation Engine',
      category: 'AI & Cloud',
      desc: 'Built a real-time product recommendation system using ML, increasing conversion rate by 38%.',
      tags: ['Python', 'AWS', 'ML'],
      icon: '🤖',
    },
    {
      slug: 'cloud-migration-fintech',
      title: 'Cloud Migration for Fintech',
      category: 'AI & Cloud',
      desc: 'Migrated legacy on-prem infrastructure to AWS, cutting costs 45% and improving uptime to 99.9%.',
      tags: ['AWS', '.NET', 'PostgreSQL'],
      icon: '☁️',
    },
    {
      slug: 'saas-hr-management-platform',
      title: 'SaaS HR Management Platform',
      category: 'SaaS',
      desc: 'Full-stack SaaS platform managing 500+ employees across payroll, attendance, and performance.',
      tags: ['Angular', '.NET', 'Stripe'],
      icon: '📊',
    },
    {
      slug: 'healthcare-scheduling-app',
      title: 'Healthcare Scheduling App',
      category: 'Web / App',
      desc: 'Patient scheduling and telemedicine platform serving 3 clinics with real-time availability.',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
      icon: '🏥',
    },
    {
      slug: 'ai-support-chatbot',
      title: 'AI Chatbot for Customer Support',
      category: 'AI & Cloud',
      desc: 'GPT-powered support chatbot that handles 70% of Tier-1 queries automatically, 24/7.',
      tags: ['OpenAI', 'Azure', 'React'],
      icon: '💬',
    },
    {
      slug: 'digital-transformation-roadmap',
      title: 'Digital Transformation Roadmap',
      category: 'Consulting',
      desc: 'Led end-to-end digital transformation for a 200-person manufacturing firm over 6 months.',
      tags: ['Strategy', 'Training', 'Cloud'],
      icon: '🗺️',
    },
  ];

  get filteredPortfolio() {
    if (this.activeFilter === 'All') return this.portfolio;
    return this.portfolio.filter(p => p.category === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  ngOnInit() {
    this.seo.setPage(
      'AI Solutions & Cloud Consulting | Home',
      'We help businesses grow with AI consulting, cloud architecture, SaaS products, and practical AI training programs.',
      'ai consulting, cloud architecture, AI courses, SaaS, digital transformation'
    );
    this.seo.setOrganizationSchema();

    // Keep homepage cards consistent with /articles and /articles/:slug routes.
    this.articleService
      .getFeatured()
      .subscribe((items) => (this.articles = items.slice(0, 3)));
  }

  submitLead() {
    if (this.leadEmail) {
      this.leadSubmitted = true;
    }
  }
}

