import Link from "next/link";
import { operator } from "@/lib/data/business";

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

          <nav className="flex flex-col gap-2">
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
            <Link
              href="/business#contact"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              お問い合わせ
            </Link>
          </nav>

          <div className="text-xs text-gray-400 leading-relaxed">
            <p>
              {operator.service.role}：{operator.service.company}
            </p>
            <p>
              {operator.sales.role}：{operator.sales.company}
            </p>
            <p className="mt-1">{operator.site}</p>
          </div>
        </div>

        <p className="text-xs text-gray-300 mt-10">
          © {new Date().getFullYear()} LINK U. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
