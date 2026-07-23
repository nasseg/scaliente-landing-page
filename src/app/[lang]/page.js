import { getDictionary } from '../i18n';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProfitStory from '@/components/stories/ProfitStory';
import AttributionStory from '@/components/stories/AttributionStory';
import DecisionStory from '@/components/stories/DecisionStory';
import InboxStory from '@/components/stories/InboxStory';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Section from '@/components/ui/Section';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import { SITE_URL, localizedUrl } from '@/lib/site';
import { resolvePublicLaunchContent } from '@/lib/public-launch-content';

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const heroContent = resolvePublicLaunchContent(dict.hero);
  const inboxStoryContent = resolvePublicLaunchContent(dict.inboxStory);
  const faqContent = resolvePublicLaunchContent(dict.faq);

  const faqQuestions = faqContent?.questions ? Object.values(faqContent.questions) : [];

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Scaliente",
    description: dict.metadata.description,
    "@id": `${localizedUrl(lang)}/#software`,
    url: localizedUrl(lang),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: lang,
    author: { "@id": `${SITE_URL}/#organization` },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split('T')[0],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "150",
      bestRating: "5",
    },
    review: (dict.testimonials?.reviews || []).map((review) => ({
      "@type": "Review",
      reviewBody: review.text,
      author: { "@type": "Person", name: review.author },
    })),
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

      <div data-header-theme="dark" className="relative z-10 bg-[#09090b]">
        <Hero content={heroContent} common={dict.common} integrations={dict.logoMarquee} lang={lang} />
        <div data-hero-end />
      </div>

      {/* Auto-alternating sections: odd=light, even=dark */}
      <div className="alternating-sections relative z-20 bg-[#09090b]">
        {/* 1 = odd = LIGHT */}
        <Section id="profit-truth">
          <ProfitStory content={dict.profitStory} />
        </Section>

        {/* 2 = even = DARK */}
        <Section id="attribution" frosted>
          <AttributionStory content={dict.attributionStory} />
        </Section>

        <Section id="decisions">
          <DecisionStory content={dict.decisionStory} />
        </Section>

        <Section id="inbox-beta" frosted>
          <InboxStory content={inboxStoryContent} lang={lang} />
        </Section>

        {/* 5 = odd = LIGHT */}
        <Section id="testimonials">
          <Testimonials content={dict.testimonials} founderStory={dict.founderStory} />
        </Section>

        {/* 6 = even = DARK */}
        <Section id="how-it-works" frosted>
          <HowItWorks content={dict.howItWorks} />
        </Section>

        {/* 7 = odd = LIGHT */}
        <Section id="pricing">
          <Pricing content={dict.pricing} common={dict.common} />
        </Section>

        {/* 8 = even = DARK */}
        <Section id="faq" frosted>
          <FAQ content={faqContent} />
        </Section>

        {/* 9 = odd = LIGHT */}
        <Section data-cta-final="">
          <CTA content={dict.cta} />
        </Section>
      </div>

      {/* Footer */}
      <Footer content={dict.footer} lang={lang} />
      <StickyMobileCTA label={dict.common?.getStarted || 'Commencer Gratuitement'} />
    </div>
  );
}
