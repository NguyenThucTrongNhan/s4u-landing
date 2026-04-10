export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string — will come from CMS rich-text renderer
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string; // ISO date string
  readTimeMin: number;
  coverImage?: string;
  featured?: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export type ArticleCategory = 'All' | 'AI' | 'Cloud' | 'Business' | 'Tutorial' | 'News';
