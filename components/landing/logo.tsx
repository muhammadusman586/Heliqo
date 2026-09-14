// Heliqo mark: an "H" with a taller right leg and a gently rising crossbar (growth),
// on a sunset-orange tile. The same shape is the favicon in app/icon.svg — keep the two in sync.

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 rounded-[28%] bg-gradient-to-br from-brand-amber via-brand to-brand-deep ${className}`}
    >
      <svg viewBox="0 0 32 32" className="w-full h-full" fill="#0b0b0c">
        <rect x="8.5" y="11" width="4" height="13" rx="1.5" />
        <rect x="19.5" y="8" width="4" height="16" rx="1.5" />
        <path d="M12.5 15.5 19.5 13.5v3l-7 2z" />
      </svg>
    </span>
  );
}
