import type { LucideIcon } from "lucide-react";

const tones = [
  "from-[#C4B5FD] via-[#7C3AED] to-[#4C1D95]",
  "from-[#67E8F9] via-[#06B6D4] to-[#0E7490]",
  "from-[#F9A8D4] via-[#EC4899] to-[#9D174D]",
  "from-[#DDD6FE] via-[#8B5CF6] to-[#5B21B6]",
];

export function ClayIcon({
  icon: Icon,
  index = 0,
  className = "",
}: {
  icon: LucideIcon;
  index?: number;
  className?: string;
}) {
  return (
    <div className={`icon-3d mb-5 inline-flex h-[76px] w-[76px] items-center justify-center ${className}`}>
      <div
        className={`clay-orb flex h-full w-full items-center justify-center bg-gradient-to-br ${tones[index % tones.length]} text-white`}
      >
        <Icon className="h-8 w-8 drop-shadow-[0_8px_12px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}
