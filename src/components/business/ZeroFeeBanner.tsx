import { zeroFee } from "@/lib/data/business";

export default function ZeroFeeBanner() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-brand rounded-2xl px-8 py-12 text-center">
          <p className="text-white/80 text-sm tracking-wide mb-2">
            {zeroFee.caption}
          </p>
          <p className="text-4xl md:text-5xl font-bold text-white">
            {zeroFee.title}
          </p>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mt-4 max-w-2xl mx-auto">
            {zeroFee.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
