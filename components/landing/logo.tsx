// Heliqo wordmark: lowercase name with a brand-gradient full stop. Size and color come from the
// text classes you pass (the dot scales in em). Favicon counterpart: app/icon.svg ("h" + dot on a dark tile).

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline font-semibold tracking-tight ${className}`}>
      heliqo
      <span
        aria-hidden="true"
        className="inline-block w-[0.26em] h-[0.26em] ml-[0.05em] rounded-full bg-gradient-to-br from-brand-accent via-brand to-brand-deep"
      />
    </span>
  );
}
