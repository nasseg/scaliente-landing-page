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
    <div className="min-h-screen selection:bg-orange-500/30 font-sans">
      <Navbar content={dict.navbar} common={dict.common} lang={lang} />

      {/* Hero + LogoMarquee - Frosted glass with rounded bottom */}
      <div className="relative z-10">
        {/* White corner fills for bottom rounded corners */}
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
        {/* Frosted hero */}
        <div className="relative text-white bg-[#09090b]/70 backdrop-blur-2xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem]">
          <Hero content={dict.hero} common={dict.common} />
          <LogoMarquee content={dict.logoMarquee} />
        </div>
      </div>

      {/* Content sections - each with its own background */}
      <div className="relative">
        {/* Features - light background */}
        <div className="bg-[#fafafa] text-zinc-900">
          <FeatureSection content={dict.features} />
        </div>

        {/* BeforeAfter - Frosted glass with WebGL visible through */}
        <div className="relative py-3">
          {/* White frame edges - only covers borders, center is transparent for WebGL */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
          {/* Frosted card wrapper with corner fills */}
          <div className="relative mx-3 md:mx-4">
            {/* White corner fills - behind the card to fill rounded corner gaps */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            {/* Frosted card */}
            <div className="relative bg-[#09090b]/70 backdrop-blur-2xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
              <BeforeAfter content={dict.beforeAfter} />
            </div>
          </div>
        </div>

        {/* Pricing - light background */}
        <div className="bg-[#fafafa] text-zinc-900">
          <Pricing content={dict.pricing} common={dict.common} />
        </div>

        {/* Testimonials - Frosted glass with WebGL visible through */}
        <div className="relative py-3">
          {/* White frame edges */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
          {/* Frosted card wrapper with corner fills */}
          <div className="relative mx-3 md:mx-4">
            {/* White corner fills */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            {/* Frosted card */}
            <div className="relative bg-[#09090b]/70 backdrop-blur-2xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
              <Testimonials content={dict.testimonials} />
            </div>
          </div>
        </div>

        {/* FAQ - light background */}
        <div className="bg-[#fafafa] text-zinc-900">
          <FAQ content={dict.faq} />
        </div>

        {/* CTA - Frosted glass with WebGL visible through */}
        <div className="relative py-3">
          {/* White frame edges */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
          <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
          {/* Frosted card wrapper with corner fills */}
          <div className="relative mx-3 md:mx-4">
            {/* White corner fills */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            {/* Frosted card */}
            <div className="relative bg-[#09090b]/70 backdrop-blur-2xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
              <CTA content={dict.cta} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - white background */}
      <Footer content={dict.footer} lang={lang} />
    </div>
  );
}
