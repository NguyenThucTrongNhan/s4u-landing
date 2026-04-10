import { Component, OnInit, inject } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { LegalHero } from '../components/legal-hero/legal-hero';
import { LegalSection } from '../components/legal-section/legal-section';

@Component({
  selector: 'app-cookies',
  imports: [LegalHero, LegalSection],
  templateUrl: './cookies.html',
  styleUrl: './cookies.scss',
})
export class Cookies implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage('Cookie Policy | AI Solutions', 'How we use cookies and tracking technologies on our website.', 'cookie policy');
  }
}
