"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { HeroScene } from "./HeroScene";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-defaults";

export function Hero({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  return (
    <section id="home" className="relative overflow-hidden bg-transparent">
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-12 pt-28 md:px-6 lg:grid-cols-2 lg:gap-12 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-1 text-right"
        >
          <span className="glass-chip mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-[#C084FC] shadow-[0_0_22px_rgba(139,92,246,0.4)]">
            <Sparkles className="h-3.5 w-3.5" />
            {settings.badge}
          </span>

          <h1 className="hero-title text-4xl font-black leading-[1.35] md:text-5xl xl:text-[3.35rem]">
            {settings.companyTitle}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#E2E8F0] md:text-lg">
            {settings.slogan}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <TiltCard>
              <NeonButton href="#contact" pulse>
                ابدأ رحلتك الرقمية
                <ArrowLeft className="h-4 w-4" />
              </NeonButton>
            </TiltCard>
            <TiltCard>
              <NeonButton href="#portfolio" variant="ghost">
                تصفح أعمالنا
              </NeonButton>
            </TiltCard>
          </div>

          <TiltCard className="group mt-8 max-w-xl">
            <div className="glass rounded-2xl p-4">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#8B5CF6]/20 px-3 py-1 text-xs font-bold text-[#E9D5FF]">
                  رؤيتنا | Vision
                </span>
                <span className="rounded-full bg-[#06B6D4]/15 px-3 py-1 text-xs font-bold text-[#A5F3FC]">
                  رسالتنا | Mission
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  كلمة المؤسس
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#E2E8F0]">{settings.vision}</p>
              <p className="mt-2 text-xs text-[#94A3B8]">{settings.founderName}</p>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-2"
        >
          <div className="relative h-[min(62vh,540px)] lg:-mx-6 lg:h-[min(88vh,740px)]">
            <div className="hero-world-blend absolute inset-0">
              <HeroScene />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
