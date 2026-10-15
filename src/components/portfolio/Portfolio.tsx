"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { WORKS, type WorkSector } from "@/lib/works";

const filters: { id: "all" | WorkSector; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "food", label: "طعام وتوصيل" },
  { id: "productivity", label: "إنتاجية" },
  { id: "lifestyle", label: "نمط حياة" },
  { id: "business", label: "أعمال" },
];

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const list = useMemo(
    () => (filter === "all" ? WORKS : WORKS.filter((w) => w.sector === filter)),
    [filter],
  );

  return (
    <section id="portfolio" className="relative bg-[#120924] py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          kicker="Immersive Portfolio"
          title="معرض الأعمال"
          subtitle="كل تطبيق بشعاره الرسمي كما هو على Google Play."
        />

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                filter === f.id ? "bg-brand text-white shadow-glow" : "glass text-[#94A3B8] hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((app) => (
              <motion.div
                layout
                key={app.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <TiltCard className="group h-full">
                  <article className="glass flex h-full flex-col overflow-hidden rounded-[1.6rem]">
                    <div className="flex h-44 items-center justify-center bg-[#0b0616] p-4">
                      {app.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={app.cover} alt={app.name} className="max-h-36 w-auto max-w-full object-contain" />
                      ) : (
                        <p className="text-sm text-[#94A3B8]">{app.name}</p>
                      )}
                    </div>
                    <div className="flex-1 bg-[#1A0F35] p-4">
                      <p className="text-[11px] text-[#22D3EE]">
                        {app.family} · {app.category}
                      </p>
                      <h3 className="mt-1 text-lg font-bold text-white">{app.name}</h3>
                      <p className="font-latin mt-0.5 text-xs text-[#94A3B8]">{app.nameEn}</p>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="glass neon-border mt-10 flex items-start gap-4 rounded-[1.7rem] p-6">
          <Shield className="mt-1 h-7 w-7 shrink-0 text-[#22D3EE]" />
          <div>
            <h3 className="font-bold text-white">التزام تنفيذي بعدم الإفصاح (NDA)</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
              نلتزم بحماية خصوصية العملاء. التفاصيل التشغيلية المحمية لا تُعرض إلا بموافقة صريحة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
