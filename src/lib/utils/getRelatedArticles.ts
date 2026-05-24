import { Article } from "@/types";
import { getAllArticles } from "@/lib/content";

export function getRelatedArticles(current: Article, count: number): Article[] {
  const currentTagIds = new Set(current.tags.map((t) => t.id));

  const articles = getAllArticles();
  return articles
    .filter((a) => a.slug !== current.slug)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => currentTagIds.has(t.id)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.article.publishedAt).getTime() -
          new Date(a.article.publishedAt).getTime()
    )
    .slice(0, count)
    .map((r) => r.article);
}
