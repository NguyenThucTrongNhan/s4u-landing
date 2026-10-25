import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Seo } from './seo';

describe('Route metadata', () => {
  it('clears article metadata and restores indexing on a valid page', () => {
    const seo = TestBed.inject(Seo);
    const meta = TestBed.inject(Meta);
    const doc = TestBed.inject(DOCUMENT);
    seo.setArticle('Draft title', 'Description', 'Nguyễn Thúc Trọng Nhân', '2026-10-25', 'example');
    expect(doc.getElementById('article-schema')).not.toBeNull();
    expect(meta.getTag('property="og:type"')?.content).toBe('article');
    seo.setPage('Missing', 'Missing page', '', false);
    expect(doc.getElementById('article-schema')).toBeNull();
    expect(meta.getTag('name="robots"')?.content).toBe('noindex, follow');
    seo.setPage('LawFirm', 'Product description');
    expect(meta.getTag('name="robots"')?.content).toBe('index, follow');
    expect(meta.getTag('property="og:type"')?.content).toBe('website');
  });
});
