"use client";

import dynamic from "next/dynamic";

const WorldBackground = dynamic(
  () => import("@/components/three/WorldBackground").then((m) => m.WorldBackground),
  { ssr: false },
);

export function LuxuryBackdrop() {
  return <WorldBackground />;
}
