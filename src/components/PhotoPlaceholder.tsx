/**
 * Warm, tasteful placeholder used wherever a real photo will eventually
 * go. Swap these out for real photos by replacing this component's usage
 * with a Next.js <Image> pointing at a file in /public — see
 * README-DEPLOY.md → "Swapping in real photos".
 */
export default function PhotoPlaceholder({
  label,
  className = "",
  tone = "clay",
}: {
  label: string;
  className?: string;
  tone?: "clay" | "sage";
}) {
  const gradient =
    tone === "clay"
      ? "from-[#e7c9a9] via-[#dba97e] to-[#c1592c]/70"
      : "from-[#dbe3d2] via-[#c3d0b4] to-[#7c9070]/70";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,#2b2621_1px,transparent_0)] [background-size:16px_16px]" />
      <span className="relative rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70">
        {label}
      </span>
    </div>
  );
}
