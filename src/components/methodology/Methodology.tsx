"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Brain, ShieldCheck, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { ClayIcon } from "@/components/ui/ClayIcon";

const PathWorld = dynamic(() => import("@/components/three/PathWorld").then((m) => m.PathWorld), {
  ssr: false,
});

const steps = [
  {
    n: "01",
    icon: Search,
    title: "الاكتشاف والتحليل",
    en: "Discovery",
    text: "فهم المتطلبات وبناء المخطط الأولي.",
  },
  {
    n: "02",
    icon: PenTool,
    title: "التصميم والنماذج",
    en: "Design",
    text: "تقديم واجهات المستخدم وتجربة الاستخدام المتقدمة.",
  },
  {
    n: "03",
    icon: Code,
    title: "التطوير والبرمجة",
    en: "Development",
    text: "كتابة الشفرات المصدرية بأعلى معايير الجودة.",
  },
  {
    n: "04",
    icon: Brain,
    title: "دمج الذكاء الاصطناعي",
    en: "AI Integration",
    text: "ربط الأنظمة بالنماذج الذكية والأتمتة.",
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "فحص الجودة والأمان",
    en: "QA & Security",
    text: "اختبارات الحماية والأداء الفائق.",
  },
  {
    n: "06",
    icon: Rocket,
    title: "الإطلاق والتدريب",
    en: "Launch & Training",
    text: "تسليم المشروع وتدريب فرق العمل.",
  },
];

export function Methodology() {
  return (
    <section id="methodology" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          kicker="PathWorld Methodology"
          title="منهجية العمل المدارية"
          subtitle="مسار مداري حلزوني بست محطات متسلسلة من الاكتشاف حتى الإطلاق والتدريب."
        />

        <div className="relative mb-4 h-[280px] overflow-hidden md:h-[340px]">
          <PathWorld />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0A0612] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0A0612] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0612] to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0612] to-transparent" />
        </div>
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {steps.map((step) => (
            <span key={step.n} className="glass-chip rounded-full px-3 py-1 text-xs text-[#E2E8F0]">
              {step.n} {step.title}
            </span>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, x: i % 2 === 0 ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
            >
              <TiltCard className="group">
                <article className={`glass rounded-[1.7rem] p-6 ${i % 2 === 1 ? "md:mt-6" : ""}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <ClayIcon icon={step.icon} index={i} />
                    <span className="font-latin text-2xl font-black text-glow-lilac/80">{step.n}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                  <p className="font-latin mt-1 text-xs text-ink-mute">{step.en}</p>
                  <p className="mt-3 text-ink-soft">{step.text}</p>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
