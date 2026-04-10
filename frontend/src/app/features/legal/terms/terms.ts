import { Component, OnInit, inject } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { LegalHero } from '../components/legal-hero/legal-hero';
import { LegalSection } from '../components/legal-section/legal-section';

@Component({
  selector: 'app-terms',
  imports: [LegalHero, LegalSection],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
})
export class Terms implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage('Terms of Service | AI Solutions', 'Terms governing use of AI Solutions website and services.', 'terms of service');
  }
}
