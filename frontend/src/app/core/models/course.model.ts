export interface Course {
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'AI' | 'Cloud' | 'Engineering' | 'Business';
  duration: string;
  format: 'Live Online' | 'Self-paced' | 'Hybrid';
  priceLabel: string;
  summary: string;
  outcomes: string[];
  curriculum: string[];
  detailHtml: string;
}
