import Image from "next/image";
import { Article, Person } from "@/types";
import { formatDate } from "@/lib/utils/formatDate";

interface ArticleHeaderProps {
  article: Article;
  person: Person;
}

export default function ArticleHeader({ article, person }: ArticleHeaderProps) {
  return (
    <div>
      {/* Hero image */}
      <div className="relative w-full aspect-[21/9] bg-gray-100">
        <Image
          src={article.thumbnailUrl}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Header content */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-gray-900 mb-8 tracking-wide">
          {article.title}
        </h1>

        {/* Meta row */}
        <div className="flex items-center justify-between border-y border-gray-100 py-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
              <Image
                src={person.imageUrl}
                alt={person.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-xs text-gray-400">{person.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">
              {formatDate(article.publishedAt)}
            </p>
            <p className="text-xs text-gray-400">約{article.readingTimeMin}分</p>
          </div>
        </div>
        {article.hashtags && article.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.hashtags.map((tag) => (
              <span key={tag} className="text-xs text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
