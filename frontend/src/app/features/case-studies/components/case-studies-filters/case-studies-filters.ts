import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-case-studies-filters',
  templateUrl: './case-studies-filters.html',
  styleUrl: './case-studies-filters.scss',
})
export class CaseStudiesFilters {
  @Input() filters: string[] = [];
  @Input() active = 'All';
  @Output() selectFilter = new EventEmitter<string>();
}
