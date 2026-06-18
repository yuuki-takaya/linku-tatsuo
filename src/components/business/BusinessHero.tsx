import Link from "next/link";
import { businessHero } from "@/lib/data/business";

export default function BusinessHero() {
  return (
    <section className="bg-gray-50/60 border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="block text-xs md:text-sm tracking-[0.25em] text-brand mb-5">
          {businessHero.eyebrow}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight tracking-wide">
          {businessHero.titleTop}
          <br />
          <span className="text-brand">{businessHero.titleBottom}</span>
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-8 max-w-2xl mx-auto">
          {businessHero.lead}
        </p>
        <div className="mt-10">
          <Link
            href="#contact"
            className="inline-block px-7 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity"
          >
            お問い合わせ・ご相談
          </Link>
        </div>
      </div>
    </section>
  );
}
