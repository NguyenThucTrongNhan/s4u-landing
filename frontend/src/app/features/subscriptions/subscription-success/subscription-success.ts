import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';

@Component({
  selector: 'app-subscription-success',
  imports: [RouterLink],
  templateUrl: './subscription-success.html',
  styleUrl: './subscription-success.scss',
})
export class SubscriptionSuccess implements OnInit {
  private readonly seo = inject(Seo);

  ngOnInit(): void {
    this.seo.setPage(
      'Subscription Success | AI Solutions',
      'Your subscription request was received successfully.',
      'subscription success'
    );
  }
}
