import { CONTACT_EMAIL, operator } from "@/lib/data/business";
import ContactButton from "@/components/contact/ContactButton";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 scroll-mt-20 bg-gray-50/60 border-t border-gray-100"
    >
      <div className="max-w-3xl mx-auto px-6">
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3 text-center">
          Contact
        </span>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide text-center mb-4">
          お問い合わせ・ご相談
        </h2>
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-8">
          サービス内容・料金・導入について、お気軽にご相談ください。
          <br />
          下のボタンから相談フォームが開きます。
        </p>

        <div className="text-center">
          <ContactButton>お問い合わせフォームを開く</ContactButton>
        </div>

        <p className="text-xs text-gray-400 text-center mt-6">
          メールでも受け付けています：{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline">
            {CONTACT_EMAIL}
          </a>
        </p>

        <div className="mt-14 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-500">
          <div>
            <p className="text-gray-900 font-medium">
              {operator.service.role}：{operator.service.company}
            </p>
            <p className="mt-1">
              TEL{" "}
              <a
                href={`tel:${operator.service.tel}`}
                className="hover:underline"
              >
                {operator.service.tel}
              </a>
            </p>
            <a
              href={`mailto:${operator.service.email}`}
              className="text-brand hover:underline"
            >
              {operator.service.email}
            </a>
          </div>
          <div>
            <p className="text-gray-900 font-medium">
              {operator.sales.role}：{operator.sales.company}
            </p>
            <p className="mt-1">
              TEL{" "}
              <a href={`tel:${operator.sales.tel}`} className="hover:underline">
                {operator.sales.tel}
              </a>
            </p>
            <a
              href={`mailto:${operator.sales.email}`}
              className="text-brand hover:underline"
            >
              {operator.sales.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
