import { getDictionary } from '../i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import HowItWorks from '@/components/HowItWorks';
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

  const faqQuestions = dict.faq?.questions ? Object.values(dict.faq.questions) : [];

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Scaliente",
    description: dict.metadata.description,
    url: `https://scaliente.com/${lang}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: lang,
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        name: "Discovery",
      },
      {
        "@type": "Offer",
        price: "89",
        priceCurrency: "EUR",
        name: "Starter",
      },
      {
        "@type": "Offer",
        price: "149",
        priceCurrency: "EUR",
        name: "Growth",
      },
      {
        "@type": "Offer",
        price: "249",
        priceCurrency: "EUR",
        name: "Scale",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqQuestions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen selection:bg-orange-500/30 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar content={dict.navbar} common={dict.common} lang={lang} />

      {/* Hero + LogoMarquee - Frosted glass with rounded bottom */}
      <div className="relative z-10">
        {/* White corner fills for bottom rounded corners */}
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
        {/* Frosted hero */}
        <div className="relative text-white bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem]">
          <Hero content={dict.hero} common={dict.common} />
          <LogoMarquee content={dict.logoMarquee} />
        </div>
      </div>

      {/* Content sections - each with its own background */}
      <div className="relative">
        {/* HowItWorks - light background */}
        <div className="bg-[#fafafa] text-zinc-900">
          <HowItWorks content={dict.howItWorks} />
        </div>

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
            <div className="relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
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
            <div className="relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
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
            <div className="relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5">
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
