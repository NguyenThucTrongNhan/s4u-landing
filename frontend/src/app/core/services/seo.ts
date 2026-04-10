import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Seo {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  setPage(pageTitle: string, description: string, keywords = '') {
    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: description });
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  setArticle(headline: string, description: string, author: string, datePublished: string, slug: string) {
    this.setPage(headline, description);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline,
      description,
      author: { '@type': 'Person', name: author },
      datePublished,
      url: `${this.doc.location.origin}/articles/${slug}`,
      publisher: {
        '@type': 'Organization',
        name: 'AI Solutions',
        url: this.doc.location.origin,
      },
    };
    this.injectJsonLd('article-schema', schema);
  }

  setOrganizationSchema() {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AI Solutions',
      url: this.doc.location.origin,
      description: 'AI consulting, cloud architecture, SaaS products, and AI training programs.',
      sameAs: ['https://linkedin.com/company/aisolutions'],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@aisolutions.com',
        contactType: 'customer support',
      },
    };
    this.injectJsonLd('org-schema', schema);
  }

  private injectJsonLd(id: string, schema: object) {
    let el = this.doc.getElementById(id);
    if (!el) {
      el = this.doc.createElement('script');
      el.id = id;
      (el as HTMLScriptElement).type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
  }
}

