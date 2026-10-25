import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, OnInit, DestroyRef, signal, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Article } from '../../../core/models/article.model';
import { ArticleService } from '../../../core/services/article.service';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.scss',
})
export class ArticleDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private articleService = inject(ArticleService);
  private seo = inject(Seo);
  private platformId = inject(PLATFORM_ID);

  article = signal<Article | null>(null);
  related = signal<Article[]>([]);
  notFound = signal(false);

  private destroyRef = inject(DestroyRef);
  shareMessage = signal('');
  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
    const slug = params.get('slug') ?? '';
    this.article.set(null); this.related.set([]); this.notFound.set(false); this.shareMessage.set('');

    this.articleService.getBySlug(slug).subscribe((data) => {
      if (!data) {
        this.notFound.set(true);
        this.seo.setPage('Không tìm thấy bài viết | S4U', 'Bài viết chưa được xuất bản hoặc không tồn tại.', '', false);
        return;
      }
      this.article.set(data);

      // SEO + JSON-LD
      const s = data.seo;
      this.seo.setArticle(
        s?.metaTitle ?? data.title,
        s?.metaDescription ?? data.excerpt,
        data.author.name,
        data.publishedAt,
        data.slug
      );

      // Related articles (same category, different slug)
      this.articleService.getByCategory(data.category).subscribe((all) => {
        this.related.set(all.filter((a) => a.slug !== slug).slice(0, 3));
      });
    });
    });
  }

  async copyLink() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.shareMessage.set('Đã sao chép liên kết.');
      } catch { this.shareMessage.set('Không thể sao chép. Bạn có thể lấy liên kết từ thanh địa chỉ.'); }
    }
  }
}
