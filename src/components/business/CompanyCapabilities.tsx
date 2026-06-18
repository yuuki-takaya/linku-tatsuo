import { capabilities } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function CompanyCapabilities() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Features" title="企業ができること" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <span className="text-xs tracking-widest text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-medium text-gray-900 mt-2 mb-3">
                {c.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
