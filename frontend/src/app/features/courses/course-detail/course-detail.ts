import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-course-detail',
  imports: [RouterLink],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss',
})
export class CourseDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly seo = inject(Seo);

  course = signal<Course | null>(null);
  notFound = signal(false);

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.courseService.getBySlug(slug).subscribe((item) => {
      if (!item) {
        this.notFound.set(true);
        return;
      }

      this.course.set(item);
      this.seo.setPage(
        `${item.title} | Course Detail`,
        item.summary,
        `course, ${item.category}, ${item.level.toLowerCase()}, training`
      );
    });
  }
}
