import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing/landing').then((m) => m.Landing),
        title: 'Home | AI Solutions & Cloud Consulting',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about/about').then((m) => m.About),
        title: 'About Us | AI Solutions',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact/contact').then((m) => m.Contact),
        title: 'Contact & Book Demo | AI Solutions',
      },
      {
        path: 'demo',
        loadComponent: () =>
          import('./features/contact/contact/contact').then((m) => m.Contact),
        title: 'Book Demo | AI Solutions',
      },
      {
        path: 'articles',
        loadComponent: () =>
          import('./features/articles/articles/articles').then(
            (m) => m.Articles
          ),
        title: 'Articles | AI & Tech Insights',
      },
      {
        path: 'articles/:slug',
        loadComponent: () =>
          import(
            './features/articles/article-detail/article-detail'
          ).then((m) => m.ArticleDetail),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./features/courses/courses/courses').then((m) => m.Courses),
        title: 'Courses | AI & Cloud Training',
      },
      {
        path: 'courses/:slug',
        loadComponent: () =>
          import('./features/courses/course-detail/course-detail').then(
            (m) => m.CourseDetail
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products/products').then(
            (m) => m.Products
          ),
        title: 'Products | SaaS Solutions',
      },
      {
        path: 'products/:slug',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail').then(
            (m) => m.ProductDetail
          ),
      },
      {
        path: 'case-studies',
        loadComponent: () =>
          import('./features/case-studies/case-studies/case-studies').then(
            (m) => m.CaseStudies
          ),
        title: 'Case Studies | AI Solutions',
      },
      {
        path: 'case-studies/:slug',
        loadComponent: () =>
          import('./features/case-studies/case-study-detail/case-study-detail').then(
            (m) => m.CaseStudyDetail
          ),
      },
      {
        path: 'pricing',
        loadComponent: () =>
          import('./features/pricing/pricing/pricing').then(
            (m) => m.Pricing
          ),
        title: 'Pricing | Plans & Subscriptions',
      },
      {
        path: 'subscriptions/success',
        loadComponent: () =>
          import('./features/subscriptions/subscription-success/subscription-success').then(
            (m) => m.SubscriptionSuccess
          ),
        title: 'Subscription Success',
      },
      {
        path: 'subscriptions/failed',
        loadComponent: () =>
          import('./features/subscriptions/subscription-failed/subscription-failed').then(
            (m) => m.SubscriptionFailed
          ),
        title: 'Subscription Failed',
      },
      {
        path: 'subscriptions/:plan',
        loadComponent: () =>
          import('./features/subscriptions/subscription-detail/subscription-detail').then(
            (m) => m.SubscriptionDetail
          ),
        title: 'Subscription Checkout',
      },
      {
        path: 'privacy-policy',
        loadComponent: () =>
          import('./features/legal/privacy/privacy').then((m) => m.Privacy),
        title: 'Privacy Policy',
      },
      {
        path: 'terms-of-service',
        loadComponent: () =>
          import('./features/legal/terms/terms').then((m) => m.Terms),
        title: 'Terms of Service',
      },
      {
        path: 'cookie-policy',
        loadComponent: () =>
          import('./features/legal/cookies/cookies').then((m) => m.Cookies),
        title: 'Cookie Policy',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then((m) => m.Login),
    title: 'Login',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then((m) => m.Register),
    title: 'Register',
  },
  { path: '**', redirectTo: '' },
];
