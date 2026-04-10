export interface Product {
  slug: string;
  name: string;
  category: 'SaaS' | 'Service' | 'Platform';
  summary: string;
  priceLabel: string;
  audience: string;
  features: string[];
  outcomes: string[];
  descriptionHtml: string;
}
