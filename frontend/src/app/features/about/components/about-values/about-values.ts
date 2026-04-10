import { Component } from '@angular/core';

@Component({
  selector: 'app-about-values',
  templateUrl: './about-values.html',
  styleUrl: './about-values.scss',
})
export class AboutValues {
  values = [
    'Outcome-first delivery over vanity metrics',
    'Security and reliability by default',
    'Transparent communication and measurable progress',
    'Practical solutions that teams can maintain long-term',
  ];
}
