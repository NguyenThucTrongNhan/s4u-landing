import { Component, OnInit, inject, signal } from '@angular/core';
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

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.productService.getBySlug(slug).subscribe((item) => {
      if (!item) {
        this.notFound.set(true);
        return;
      }

      this.product.set(item);
      this.seo.setPage(
        `${item.name} | Product Details`,
        item.summary,
        `${item.category}, ai product, cloud product, saas`
      );
    });
  }
}
