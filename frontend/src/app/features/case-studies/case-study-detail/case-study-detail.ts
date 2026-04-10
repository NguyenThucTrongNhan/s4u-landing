import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CaseStudy } from '../../../core/models/case-study.model';
import { CaseStudyService } from '../../../core/services/case-study.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-case-study-detail',
  imports: [RouterLink],
  templateUrl: './case-study-detail.html',
  styleUrl: './case-study-detail.scss',
})
export class CaseStudyDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly caseStudyService = inject(CaseStudyService);
  private readonly seo = inject(Seo);

  caseStudy = signal<CaseStudy | null>(null);
  notFound = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.caseStudyService.getBySlug(slug).subscribe((item) => {
      if (!item) {
        this.notFound.set(true);
        return;
      }

      this.caseStudy.set(item);
      this.seo.setPage(
        `${item.title} | Case Study`,
        item.summary,
        `case study, ${item.category}, ai project, cloud project`
      );
    });
  }
}
