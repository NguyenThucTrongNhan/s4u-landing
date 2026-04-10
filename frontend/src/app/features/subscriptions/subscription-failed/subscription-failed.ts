import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-subscription-failed',
  imports: [RouterLink],
  templateUrl: './subscription-failed.html',
  styleUrl: './subscription-failed.scss',
})
export class SubscriptionFailed implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage(
      'Subscription Failed | AI Solutions',
      'Your subscription could not be processed. Please retry payment or contact support.',
      'subscription failed, payment error'
    );
  }
}
