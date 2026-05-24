"use client";

import { useState, useMemo } from "react";
import { Article, Person } from "@/types";
import ArticleCard from "@/components/ui/ArticleCard";

interface SearchableArticleGridProps {
  articles: Article[];
  people: Person[];
}

export default function SearchableArticleGrid({
  articles,
  people,
}: SearchableArticleGridProps) {
  const [query, setQuery] = useState("");

  const getPersonById = (personId: string): Person => {
    return people.find((p) => p.id === personId) || people[0];
  };

  const filteredArticles = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return articles;

    const keywords = trimmed.split(/\s+/);

    return articles.filter((article) => {
      const person = getPersonById(article.personId);

      // Build searchable text from all fields
      const tagLabels = article.tags.map((t) => t.label).join(" ");
      const personTags = person.tags.map((t) => t.label).join(" ");
      const bodyText = article.body.map((s) => s.content).join(" ");

      const searchTarget = [
        article.title,
        article.excerpt,
        tagLabels,
        person.name,
        person.nameRoman,
        person.title, // contains university
        person.bio,
        personTags,
        bodyText,
      ]
        .join(" ")
        .toLowerCase();

      // All keywords must match (AND search)
      return keywords.every((kw) => searchTarget.includes(kw));
    });
  }, [query, articles, people]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-10">
          <span className="text-xs tracking-[0.35em] text-gray-400 uppercase whitespace-nowrap">
            Latest
          </span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Search bar */}
        <div className="relative mb-14">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="名前・大学・タグ・キーワードで検索"
            className="w-full pl-11 pr-4 py-3 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white transition-colors placeholder:text-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Results count when searching */}
        {query.trim() && (
          <p className="text-xs text-gray-400 mb-8 -mt-8">
            {filteredArticles.length}件の記事が見つかりました
          </p>
        )}

        {/* Article grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                person={getPersonById(article.personId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm text-gray-400">
              「{query.trim()}」に一致する記事が見つかりませんでした
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
