import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { CaseStudyService } from '../../../core/services/case-study.service';
import { CaseStudy } from '../../../core/models/case-study.model';
import { CaseStudiesHero } from '../components/case-studies-hero/case-studies-hero';
import { CaseStudiesFilters } from '../components/case-studies-filters/case-studies-filters';
import { CaseStudiesGrid } from '../components/case-studies-grid/case-studies-grid';

@Component({
  selector: 'app-case-studies',
  imports: [CaseStudiesHero, CaseStudiesFilters, CaseStudiesGrid],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.scss',
})
export class CaseStudies implements OnInit {
  private readonly seo = inject(Seo);
  private readonly caseStudyService = inject(CaseStudyService);

  all = signal<CaseStudy[]>([]);
  activeFilter = signal('All');

  filters = computed(() => {
    const categories = new Set(this.all().map((item) => item.category));
    return ['All', ...Array.from(categories)];
  });

  filtered = computed(() => {
    const active = this.activeFilter();
    if (active === 'All') {
      return this.all();
    }
    return this.all().filter((item) => item.category === active);
  });

  ngOnInit(): void {
    this.seo.setPage(
      'Case Studies | AI Solutions',
      'Browse real case studies with outcomes across AI, cloud, and digital transformation.',
      'case studies, ai projects, cloud migration results'
    );

    this.caseStudyService.getAll().subscribe((items) => this.all.set(items));
  }

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
