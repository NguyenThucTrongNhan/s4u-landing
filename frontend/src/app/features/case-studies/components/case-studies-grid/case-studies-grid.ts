import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaseStudy } from '../../../../core/models/case-study.model';

@Component({
  selector: 'app-case-studies-grid',
  imports: [RouterLink],
  templateUrl: './case-studies-grid.html',
  styleUrl: './case-studies-grid.scss',
})
export class CaseStudiesGrid {
  @Input() caseStudies: CaseStudy[] = [];
}
