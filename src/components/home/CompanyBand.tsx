import Link from "next/link";
import ContactButton from "@/components/contact/ContactButton";

export default function CompanyBand() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/60">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-2">
            For Companies
          </span>
          <p className="text-lg md:text-xl font-medium text-gray-900 leading-snug">
            採用ご担当者の方へ。記事を読んで、気になる学生に会いに行けます。
          </p>
          <p className="text-sm text-gray-500 mt-2">
            新潟の学生と出会う、新しい採用のかたち。
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/business"
            className="px-5 py-2.5 text-sm font-medium text-white bg-brand rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            企業の方へ
          </Link>
          <ContactButton variant="outline">お問い合わせ</ContactButton>
        </div>
      </div>
    </section>
  );
}
