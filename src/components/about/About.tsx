"use client";

import { motion } from "framer-motion";
import { Eye, Quote, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { ClayIcon } from "@/components/ui/ClayIcon";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-defaults";

export function About({ settings = DEFAULT_SETTINGS }: { settings?: SiteSettings }) {
  const cards = [
    { icon: Eye, title: "رؤيتنا", text: settings.vision },
    { icon: Target, title: "رسالتنا", text: settings.mission },
  ];
  return (
    <section id="about" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          kicker="About BAIT PAIT"
          title="من نحن"
          subtitle="كلمة قيادة تنفيذية، مع الرؤية والرسالة بأيقونات طينية وكرة كريستالية."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="group h-full">
                <div className="glass h-full rounded-[1.7rem] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="crystal-orb" />
                    <ClayIcon icon={card.icon} index={i} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-ink-mute">{card.text}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TiltCard className="group h-full">
              <div className="glass neon-border h-full rounded-[1.7rem] p-6">
                <Quote className="mb-4 h-8 w-8 text-glow-pink" />
                <p className="text-lg font-semibold leading-relaxed text-white">«{settings.founderQuote}»</p>
                <p className="mt-5 text-sm text-ink-mute">كلمة المؤسس والمدير التنفيذي</p>
                <p className="mt-1 font-bold text-glow-lilac">{settings.founderName}</p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
