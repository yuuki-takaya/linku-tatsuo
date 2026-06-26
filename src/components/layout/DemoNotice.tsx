export default function DemoNotice() {
  return (
    <aside
      aria-label="デモサイトに関するお知らせ"
      className="bg-brand/5 border-b border-brand/15"
    >
      <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-start gap-2.5">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 mt-px shrink-0 text-brand"
        >
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h1a1 1 0 1 0 0-2v-3a1 1 0 0 0-1-1H9Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-[11px] md:text-xs leading-relaxed text-gray-600 space-y-1">
          <p>
            本サイトは
            <span className="font-medium text-gray-800">
              10月ローンチに向けた公開デモサイト
            </span>
            です（掲載記事はすべて事前に許可をいただいたサンプルです）。
          </p>
          <p>
            10月の本ローンチ以降、学生の皆様のストーリー記事は
            <span className="font-medium text-brand">
              完全会員制のシークレット空間
            </span>
            でのみ公開されます。一般のネット検索（Google等）にヒットしたり、第三者に勝手に見られたりする心配はありませんので、安心してご登録ください。
          </p>
        </div>
      </div>
    </aside>
  );
}
