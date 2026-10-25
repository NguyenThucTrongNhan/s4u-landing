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
      'Liên hệ và demo | S4U',
      'Trao đổi nhu cầu LawFirm và Document Platform qua email.',
      'contact ai solutions, book demo, consulting inquiry'
    );
  }
}
