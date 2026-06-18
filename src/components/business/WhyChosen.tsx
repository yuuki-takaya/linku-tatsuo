import { reasons } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function WhyChosen() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="Why LINK U" title="LINK Uが選ばれる理由" />
        <div className="space-y-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white p-8 md:flex md:gap-8">
              <div className="md:w-1/3">
                <span className="text-sm font-bold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-medium text-gray-900 mt-1">
                  {r.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed md:w-2/3 mt-3 md:mt-0">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
