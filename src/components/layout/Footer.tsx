import Link from "next/link";
import { operator } from "@/lib/data/business";
import ContactButton from "@/components/contact/ContactButton";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <span className="text-lg font-bold tracking-[0.25em] text-gray-900">
              LINK U
            </span>
            <p className="text-xs text-gray-400 tracking-wide mt-2">
              履歴書に書けないこと。そこに、会いたい理由がある。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション" className="flex flex-col gap-2">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              インタビュー一覧
            </Link>
            <Link
              href="/business"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              企業の方へ
            </Link>
            <ContactButton
              variant="link"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors text-left"
            >
              お問い合わせ
            </ContactButton>
          </nav>

          <div className="text-xs text-gray-500 leading-relaxed">
            <p>
              {operator.service.role}：{operator.service.company}
            </p>
            <p>
              {operator.sales.role}：{operator.sales.company}
            </p>
            <p className="mt-1">{operator.site}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mt-10 border-t border-gray-100 pt-6">
          本サイトは10月ローンチに向けた公開デモサイトです（掲載記事はすべて事前に許可をいただいたサンプルです）。本ローンチ以降、学生の皆様のストーリー記事は<span className="text-gray-600">完全会員制のシークレット空間</span>でのみ公開され、一般のネット検索や第三者への公開はされません。
        </p>

        <p className="text-xs text-gray-300 mt-6">
          © {new Date().getFullYear()} LINK U. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
