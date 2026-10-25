import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
export const routes: Routes = [{path: '', component: MainLayout, children: [
{path: '', loadComponent: () => import('./features/landing/landing/landing').then(m => m.Landing)},
{path: 'products', loadComponent: () => import('./features/products/products/products').then(m => m.Products)},
{path: 'products/:slug', loadComponent: () => import('./features/products/product-detail/product-detail').then(m => m.ProductDetail)},
{path: 'demo', loadComponent: () => import('./features/contact/contact/contact').then(m => m.Contact)},
{path: 'contact', redirectTo: 'demo', pathMatch: 'full'},
{path: 'about', loadComponent: () => import('./features/about/about/about').then(m => m.About)},
{path: 'privacy-policy', loadComponent: () => import('./features/legal/privacy/privacy').then(m => m.Privacy)},
{path: 'pricing', redirectTo: 'demo', pathMatch: 'full'},
{path: 'register', redirectTo: 'demo', pathMatch: 'full'},
{path: 'login', redirectTo: 'demo', pathMatch: 'full'},
{path: 'subscriptions', redirectTo: 'demo', pathMatch: 'prefix'},
{path: '**', loadComponent: () => import('./shared/components/not-found').then(m => m.NotFound)}
]}];
