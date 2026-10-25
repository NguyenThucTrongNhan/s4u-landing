import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SITE } from '../../../../core/config/site';
@Component({selector: 'app-demo-request-form', imports: [FormsModule, RouterLink], templateUrl: './demo-request-form.html', styleUrl: './demo-request-form.scss'})
export class DemoRequestForm {
  private route = inject(ActivatedRoute);
  fullName = ''; email = ''; company = ''; message = '';
  interest = ['lawfirm', 'document-platform'].includes(this.route.snapshot.queryParamMap.get('product') ?? '') ? this.route.snapshot.queryParamMap.get('product')! : 'lawfirm';
  get mailto(): string {
    const body = `Họ tên: ${this.fullName.trim()}\nEmail: ${this.email.trim()}\nTổ chức: ${this.company.trim()}\nQuan tâm: ${this.interest}\nNhu cầu: ${this.message.trim()}`;
    return `mailto:${SITE.email}?subject=${encodeURIComponent('Yêu cầu demo S4U: ' + this.interest)}&body=${encodeURIComponent(body)}`;
  }
}
