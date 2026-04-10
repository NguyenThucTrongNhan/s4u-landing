import { Component } from '@angular/core';

@Component({
  selector: 'app-about-capabilities',
  templateUrl: './about-capabilities.html',
  styleUrl: './about-capabilities.scss',
})
export class AboutCapabilities {
  capabilities = [
    {
      title: 'AI Product Engineering',
      text: 'From idea to production-grade AI features with strong quality and governance.',
    },
    {
      title: 'Cloud & Platform Architecture',
      text: 'Resilient, secure, and cost-efficient infrastructure design for modern workloads.',
    },
    {
      title: 'Team Enablement & Training',
      text: 'Hands-on training programs that help teams ship confidently and sustainably.',
    },
  ];
}
