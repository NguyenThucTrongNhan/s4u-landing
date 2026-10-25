import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/services/seo';
@Component({selector: 'app-not-found', imports: [RouterLink], template: '<section class="section container"><h1>Không tìm thấy trang</h1><p>Đường dẫn không còn được sử dụng hoặc chưa được xuất bản.</p><a routerLink="/">Về trang chủ</a></section>'})
export class NotFound { constructor() { inject(Seo).setPage('Không tìm thấy trang | S4U', 'Đường dẫn không tồn tại.', '', false); } }
