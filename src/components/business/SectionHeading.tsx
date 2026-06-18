interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="block text-xs tracking-[0.35em] text-brand uppercase mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-wide leading-snug">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-gray-500 mt-3">{subtitle}</p>}
    </div>
  );
}
