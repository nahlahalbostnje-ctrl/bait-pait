"use client";

import { useEffect, useRef } from "react";

export function AdminStage() {
  const rig = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rig.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      el.style.setProperty("--ax", `${x}deg`);
      el.style.setProperty("--ay", `${-y - 4}deg`);
      el.style.setProperty("--tx", `${x * 1.8}px`);
      el.style.setProperty("--ty", `${y * 1.4}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="orb absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#8B5CF6]/28" />
      <div
        className="orb absolute right-[-4rem] top-[18%] h-80 w-80 rounded-full bg-[#06B6D4]/16"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="orb absolute bottom-[-3rem] left-[38%] h-64 w-64 rounded-full bg-[#EC4899]/14"
        style={{ animationDelay: "-7s" }}
      />
      <div className="admin-stage absolute inset-0">
        <div ref={rig} className="admin-rig">
          <div className="admin-floor" />
          <div className="admin-slab left-[7%] top-[12%] h-32 w-48" />
          <div className="admin-slab right-[9%] top-[22%] h-24 w-40" style={{ animationDelay: "-5s" }} />
          <div className="admin-slab left-[44%] top-[68%] h-20 w-36" style={{ animationDelay: "-9s" }} />
        </div>
      </div>
    </div>
  );
}
