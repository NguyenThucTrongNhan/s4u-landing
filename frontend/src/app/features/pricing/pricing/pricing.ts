import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../../core/services/seo';

type BillingCycle = 'monthly' | 'yearly';
type SubscriptionMethod = 'card' | 'bank' | 'invoice';
type RunMode = 'cloud' | 'standalone';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  featured?: boolean;
}

@Component({
  selector: 'app-pricing',
  imports: [RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements OnInit {
  private readonly seo = inject(Seo);

  billingCycle = signal<BillingCycle>('monthly');
  subscriptionMethod = signal<SubscriptionMethod>('card');
  runMode = signal<RunMode>('cloud');

  plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      monthlyPrice: 49,
      yearlyPrice: 39,
      description: 'For early teams shipping their first AI-enabled workflows.',
      features: [
        '1 production workspace',
        'Email support',
        'Basic analytics and monitoring',
      ],
    },
    {
      id: 'growth',
      name: 'Growth',
      monthlyPrice: 129,
      yearlyPrice: 109,
      description: 'For scaling teams with higher reliability and automation needs.',
      featured: true,
      features: [
        '5 production workspaces',
        'Priority support and SLA',
        'Advanced usage and cost controls',
      ],
    },
    {
      id: 'scale',
      name: 'Scale',
      monthlyPrice: 299,
      yearlyPrice: 259,
      description: 'For organizations with multi-team deployments and governance requirements.',
      features: [
        'Unlimited workspaces',
        'SSO + role-based access control',
        'Dedicated success manager',
      ],
    },
  ];

  ngOnInit(): void {
    this.seo.setPage(
      'Pricing | Plans, Standalone App Run, and Subscription Methods',
      'Compare monthly and yearly plans, choose cloud or standalone app run, and select your subscription method.',
      'pricing, subscription, standalone app, monthly yearly plans'
    );
  }

  setBilling(cycle: BillingCycle): void {
    this.billingCycle.set(cycle);
  }

  setMethod(method: SubscriptionMethod): void {
    this.subscriptionMethod.set(method);
  }

  setRunMode(mode: RunMode): void {
    this.runMode.set(mode);
  }

  getPrice(plan: PricingPlan): number {
    return this.billingCycle() === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  }

  getRunModeLabel(): string {
    if (this.runMode() === 'standalone') {
      return 'Standalone app run includes local deployment package and enterprise license options.';
    }
    return 'Cloud hosted run includes managed infrastructure, updates, and observability.';
  }

  getSubscriptionHint(): string {
    const method = this.subscriptionMethod();
    if (method === 'card') {
      return 'Pay instantly by credit/debit card. Auto-renew enabled.';
    }
    if (method === 'bank') {
      return 'Bank transfer is available for annual subscriptions and enterprise plans.';
    }
    return 'Invoice billing is available for enterprise procurement workflows.';
  }
}
