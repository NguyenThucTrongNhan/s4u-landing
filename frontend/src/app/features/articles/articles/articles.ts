import { Component, inject, OnInit, signal, computed, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Article, ArticleCategory } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  private articleService = inject(ArticleService);
  private seo = inject(Seo);
  private platformId = inject(PLATFORM_ID);

  all = signal<Article[]>([]);
  searchQuery = signal('');
  activeCategory = signal<ArticleCategory>('All');
  currentPage = signal(1);
  readonly pageSize = 6;

  categories: ArticleCategory[] = ['All', 'AI', 'Cloud', 'Business', 'Tutorial', 'News'];

  filtered = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const cat = this.activeCategory();
    return this.all().filter((a) => {
      const matchCat = cat === 'All' || a.category === cat;
      const matchSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  });

  totalPages = computed(() => Math.ceil(this.filtered().length / this.pageSize));

  paginated = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  ngOnInit() {
    this.seo.setPage(
      'Articles | AI & Tech Insights',
      'Read the latest articles on AI, cloud architecture, digital transformation, and business technology.',
      'AI articles, cloud tutorials, digital transformation, tech blog'
    );
    this.articleService.getAll().subscribe((data) => this.all.set(data));
  }

  setCategory(cat: ArticleCategory) {
    this.activeCategory.set(cat);
    this.currentPage.set(1);
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    this.currentPage.set(page);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
