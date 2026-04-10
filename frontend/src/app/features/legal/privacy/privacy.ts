import { Component, OnInit, inject } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { LegalHero } from '../components/legal-hero/legal-hero';
import { LegalSection } from '../components/legal-section/legal-section';

@Component({
  selector: 'app-privacy',
  imports: [LegalHero, LegalSection],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss',
})
export class Privacy implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage('Privacy Policy | AI Solutions', 'How AI Solutions collects and processes personal data.', 'privacy policy');
  }
}
