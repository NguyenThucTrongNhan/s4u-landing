import { Component, OnInit, inject } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { AboutHero } from '../components/about-hero/about-hero';
import { AboutCapabilities } from '../components/about-capabilities/about-capabilities';
import { AboutValues } from '../components/about-values/about-values';

@Component({
  selector: 'app-about',
  imports: [AboutHero, AboutCapabilities, AboutValues],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage(
      'About Us | AI Solutions',
      'Learn about our team, capabilities, and delivery approach for AI and cloud transformation.',
      'about ai solutions, ai consulting company, cloud architecture team'
    );
  }
}
