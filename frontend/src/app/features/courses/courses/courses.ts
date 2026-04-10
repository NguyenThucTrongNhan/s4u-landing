import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../../core/models/course.model';
import { CourseService } from '../../../core/services/course.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-courses',
  imports: [RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit {
  private readonly courseService = inject(CourseService);
  private readonly seo = inject(Seo);

  courses = signal<Course[]>([]);

  ngOnInit(): void {
    this.seo.setPage(
      'Courses | AI & Cloud Training',
      'Explore practical training programs for AI, cloud architecture, and modern software delivery.',
      'ai courses, cloud courses, engineering training'
    );

    this.courseService.getAll().subscribe((items) => this.courses.set(items));
  }

}
