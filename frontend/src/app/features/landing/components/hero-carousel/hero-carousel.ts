import { Component, OnDestroy, OnInit, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface HeroSlide {
  image: string;
  label: string;
  title: string;
  highlight: string;
  description: string;
  statPrimaryValue: string;
  statPrimaryLabel: string;
  statPrimarySub: string;
  statSecondaryValue: string;
  statSecondaryLabel: string;
  statSecondarySub: string;
}

@Component({
  selector: 'app-hero-carousel',
  imports: [RouterLink],
  templateUrl: './hero-carousel.html',
  styleUrl: './hero-carousel.scss',
})
export class HeroCarousel implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private timerId: ReturnType<typeof setInterval> | null = null;
  private animationTimerId: ReturnType<typeof setTimeout> | null = null;
  private touchStartX = 0;
  private touchCurrentX = 0;
  private readonly swipeThreshold = 48;

  readonly slides: HeroSlide[] = [
    {
      image: '/images/hero/slide-1.svg',
      label: 'AI & Cloud Solutions',
      title: 'Build Smarter businesses with',
      highlight: 'AI & Cloud',
      description:
        'We deliver AI consulting, cloud architecture, SaaS products, and practical training programs to accelerate growth.',
      statPrimaryValue: '+340%',
      statPrimaryLabel: 'AI Adoption Rate',
      statPrimarySub: 'across client portfolio in 2025',
      statSecondaryValue: '-42%',
      statSecondaryLabel: 'Avg. Cost Reduction',
      statSecondarySub: 'with cloud migration',
    },
    {
      image: '/images/hero/slide-2.svg',
      label: 'Digital Transformation',
      title: 'Modernize Legacy operations with',
      highlight: 'Business AI',
      description:
        'Transform manual workflows into scalable digital systems with measurable ROI and faster execution.',
      statPrimaryValue: '3x',
      statPrimaryLabel: 'Delivery Speed',
      statPrimarySub: 'after platform modernization',
      statSecondaryValue: '+58%',
      statSecondaryLabel: 'Team Productivity',
      statSecondarySub: 'with automation rollout',
    },
    {
      image: '/images/hero/slide-3.svg',
      label: 'SaaS Product Engineering',
      title: 'Launch Revenue-Ready products with',
      highlight: 'Expert Teams',
      description:
        'From idea validation to production launch, we build SaaS products that convert and scale globally.',
      statPrimaryValue: '50+',
      statPrimaryLabel: 'Products Delivered',
      statPrimarySub: 'for startups and enterprises',
      statSecondaryValue: '99.9%',
      statSecondaryLabel: 'Platform Uptime',
      statSecondarySub: 'with cloud best practices',
    },
    {
      image: '/images/hero/slide-4.svg',
      label: 'Cloud Architecture',
      title: 'Scale Secure infrastructure with',
      highlight: 'Cloud Excellence',
      description:
        'Design resilient multi-cloud systems with strong security, observability, and cost governance.',
      statPrimaryValue: '-45%',
      statPrimaryLabel: 'Infra Cost Savings',
      statPrimarySub: 'through rightsizing and FinOps',
      statSecondaryValue: '+99%',
      statSecondaryLabel: 'Reliability Score',
      statSecondarySub: 'after architecture redesign',
    },
    {
      image: '/images/hero/slide-5.svg',
      label: 'Courses & Team Enablement',
      title: 'Upskill Engineering teams with',
      highlight: 'Hands-on Learning',
      description:
        'Practical AI and cloud courses designed for real project delivery, not only theory.',
      statPrimaryValue: '200+',
      statPrimaryLabel: 'Students Trained',
      statPrimarySub: 'through guided cohorts',
      statSecondaryValue: '+67%',
      statSecondaryLabel: 'Skill Readiness',
      statSecondarySub: 'in post-training assessments',
    },
  ];

  readonly index = signal(0);
  readonly previousIndex = signal(0);
  readonly isAnimating = signal(false);
  readonly current = computed(() => this.slides[this.index()]);
  readonly previous = computed(() => this.slides[this.previousIndex()]);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    if (this.animationTimerId) {
      clearTimeout(this.animationTimerId);
      this.animationTimerId = null;
    }
  }

  next(): void {
    const target = (this.index() + 1) % this.slides.length;
    this.transitionTo(target);
  }

  prev(): void {
    const target = this.index() === 0 ? this.slides.length - 1 : this.index() - 1;
    this.transitionTo(target);
  }

  goTo(target: number): void {
    this.transitionTo(target);
  }

  pauseOnHover(): void {
    this.stopAutoPlay();
  }

  resumeOnHover(): void {
    this.startAutoPlay();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
    this.touchCurrentX = this.touchStartX;
    this.pauseOnHover();
  }

  onTouchMove(event: TouchEvent): void {
    this.touchCurrentX = event.changedTouches[0]?.clientX ?? this.touchCurrentX;
  }

  onTouchEnd(): void {
    const deltaX = this.touchCurrentX - this.touchStartX;

    if (Math.abs(deltaX) >= this.swipeThreshold) {
      if (deltaX < 0) {
        this.next();
      } else {
        this.prev();
      }
    }

    this.touchStartX = 0;
    this.touchCurrentX = 0;
    this.resumeOnHover();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prev();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    }
  }

  private startAutoPlay(): void {
    if (!isPlatformBrowser(this.platformId) || this.timerId) {
      return;
    }

    this.timerId = setInterval(() => {
      this.next();
    }, 6000);
  }

  private stopAutoPlay(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private transitionTo(target: number): void {
    if (target === this.index() || this.isAnimating()) {
      return;
    }

    this.previousIndex.set(this.index());
    this.index.set(target);
    this.isAnimating.set(true);

    if (this.animationTimerId) {
      clearTimeout(this.animationTimerId);
    }

    this.animationTimerId = setTimeout(() => {
      this.isAnimating.set(false);
      this.animationTimerId = null;
    }, 650);
  }
}
