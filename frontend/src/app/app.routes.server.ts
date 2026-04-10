import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'courses/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'products/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'case-studies/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'subscriptions/:plan',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
