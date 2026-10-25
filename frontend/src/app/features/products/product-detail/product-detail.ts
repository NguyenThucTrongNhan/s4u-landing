import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly seo = inject(Seo);

  product = signal<Product | null>(null);
  notFound = signal(false);

  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
    const slug = params.get('slug') ?? '';
    this.product.set(null);
    this.notFound.set(false);
    this.productService.getBySlug(slug).subscribe((item) => {
      if (!item) {
        this.notFound.set(true);
        this.seo.setPage('Không tìm thấy sản phẩm | S4U', 'Sản phẩm không tồn tại hoặc chưa được xuất bản.', '', false);
        return;
      }

      this.product.set(item);
      this.seo.setPage(
        `${item.name} | S4U`,
        item.summary,
        `${item.category}, ai product, cloud product, saas`
      );
    });
    });
  }
}
