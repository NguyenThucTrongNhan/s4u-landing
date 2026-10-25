import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('Public pilot routes', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));
  it('refreshes product content and demo context when the slug changes', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/products/lawfirm');
    expect(harness.routeNativeElement?.textContent).toContain('Công ty và văn phòng luật');
    await harness.navigateByUrl('/products/document-platform');
    expect(harness.routeNativeElement?.textContent).toContain('Doanh nghiệp cần quản lý');
    expect(harness.routeNativeElement?.querySelector('.sidebar-cta a')?.getAttribute('href')).toContain('product=document-platform');
    await harness.navigateByUrl('/products/missing');
    expect(harness.routeNativeElement?.textContent).toContain('Không tìm thấy sản phẩm');
    await harness.navigateByUrl('/products/lawfirm');
    expect(harness.routeNativeElement?.textContent).toContain('Công ty và văn phòng luật');
  });
  it('retires payment paths and does not claim form delivery', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/subscriptions/success');
    expect(harness.routeNativeElement?.querySelector('input[name="cardNumber"]')).toBeNull();
    expect(harness.routeNativeElement?.textContent).toContain('Website không xác nhận đã tiếp nhận');
    expect(harness.routeNativeElement?.querySelector('a[href^="mailto:"]')).toBeTruthy();
  });
});

describe('Published articles', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));
  it('shows approved author and updates content, schema and CTA between articles', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/articles');
    expect(harness.routeNativeElement?.textContent).toContain('Nguyễn Thúc Trọng Nhân');
    await harness.navigateByUrl('/articles/quan-ly-vu-viec-va-deadline');
    expect(harness.routeNativeElement?.querySelector('.sidebar-cta a')?.getAttribute('href')).toContain('product=lawfirm');
    await harness.navigateByUrl('/articles/tai-lieu-ngu-canh-va-phan-quyen');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Lưu tài liệu tập trung');
    expect(harness.routeNativeElement?.querySelector('.sidebar-cta a')?.getAttribute('href')).toContain('product=document-platform');
    expect(document.getElementById('article-schema')?.textContent).toContain('Nguyễn Thúc Trọng Nhân');
    await harness.navigateByUrl('/articles/missing');
    expect(harness.routeNativeElement?.textContent).toContain('Không tìm thấy bài viết');
    expect(document.getElementById('article-schema')).toBeNull();
    await harness.navigateByUrl('/articles/ai-tai-lieu-chon-bai-toan-va-kiem-chung');
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('Ứng dụng AI');
    expect(harness.routeNativeElement?.textContent).not.toContain('Bản nháp chờ');
  });
});
