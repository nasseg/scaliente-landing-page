import { getDictionary } from '../i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import FeatureSection from '@/components/Features';
import BeforeAfter from '@/components/BeforeAfter';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen text-white selection:bg-orange-500/30 font-sans">
      <Navbar content={dict.navbar} common={dict.common} lang={lang} />
      <Hero content={dict.hero} common={dict.common} />
      {/* Unified glass wrapper for all middle sections */}
      <div className="liquid-glass">
        <LogoMarquee content={dict.logoMarquee} />
        <FeatureSection content={dict.features} />
        <BeforeAfter content={dict.beforeAfter} />
        <Pricing content={dict.pricing} common={dict.common} />
        <Testimonials content={dict.testimonials} />
        <FAQ content={dict.faq} />
        <CTA content={dict.cta} />
      </div>
      <Footer content={dict.footer} lang={lang} />
    </div>
  );
}
