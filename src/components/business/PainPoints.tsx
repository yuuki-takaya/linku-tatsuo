import { painPoints } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function PainPoints() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Issues" title="こんなお悩みはありませんか？" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((p, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-6 hover:border-brand transition-colors"
            >
              <span className="text-2xl font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
