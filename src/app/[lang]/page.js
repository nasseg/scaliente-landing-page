import { getDictionary } from '../i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoMarquee from '@/components/LogoMarquee';
import BeforeAfter from '@/components/BeforeAfter';
import FeatureSection from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';
import Section from '@/components/ui/Section';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ExitIntentPopup from '@/components/ExitIntentPopup';

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
    author: { "@type": "Organization", "name": "Scaliente" },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "2500",
      bestRating: "5",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Lucas M." },
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Sophie D." },
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Max K." },
      },
    ],
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "EUR", name: "Discovery" },
      { "@type": "Offer", price: "39", priceCurrency: "EUR", name: "Lite" },
      { "@type": "Offer", price: "89", priceCurrency: "EUR", name: "Starter" },
      { "@type": "Offer", price: "149", priceCurrency: "EUR", name: "Growth" },
      { "@type": "Offer", price: "249", priceCurrency: "EUR", name: "Scale" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: dict.howItWorks?.title?.part1 + " " + dict.howItWorks?.title?.part2,
    description: dict.howItWorks?.description,
    totalTime: "PT5M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: dict.howItWorks?.steps?.shopify?.title,
        text: dict.howItWorks?.steps?.shopify?.desc,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: dict.howItWorks?.steps?.ads?.title,
        text: dict.howItWorks?.steps?.ads?.desc,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: dict.howItWorks?.steps?.mode?.title,
        text: dict.howItWorks?.steps?.mode?.desc,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: dict.howItWorks?.steps?.expenses?.title,
        text: dict.howItWorks?.steps?.expenses?.desc,
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
      acceptedAnswer: { "@type": "Answer", text: item.a },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar content={dict.navbar} common={dict.common} lang={lang} />

      {/* Hero + LogoMarquee - Frosted glass with rounded bottom (outside alternation) */}
      <div className="relative z-10">
        <div className="relative text-white bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem] shadow-[0_0_0_2.5rem_#fafafa] md:shadow-[0_0_0_3rem_#fafafa]" style={{ clipPath: 'inset(0 -3rem -3rem -3rem)' }}>
          <Hero content={dict.hero} common={dict.common} />
          <LogoMarquee content={dict.logoMarquee} />
          <div data-hero-end />
        </div>
      </div>

      {/* Auto-alternating sections: odd=light, even=dark */}
      <div className="alternating-sections">
        {/* 1 = odd = LIGHT */}
        <Section id="before-after">
          <BeforeAfter content={dict.beforeAfter} />
        </Section>

        {/* 2 = even = DARK */}
        <Section id="features" frosted>
          <FeatureSection content={dict.features} />
        </Section>

        {/* 3 = odd = LIGHT — Testimonials early for trust */}
        <Section id="testimonials">
          <Testimonials content={dict.testimonials} founderStory={dict.founderStory} />
        </Section>

        {/* 4 = even = DARK */}
        <Section id="how-it-works" frosted>
          <HowItWorks content={dict.howItWorks} />
        </Section>

        {/* 5 = odd = LIGHT */}
        <Section id="pricing">
          <Pricing content={dict.pricing} common={dict.common} />
        </Section>

        {/* 6 = even = DARK */}
        <Section id="faq" frosted>
          <FAQ content={dict.faq} />
        </Section>

        {/* 7 = odd = LIGHT */}
        <Section data-cta-final="">
          <CTA content={dict.cta} />
        </Section>
      </div>

      {/* Footer */}
      <Footer content={dict.footer} lang={lang} />
      <StickyMobileCTA label={dict.common?.getStarted || 'Commencer Gratuitement'} />
      <ExitIntentPopup content={dict.exitPopup} />
    </div>
  );
}
