import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly seo = inject(Seo);

  products = signal<Product[]>([]);

  ngOnInit(): void {
    this.seo.setPage(
      'Sản phẩm | S4U',
      'LawFirm và Document Platform: xem phạm vi và trao đổi pilot.',
      'ai products, cloud products, saas solutions'
    );

    this.productService
      .getAll()
      .subscribe((items) => this.products.set(items));
  }

}
