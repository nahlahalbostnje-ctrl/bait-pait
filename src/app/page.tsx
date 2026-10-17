import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Services } from "@/components/services/Services";
import { Methodology } from "@/components/methodology/Methodology";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Stats } from "@/components/stats/Stats";
import { Contact } from "@/components/contact/Contact";
import { GlassAtmosphere } from "@/components/ui/GlassAtmosphere";
import { LuxuryBackdrop } from "@/components/three/LuxuryBackdrop";
import { getSettings, getWorks } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [works, settings] = await Promise.all([getWorks(), getSettings()]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-transparent">
      <LuxuryBackdrop />
      <GlassAtmosphere />
      <div className="relative z-20">
        <Navbar />
        <Hero settings={settings} />
        <div className="border-y border-white/10 bg-[#120924]/22 backdrop-blur-[2px]">
          <About settings={settings} />
        </div>
        <div className="bg-[#0A0612]/16 backdrop-blur-[2px]">
          <Services />
        </div>
        <div className="border-y border-cyan-400/10 bg-[#0A0612]/20 backdrop-blur-[2px]">
          <Methodology />
        </div>
        <Portfolio works={works} nda={settings.nda} />
        <div className="bg-[#120924]/18 backdrop-blur-[2px]">
          <Stats items={settings.stats} />
        </div>
        <div className="bg-[#0A0612]/16 backdrop-blur-[2px]">
          <Contact settings={settings} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
