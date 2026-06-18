import { plans } from "@/lib/data/business";
import SectionHeading from "./SectionHeading";
import ContactButton from "@/components/contact/ContactButton";

export default function PricingPlans() {
  return (
    <section className="py-20 bg-gray-50/60">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="Pricing" title="料金プラン" centered />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-xl p-8 ${
                plan.popular ? "border-2 border-brand" : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-8 bg-brand text-white text-xs px-3 py-1 rounded-full">
                  一番人気
                </span>
              )}
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">{plan.target}</p>
              <p className="mb-6">
                <span className="text-4xl font-bold text-brand">
                  {plan.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">{plan.unit}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start justify-between text-sm border-b border-gray-50 pb-2"
                  >
                    <span className="text-gray-700">{f.label}</span>
                    <span className="text-gray-500 text-xs ml-3 whitespace-nowrap">
                      {f.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-6">
          成果報酬は0円。年会費以外の費用はかかりません。
        </p>
        <div className="text-center mt-8">
          <ContactButton>プランについて相談する</ContactButton>
        </div>
      </div>
    </section>
  );
}
