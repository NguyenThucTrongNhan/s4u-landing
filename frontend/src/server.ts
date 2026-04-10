import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const BASE_URL = process.env['BASE_URL'] || 'https://yourcompany.com';

const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact',
  '/demo',
  '/articles',
  '/courses',
  '/products',
  '/case-studies',
  '/pricing',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/subscriptions/success',
  '/subscriptions/failed',
];

// Article slugs for sitemap — replace with DB/CMS query in Phase 3
const ARTICLE_SLUGS = [
  'apply-ai-smes',
  'cloud-architecture-startups-2026',
  'digital-transformation-guide',
  'angular-ssr-seo-guide',
  'aeo-ai-engine-optimization',
  'dotnet-clean-architecture-2026',
];

const COURSE_SLUGS = [
  'ai-for-business-teams',
  'cloud-architecture-bootcamp',
  'applied-llm-engineering',
  'fullstack-dotnet-angular',
];

const PRODUCT_SLUGS = [
  'smart-lead-engine',
  'cloud-cost-optimizer',
  'ai-support-assistant',
  'ai-readiness-workshop',
];

const CASE_STUDY_SLUGS = [
  'ai-recommendation-engine',
  'cloud-migration-fintech',
  'saas-hr-management-platform',
  'healthcare-scheduling-app',
  'ai-support-chatbot',
  'digital-transformation-roadmap',
];

const SUBSCRIPTION_PLAN_SLUGS = ['starter', 'growth', 'scale'];

/** robots.txt */
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`);
});

/** sitemap.xml */
app.get('/sitemap.xml', (_req, res) => {
  const now = new Date().toISOString().split('T')[0];

  const staticEntries = STATIC_ROUTES.map(
    (route) => `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  ).join('');

  const articleEntries = ARTICLE_SLUGS.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/articles/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('');

  const courseEntries = COURSE_SLUGS.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/courses/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('');

  const productEntries = PRODUCT_SLUGS.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/products/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('');

  const caseStudyEntries = CASE_STUDY_SLUGS.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/case-studies/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('');

  const subscriptionEntries = SUBSCRIPTION_PLAN_SLUGS.map(
    (slug) => `
  <url>
    <loc>${BASE_URL}/subscriptions/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
${courseEntries}
${productEntries}
${caseStudyEntries}
${subscriptionEntries}
</urlset>`;

  res.type('application/xml');
  res.send(xml);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
