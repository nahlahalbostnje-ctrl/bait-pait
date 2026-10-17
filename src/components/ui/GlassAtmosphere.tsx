export function GlassAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="site-aurora" />
      <div className="orb absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#8B5CF6]/22" />
      <div
        className="orb absolute right-[-5rem] top-[38%] h-80 w-80 rounded-full bg-[#06B6D4]/14"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="orb absolute bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#EC4899]/12"
        style={{ animationDelay: "-7s" }}
      />
      <div className="site-floor" />
      <div className="glass-shard shine-panel absolute left-[6%] top-[118vh] h-36 w-56 rotate-[-16deg]" />
      <div
        className="glass-shard shine-panel absolute right-[8%] top-[168vh] h-28 w-48 rotate-[20deg]"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="glass-shard shine-panel absolute left-[38%] top-[214vh] h-24 w-40 rotate-[-8deg]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="glass-shard shine-panel absolute right-[18%] top-[268vh] h-32 w-44 rotate-[12deg]"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
