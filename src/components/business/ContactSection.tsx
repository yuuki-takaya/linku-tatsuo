"use client";

import { useEffect } from "react";
import { CONTACT_EMAIL, operator } from "@/lib/data/business";

const TALLY_FORM_ID = process.env.NEXT_PUBLIC_TALLY_FORM_ID;

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

export default function ContactSection() {
  useEffect(() => {
    if (!TALLY_FORM_ID) return;
    const SRC = "https://tally.so/widgets/embed.js";
    const load = () => window.Tally?.loadEmbeds();
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      load();
      return;
    }
    const script = document.createElement("script");
    script.src = SRC;
    script.onload = load;
    document.body.appendChild(script);
  }, []);

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
        <p className="text-sm text-gray-500 text-center leading-relaxed mb-10">
          サービス内容・料金・導入について、お気軽にご相談ください。
          <br />
          担当より折り返しご連絡いたします。
        </p>

        {TALLY_FORM_ID ? (
          <iframe
            data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            loading="lazy"
            width="100%"
            height="500"
            title="お問い合わせフォーム"
            className="w-full"
          />
        ) : (
          <div className="text-center border border-dashed border-gray-300 rounded-lg p-10">
            <p className="text-sm text-gray-500 mb-4">
              お問い合わせは下記メールアドレスまでお願いいたします。
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity"
            >
              {CONTACT_EMAIL} にメールする
            </a>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          フォームが表示されない場合は{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand underline">
            {CONTACT_EMAIL}
          </a>{" "}
          までご連絡ください。
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
