"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { NeonButton } from "@/components/ui/NeonButton";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-strong fixed inset-x-3 top-3 z-50 rounded-2xl md:inset-x-6">
      <div className="relative mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#home" className="relative z-10 flex items-center gap-3">
          <Logo />
          <div className="leading-tight">
            <p className="font-latin text-sm font-extrabold tracking-wide text-white">BAIT PAIT</p>
            <p className="text-[11px] text-ink-mute">شركة البستنجي</p>
          </div>
        </a>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative pb-1 text-sm text-[#E2E8F0] transition after:absolute after:bottom-0 after:right-0 after:h-px after:w-0 after:bg-[#8B5CF6] after:transition-all hover:text-white hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <div className="hidden lg:block">
            <NeonButton href="#contact" pulse>
              <Phone className="h-4 w-4" />
              تواصل فوري
            </NeonButton>
          </div>
          <button
            className="rounded-xl border border-white/10 bg-white/5 p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0b0616] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <NeonButton href="#contact" pulse className="w-full">
              تواصل فوري
            </NeonButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
