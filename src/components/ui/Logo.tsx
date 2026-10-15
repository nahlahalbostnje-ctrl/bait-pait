export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="55%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#lg)" opacity="0.18" />
      <path
        d="M12 38 L32 14 L52 38 V50 H12 Z"
        fill="none"
        stroke="url(#lg)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <rect x="24" y="36" width="16" height="14" rx="2" fill="#8B5CF6" opacity="0.9" />
      <path d="M28 24h8M30 20h4" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
