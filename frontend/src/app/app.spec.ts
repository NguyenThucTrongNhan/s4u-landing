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
    expect(harness.routeNativeElement?.textContent).toContain('Product not found');
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
