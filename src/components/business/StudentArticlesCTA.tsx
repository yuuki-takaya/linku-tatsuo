import Link from "next/link";

export default function StudentArticlesCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3">
          Proof
        </span>
        <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide leading-snug">
          まずは、学生たちの記事を読んでみてください。
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mt-4 max-w-2xl mx-auto">
          プロの取材でつくられた200名以上のストーリー。これが、貴社に届く「質の高い母集団」です。
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-7 py-3 text-sm font-medium text-brand border border-brand rounded-md hover:bg-brand hover:text-white transition-colors"
        >
          学生の記事を見る
        </Link>
      </div>
    </section>
  );
}
