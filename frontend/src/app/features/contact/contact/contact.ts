import { Component, OnInit, inject } from '@angular/core';
import { Seo } from '../../../core/services/seo';
import { ContactHero } from '../components/contact-hero/contact-hero';
import { DemoRequestForm } from '../components/demo-request-form/demo-request-form';
import { ContactChannels } from '../components/contact-channels/contact-channels';

@Component({
  selector: 'app-contact',
  imports: [ContactHero, DemoRequestForm, ContactChannels],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage(
      'Contact & Book Demo | AI Solutions',
      'Contact our team for demos, consulting inquiries, and subscription guidance.',
      'contact ai solutions, book demo, consulting inquiry'
    );
  }
}
