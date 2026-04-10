import { Component, Input } from '@angular/core';

export interface ContactConfig {
  phone?: string;
  zaloId?: string;
  email?: string;
}

@Component({
  selector: 'app-float-contact-bar',
  imports: [],
  templateUrl: './float-contact-bar.html',
  styleUrl: './float-contact-bar.scss',
})
export class FloatContactBar {
  @Input() phone = '+84946893919';
  @Input() zaloId = '84946893919';
  @Input() email = 'hello@aicloud.vn';

  get phoneHref() {
    return `tel:${this.phone}`;
  }

  get zaloHref() {
    return `https://zalo.me/${this.zaloId}`;
  }

  get mailHref() {
    return `mailto:${this.email}`;
  }
}
