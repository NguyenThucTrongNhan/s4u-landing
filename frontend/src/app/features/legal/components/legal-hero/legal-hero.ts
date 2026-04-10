import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legal-hero',
  templateUrl: './legal-hero.html',
  styleUrl: './legal-hero.scss',
})
export class LegalHero {
  @Input() title = '';
  @Input() description = '';
}
