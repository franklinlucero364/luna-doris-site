/**
 * Warm, tasteful placeholder used wherever a real photo will eventually
 * go. Swap these out for real photos by replacing this component's usage
 * with a Next.js <Image> pointing at a file in /public — see
 * README.md → "Swapping in real photos".
 */
export default function PhotoPlaceholder({
  label,
  className = "",
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const gradient =
    tone === "dark"
      ? "from-[#1c4256] via-[#164054] to-[#3f9cc5]/40"
      : "from-[#dceef5] via-[#bcdcea] to-[#3f9cc5]/50";

  const labelStyle =
    tone === "dark" ? "bg-white/10 text-white" : "bg-white/80 text-foreground/70";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:16px_16px]" />
      <span className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide ${labelStyle}`}>
        {label}
      </span>
    </div>
  );
}
