import Image from "next/image";
import Link from "next/link";
import { Article, Person } from "@/types";

interface ArticleCardProps {
  article: Article;
  person: Person;
}

export default function ArticleCard({ article, person }: ArticleCardProps) {
  return (
    <article className="group">
      {/* Thumbnail */}
      <Link
        href={`/articles/${article.slug}`}
        className="block overflow-hidden mb-4"
      >
        <div className="relative aspect-[16/10] bg-gray-100">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Title */}
      <h2 className="text-base font-medium leading-snug text-gray-900 mb-2 line-clamp-2">
        <Link
          href={`/articles/${article.slug}`}
          className="hover:opacity-70 transition-opacity"
        >
          {article.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">
        {article.excerpt}
      </p>

      {/* Person attribution */}
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={person.imageUrl}
            alt={person.name}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-800">{person.name}</p>
          <p className="text-xs text-gray-400">{person.title}</p>
        </div>
      </div>
    </article>
  );
}
