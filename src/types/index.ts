export interface Tag {
  id: string;
  label: string;
}

export interface Person {
  id: string;
  name: string;
  nameRoman: string;
  title: string;
  bio: string;
  imageUrl: string;
  tags: Tag[];
}

export interface ArticleSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content: string;
  caption?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  personId: string;
  publishedAt: string;
  thumbnailUrl: string;
  tags: Tag[];
  body: ArticleSection[];
  readingTimeMin: number;
  isFeatured: boolean;
  hashtags?: string[];
}
