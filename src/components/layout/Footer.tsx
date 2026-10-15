import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 py-16">
      <p className="holo-title pointer-events-none absolute inset-x-0 top-6 text-center text-[18vw] font-black leading-none opacity-20">
        BAIT PAIT
      </p>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center md:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-latin font-extrabold tracking-wide text-white">BAIT PAIT</span>
        </div>
        <p className="holo-title text-4xl font-black md:text-6xl">شكراً لكم</p>
        <p className="font-latin text-xl font-extrabold tracking-[0.3em] text-glow-cyan">THANK YOU</p>
        <p className="max-w-md text-sm text-ink-mute">
          شركة البستنجي للحلول البرمجية والتدريب · نصنع الحلول الرقمية التي تبني المستقبل.
        </p>
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-ink-mute">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="font-latin text-xs text-ink-mute">
          © {new Date().getFullYear()} BAIT PAIT. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
