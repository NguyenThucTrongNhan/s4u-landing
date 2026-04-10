import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-channels',
  templateUrl: './contact-channels.html',
  styleUrl: './contact-channels.scss',
})
export class ContactChannels {
  channels = [
    { title: 'Email', value: 'hello@aisolutions.com' },
    { title: 'Sales Line', value: '+1 (555) 2026-100' },
    { title: 'LinkedIn', value: 'linkedin.com/company/aisolutions' },
  ];
}
