import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Seo } from '../../../core/services/seo';

type BillingCycle = 'monthly' | 'yearly';
type PaymentMethod = 'card' | 'bank' | 'invoice';
type RunMode = 'cloud' | 'standalone';

interface PlanConfig {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
}

const PLAN_CONFIGS: PlanConfig[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: 'For early teams shipping their first AI-enabled workflows.',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 129,
    yearlyPrice: 109,
    description: 'For scaling teams with higher reliability and automation needs.',
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: 299,
    yearlyPrice: 259,
    description: 'For organizations with multi-team deployments and governance requirements.',
  },
];

@Component({
  selector: 'app-subscription-detail',
  imports: [RouterLink, FormsModule],
  templateUrl: './subscription-detail.html',
  styleUrl: './subscription-detail.scss',
})
export class SubscriptionDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly seo = inject(Seo);

  selectedPlan = signal<PlanConfig | null>(null);
  notFound = signal(false);

  billingCycle = signal<BillingCycle>('monthly');
  paymentMethod = signal<PaymentMethod>('card');
  runMode = signal<RunMode>('cloud');

  companyName = '';
  contactEmail = '';
  seats = 5;
  note = '';

  cardNumber = '';
  cardHolder = '';
  expiry = '';
  cvv = '';

  bankAccountName = '';
  bankReference = '';

  invoiceCompany = '';
  invoiceTaxId = '';

  submitted = signal(false);

  ngOnInit(): void {
    const planId = this.route.snapshot.paramMap.get('plan') ?? '';
    const plan = PLAN_CONFIGS.find((item) => item.id === planId);

    if (!plan) {
      this.notFound.set(true);
      return;
    }

    this.selectedPlan.set(plan);

    const billing = this.route.snapshot.queryParamMap.get('billing');
    const method = this.route.snapshot.queryParamMap.get('method');
    const runMode = this.route.snapshot.queryParamMap.get('runMode');

    if (billing === 'monthly' || billing === 'yearly') {
      this.billingCycle.set(billing);
    }
    if (method === 'card' || method === 'bank' || method === 'invoice') {
      this.paymentMethod.set(method);
    }
    if (runMode === 'cloud' || runMode === 'standalone') {
      this.runMode.set(runMode);
    }

    this.seo.setPage(
      `${plan.name} Subscription | Checkout`,
      `Complete your ${plan.name} subscription and choose payment method.`,
      'subscription checkout, payment method, billing'
    );
  }

  setBilling(cycle: BillingCycle): void {
    this.billingCycle.set(cycle);
  }

  setPaymentMethod(method: PaymentMethod): void {
    this.paymentMethod.set(method);
  }

  setRunMode(mode: RunMode): void {
    this.runMode.set(mode);
  }

  getUnitPrice(): number {
    const plan = this.selectedPlan();
    if (!plan) {
      return 0;
    }
    return this.billingCycle() === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  }

  getTotalPrice(): number {
    return this.getUnitPrice() * this.seats;
  }

  getBillingLabel(): string {
    return this.billingCycle() === 'monthly' ? 'monthly' : 'yearly';
  }

  submitSubscription(): void {
    if (!this.companyName || !this.contactEmail || this.seats < 1) {
      return;
    }

    const method = this.paymentMethod();
    const cardInvalid =
      method === 'card' && (!this.cardNumber || !this.cardHolder || !this.expiry || !this.cvv);

    if (cardInvalid) {
      this.router.navigate(['/subscriptions/failed'], {
        queryParams: { reason: 'missing-card-fields' },
      });
      return;
    }

    this.submitted.set(true);
    this.router.navigate(['/subscriptions/success'], {
      queryParams: {
        plan: this.selectedPlan()?.id,
        method,
        runMode: this.runMode(),
      },
    });
  }
}
