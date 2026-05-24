import { getAllArticles } from "@/lib/content";
import { people } from "@/lib/data/people";

export function getArticleBySlug(slug: string) {
  const article = getAllArticles().find((a) => a.slug === slug);
  if (!article) throw new Error(`Article not found: ${slug}`);
  return article;
}

export function getPersonById(id: string) {
  const person = people.find((p) => p.id === id);
  if (!person) throw new Error(`Person not found: ${id}`);
  return person;
}
