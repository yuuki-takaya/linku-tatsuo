import { flowColumns } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading eyebrow="How it works" title="LINK Uの仕組み" />
        <p className="text-sm text-gray-500 -mt-8 mb-12">
          学生の人柄を知ってから、会って、つながる。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flowColumns.map((c, i) => {
            const highlight = i === 1;
            return (
              <div
                key={i}
                className={`rounded-lg p-6 ${
                  highlight ? "bg-brand text-white" : "border border-gray-200"
                }`}
              >
                <p
                  className={`font-medium mb-4 ${
                    highlight ? "text-white" : "text-gray-900"
                  }`}
                >
                  {c.label}
                </p>
                <ul className="space-y-2">
                  {c.points.map((pt, j) => (
                    <li
                      key={j}
                      className={`text-sm leading-relaxed ${
                        highlight ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      ・{pt}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
