import { marketStats } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function MarketStats() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Data"
          title="採用環境は、年々厳しくなっています。"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {marketStats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-sm text-gray-500 mb-2">{s.label}</p>
              <p className="text-5xl font-bold text-brand tracking-tight">
                {s.value}
                <span className="text-xl ml-1">{s.unit}</span>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mt-3">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
