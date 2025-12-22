import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import FeatureSection from '@/components/Features';
import ComparisonSection from '@/components/Comparison';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen text-white selection:bg-orange-500/30 font-sans">
      <Navbar />
      <Hero />
      <LogoMarquee />
      <FeatureSection />
      <ComparisonSection />
      <CTA />
      <Footer />
    </div>
  );
}
