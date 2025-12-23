import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import FeatureSection from '@/components/Features';
import BeforeAfter from '@/components/BeforeAfter';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen text-white selection:bg-orange-500/30 font-sans">
      <Navbar />
      <Hero />
      {/* Unified glass wrapper for all middle sections */}
      <div className="liquid-glass">
        <LogoMarquee />
        <FeatureSection />
        <BeforeAfter />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
      <Footer />
    </div>
  );
}
