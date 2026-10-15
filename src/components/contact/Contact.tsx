"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, Facebook, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  EMAIL,
  FACEBOOK,
  LOCATION,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_WHATSAPP,
} from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NeonButton } from "@/components/ui/NeonButton";
import { TiltCard } from "@/components/ui/TiltCard";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [loading, setLoading] = useState(false);

  async function copyEmail() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          kicker="Interactive Connect Hub"
          title="ابدأ مشروعك من الخليل… ويصل للعالم"
          subtitle="نموذج Neumorphism داكن مع فحص فوري عبر Zod، وموقع فلسطين — الخليل — دورا."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <TiltCard className="group sm:col-span-2">
              <a
                href={`https://wa.me/${PHONE_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="glass flex items-center gap-4 rounded-3xl p-5"
              >
                <span className="rounded-2xl bg-emerald-500/20 p-3 text-emerald-300">
                  <MessageCircle />
                </span>
                <div>
                  <p className="text-sm text-ink-mute">الهاتف / واتساب</p>
                  <p className="font-latin font-bold text-white" dir="ltr">
                    {PHONE_DISPLAY}
                  </p>
                </div>
              </a>
            </TiltCard>

            <TiltCard className="group">
              <button onClick={copyEmail} className="glass flex h-full w-full items-start gap-3 rounded-3xl p-5 text-right">
                <span className="rounded-2xl bg-brand/25 p-3 text-glow-lilac">
                  {copied ? <Check /> : <Copy />}
                </span>
                <div>
                  <p className="text-sm text-ink-mute">البريد الإلكتروني</p>
                  <p className="font-latin text-sm font-bold text-white">{EMAIL}</p>
                  <p className="mt-1 text-xs text-glow-cyan">{copied ? "تم النسخ" : "انسخ بسرعة"}</p>
                </div>
              </button>
            </TiltCard>

            <TiltCard className="group">
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="glass flex h-full items-start gap-3 rounded-3xl p-5">
                <span className="rounded-2xl bg-glow-cyan/20 p-3 text-glow-cyan">
                  <MapPin />
                </span>
                <div>
                  <p className="text-sm text-ink-mute">الموقع الجغرافي</p>
                  <p className="font-bold text-white">{LOCATION}</p>
                </div>
              </a>
            </TiltCard>

            <TiltCard className="group sm:col-span-2">
              <a href={FACEBOOK} target="_blank" rel="noreferrer" className="glass flex items-center gap-4 rounded-3xl p-5">
                <span className="rounded-2xl bg-blue-500/20 p-3 text-blue-300">
                  <Facebook />
                </span>
                <div>
                  <p className="text-sm text-ink-mute">فيسبوك</p>
                  <p className="font-latin text-sm text-white">facebook.com/PAITBAITCOM</p>
                </div>
              </a>
            </TiltCard>

            <div className="glass overflow-hidden rounded-3xl sm:col-span-2">
              <iframe
                title="خريطة دورا الخليل"
                className="h-52 w-full grayscale contrast-125 invert-[.88]"
                loading="lazy"
                src="https://maps.google.com/maps?q=Dura%20Hebron%20Palestine&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} className="neu-inset rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2 text-ink-soft">
              <Mail className="h-5 w-5 text-glow-lilac" />
              <h3 className="font-bold text-white">أرسل رسالتك</h3>
            </div>
            <div className="grid gap-4">
              <input
                required
                name="name"
                placeholder="الاسم"
                className="neu-inset rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-light"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                className="neu-inset rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-light"
              />
              <input
                name="phone"
                placeholder="رقم الهاتف"
                className="neu-inset rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-light"
              />
              <textarea
                required
                name="message"
                rows={5}
                placeholder="رسالتك"
                className="neu-inset rounded-2xl px-4 py-3 text-white outline-none focus:ring-1 focus:ring-brand-light"
              />
              <NeonButton type="submit" className="w-full">
                {loading ? "جارٍ الإرسال..." : "إرسال"}
              </NeonButton>
              {status === "ok" ? (
                <p className="text-center text-sm text-emerald-300">
                  تم استلام رسالتك. سنتواصل معك قريباً.
                </p>
              ) : null}
              {status === "err" ? (
                <p className="text-center text-sm text-rose-300">تعذر الإرسال. حاول عبر واتساب.</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
