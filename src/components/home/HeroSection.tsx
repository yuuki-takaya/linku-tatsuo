"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Person, Article } from "@/types";

interface HeroSectionProps {
  people: Person[];
  articles: Article[];
}

function pickRandom7(arr: Person[]): Person[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 7);
}

export default function HeroSection({ people, articles }: HeroSectionProps) {
  const [displayed, setDisplayed] = useState<Person[]>(people.slice(0, 7));

  useEffect(() => {
    setDisplayed(pickRandom7(people));
  }, [people]);

  const getFeaturedSlug = (personId: string): string => {
    const article = articles.find((a) => a.personId === personId);
    return article ? article.slug : "/";
  };

  return (
    <section className="relative overflow-x-auto no-scrollbar">
      {/* People strip */}
      <div className="flex min-w-max md:min-w-0">
        {displayed.map((person) => (
          <Link
            key={person.id}
            href={`/articles/${getFeaturedSlug(person.id)}`}
            className="relative flex-1 min-w-[140px] md:min-w-0 group overflow-hidden"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src={person.imageUrl}
              alt={person.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 140px, 14vw"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Name on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-[10px] tracking-widest text-white/70 uppercase mb-0.5">
                {person.nameRoman}
              </p>
              <p className="text-sm font-medium text-white leading-tight">
                {person.name}
              </p>
            </div>

            {/* Subtle divider between photos */}
            <div className="absolute inset-y-0 right-0 w-px bg-white/20" />
          </Link>
        ))}
      </div>

      {/* Catchphrase overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-black/35" />

        {/* Text */}
        <div className="relative text-center px-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-wide text-white drop-shadow-sm">
            履歴書に書けないこと。
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-light text-white/75 mt-2 tracking-wide drop-shadow-sm">
            そこに、会いたい理由がある。
          </p>
        </div>
      </div>
    </section>
  );
}
