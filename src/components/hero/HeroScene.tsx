"use client";

import dynamic from "next/dynamic";

const HeroWorld = dynamic(() => import("@/components/three/HeroWorld").then((m) => m.HeroWorld), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-28 w-28 animate-pulse rounded-full bg-brand/25 shadow-glow" />
    </div>
  ),
});

export function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-visible">
      <HeroWorld />
    </div>
  );
}
