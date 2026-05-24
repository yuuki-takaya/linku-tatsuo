import { Article, Person } from "@/types";
import ArticleCard from "@/components/ui/ArticleCard";

interface ArticleGridProps {
  articles: Article[];
  people: Person[];
}

export default function ArticleGrid({ articles, people }: ArticleGridProps) {
  const getPersonById = (personId: string): Person => {
    return people.find((p) => p.id === personId) || people[0];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-14">
          <span className="text-xs tracking-[0.35em] text-gray-400 uppercase whitespace-nowrap">
            Latest
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              person={getPersonById(article.personId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
