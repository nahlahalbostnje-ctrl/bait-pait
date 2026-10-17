"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import type { SiteStat } from "@/lib/site-defaults";

const defaultStats: SiteStat[] = [
  { value: 400, suffix: "+", label: "مشروع منجز بنجاح" },
  { value: 100, suffix: "+", label: "مؤسسة ونظام يعمل بكفاءة" },
  { value: 13, suffix: "", label: "سنة من الخبرة المتراكمة" },
  { value: 10, suffix: "", label: "مسارات تدريبية معتمدة" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="title-3d font-latin text-5xl font-black text-white md:text-6xl">
      {suffix}
      {n}
    </span>
  );
}

export function Stats({ items = defaultStats }: { items?: SiteStat[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading kicker="الإنجازات" title="أرقام تضيء مسيرة أكثر من عقد" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s) => (
            <TiltCard key={s.label} className="group">
              <div className="glass rounded-[1.7rem] p-7 text-center shadow-glow">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 text-ink-mute">{s.label}</p>
              </div>
            </TiltCard>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-mute">Live Metrics · أرقام تتحرك عند الوصول إليها</p>
      </div>
    </section>
  );
}
