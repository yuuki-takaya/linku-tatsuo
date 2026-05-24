import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllArticles } from "@/lib/content";
import { getArticleBySlug, getPersonById } from "@/lib/utils/getArticle";
import { getRelatedArticles } from "@/lib/utils/getRelatedArticles";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleBody from "@/components/article/ArticleBody";
import PersonProfile from "@/components/article/PersonProfile";
import RelatedArticles from "@/components/article/RelatedArticles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = getArticleBySlug(slug);
    return {
      title: `${article.title} | LINK U`,
      description: article.excerpt,
    };
  } catch {
    return { title: "LINK U" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const person = getPersonById(article.personId);
  const related = getRelatedArticles(article, 3);

  return (
    <>
      <ArticleHeader article={article} person={person} />
      <ArticleBody sections={article.body} />
      <PersonProfile person={person} />
      <RelatedArticles articles={related} />
    </>
  );
}
