"use client";

import { Brain, Cloud, Code2, Database, Figma, Smartphone, Sparkles, Users } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";
import { ClayIcon } from "@/components/ui/ClayIcon";

const software = [
  { icon: Smartphone, title: "تطبيقات الموبايل" },
  { icon: Cloud, title: "المنصات السحابية" },
  { icon: Users, title: "أنظمة ERP الإدارية" },
  { icon: Brain, title: "حلول الذكاء الاصطناعي" },
];

const training = [
  { icon: Code2, title: "مسارات تطوير الواجهات" },
  { icon: Database, title: "البرمجة الخلفية" },
  { icon: Sparkles, title: "هندسة الأوامر والذكاء" },
  { icon: Figma, title: "تصميم واجهات المستخدم" },
];

function Column({
  title,
  items,
}: {
  title: string;
  items: { icon: typeof Brain; title: string }[];
}) {
  return (
    <div className="relative">
      <div className="mx-auto mb-3 h-8 w-px bg-gradient-to-b from-[#C084FC] to-transparent" />
      <div className="glass h-full rounded-[1.8rem] p-6">
        <h3 className="mb-5 border-b border-white/10 pb-4 text-center text-2xl font-black text-white">
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={item.title}>
              <TiltCard className="group">
                <div className="glass-chip flex items-center gap-3 rounded-2xl px-3 py-3">
                  <ClayIcon icon={item.icon} index={i} className="mb-0 h-12 w-12" />
                  <span className="text-base font-bold text-white">{item.title}</span>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="glass mx-auto max-w-xl rounded-[1.6rem] px-6 py-5 text-center shadow-glow">
          <p className="text-xs text-[#C084FC]">القسم 4 · Dual Services Arena</p>
          <h2 className="mt-1 text-3xl font-black text-white">ساحة الخدمات المزدوجة</h2>
        </div>
        <div className="mx-auto h-10 w-px bg-gradient-to-b from-[#8B5CF6] to-transparent" />
        <div className="relative grid gap-6 lg:grid-cols-2">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-8 w-[55%] -translate-x-1/2 border-t border-[#C084FC]/50 lg:block" />
          <Column title="الحلول البرمجية" items={software} />
          <Column title="التدريب والأكاديمية" items={training} />
        </div>
      </div>
    </section>
  );
}
