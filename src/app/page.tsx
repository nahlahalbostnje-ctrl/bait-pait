import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Services } from "@/components/services/Services";
import { Methodology } from "@/components/methodology/Methodology";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Stats } from "@/components/stats/Stats";
import { Contact } from "@/components/contact/Contact";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen bg-[#0b0616]">
      <div className="relative z-20">
        <Navbar />
        <Hero />
        <div className="border-y border-white/10 bg-[#120924]">
          <About />
        </div>
        <div className="bg-[#0A0612]">
          <Services />
        </div>
        <div className="border-y border-cyan-400/10 bg-[#0A0612]">
          <Methodology />
        </div>
        <Portfolio />
        <div className="bg-[#120924]">
          <Stats />
        </div>
        <div className="bg-[#0A0612]">
          <Contact />
        </div>
        <Footer />
      </div>
    </main>
  );
}
