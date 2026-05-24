export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-lg font-bold tracking-[0.25em] text-gray-900">
          LINK U
        </span>
        <p className="text-xs text-gray-400 tracking-wide">
          履歴書に書けないこと。そこに、会いたい理由がある。
        </p>
        <p className="text-xs text-gray-300">
          © {new Date().getFullYear()} LINK U. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
