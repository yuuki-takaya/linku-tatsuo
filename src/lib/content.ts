import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleSection, Tag } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content/articles");

function parseMarkdownBody(markdown: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      sections.push({ type: "heading", content: line.slice(3) });
    } else if (line.startsWith("> ")) {
      sections.push({ type: "quote", content: line.slice(2) });
    } else {
      const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (img) {
        sections.push({ type: "image", content: img[2], caption: img[1] || undefined });
      } else {
        sections.push({ type: "paragraph", content: line });
      }
    }
  }
  return sections;
}

function loadArticle(slug: string): Article {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    personId: data.personId as string,
    publishedAt:
      data.publishedAt instanceof Date
        ? data.publishedAt.toISOString().slice(0, 10)
        : String(data.publishedAt),
    thumbnailUrl: data.thumbnailUrl as string,
    tags: (data.tags ?? []) as Tag[],
    isFeatured: Boolean(data.isFeatured),
    readingTimeMin: Number(data.readingTimeMin),
    hashtags: (data.hashtags ?? []) as string[],
    body: parseMarkdownBody(content),
  };
}

let _cache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (_cache) return _cache;
  _cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => loadArticle(f.replace(/\.md$/, "")));
  _cache.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return _cache;
}

export function getArticleBySlug(slug: string): Article {
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) throw new Error(`Article not found: ${slug}`);
  return article;
}
