import Image from "next/image";
import { ArticleSection } from "@/types";

interface ArticleBodyProps {
  sections: ArticleSection[];
}

export default function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <article className="max-w-2xl mx-auto px-6 pb-16">
      {sections.map((section, i) => {
        if (section.type === "paragraph") {
          return (
            <p
              key={i}
              className="text-base text-gray-700 leading-8 mb-6 tracking-wide"
            >
              {section.content}
            </p>
          );
        }

        if (section.type === "heading") {
          return (
            <h2
              key={i}
              className="text-xl font-semibold text-gray-900 mt-14 mb-5 tracking-wide"
            >
              {section.content}
            </h2>
          );
        }

        if (section.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-gray-900 pl-6 my-10 bg-gray-50 py-6 pr-6"
            >
              <p className="text-lg text-gray-800 leading-relaxed tracking-wide">
                {section.content}
              </p>
            </blockquote>
          );
        }

        if (section.type === "image") {
          return (
            <figure key={i} className="my-10">
              <Image
                src={section.content}
                alt={section.caption || ""}
                width={0}
                height={0}
                sizes="(max-width: 768px) 100vw, 672px"
                className="w-full h-auto"
              />
              {section.caption && (
                <figcaption className="text-xs text-gray-400 text-center mt-2">
                  {section.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </article>
  );
}
