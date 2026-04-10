import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legal-section',
  templateUrl: './legal-section.html',
  styleUrl: './legal-section.scss',
})
export class LegalSection {
  @Input() title = '';
  @Input() paragraphs: string[] = [];
}
