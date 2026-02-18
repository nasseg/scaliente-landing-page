import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Section from '@/components/ui/Section';
import AffiliateHero from '@/components/affiliate/AffiliateHero';
import AffiliateBenefits from '@/components/affiliate/AffiliateBenefits';
import AffiliateHowItWorks from '@/components/affiliate/AffiliateHowItWorks';
import AffiliateEarnings from '@/components/affiliate/AffiliateEarnings';
import AffiliateAudiences from '@/components/affiliate/AffiliateAudiences';
import AffiliateDashboard from '@/components/affiliate/AffiliateDashboard';
import AffiliateFAQ from '@/components/affiliate/AffiliateFAQ';
import AffiliateForm from '@/components/affiliate/AffiliateForm';
import { getDictionary } from '../../i18n';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const affiliate = dict.affiliate;

    return {
        title: affiliate?.metadata?.title || `${affiliate?.hero?.title} - Scaliente`,
        description: affiliate?.metadata?.description || affiliate?.hero?.subtitle,
        alternates: {
            canonical: `https://scaliente.com/${lang}/affiliate`,
            languages: {
                'fr': 'https://scaliente.com/fr/affiliate',
                'en': 'https://scaliente.com/en/affiliate',
                'de': 'https://scaliente.com/de/affiliate',
                'x-default': 'https://scaliente.com/fr/affiliate',
            },
        },
        openGraph: {
            title: affiliate?.metadata?.title,
            description: affiliate?.metadata?.description,
            url: `https://scaliente.com/${lang}/affiliate`,
            siteName: "Scaliente",
            type: "website",
            images: [{ url: "/scalienteog.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: affiliate?.metadata?.title,
            description: affiliate?.metadata?.description,
            images: ["/scalienteog.png"],
        },
    };
}

export default async function AffiliatePage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.affiliate;

    return (
        <div className="min-h-screen selection:bg-orange-500/30 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: (content?.faq?.items || []).map(item => ({
                        "@type": "Question",
                        name: item.q,
                        acceptedAnswer: { "@type": "Answer", text: item.a },
                    })),
                }) }}
            />
            <Navbar content={dict.navbar} common={dict.common} lang={lang} isHomePage={false} />

            {/* Hero — frosted glass over WebGL */}
            <div className="relative z-10">
                <div className="absolute bottom-0 left-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
                <div className="absolute bottom-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
                <div className="relative text-white bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem]">
                    <div className="absolute inset-0 grain pointer-events-none" />
                    <AffiliateHero content={content} />
                </div>
            </div>

            {/* Alternating sections: light / frosted dark */}
            <div className="alternating-sections">
                {/* 1 = LIGHT */}
                <Section id="benefits">
                    <AffiliateBenefits content={content} />
                </Section>

                {/* 2 = DARK (frosted) */}
                <Section id="how-it-works" frosted>
                    <AffiliateHowItWorks content={content} />
                </Section>

                {/* 3 = LIGHT */}
                <Section id="earnings">
                    <AffiliateEarnings content={content} />
                </Section>

                {/* 4 = DARK (frosted) */}
                <Section id="audiences" frosted>
                    <AffiliateAudiences content={content} />
                </Section>

                {/* 5 = LIGHT */}
                <Section id="dashboard">
                    <AffiliateDashboard content={content} />
                </Section>

                {/* 6 = DARK (frosted) */}
                <Section id="faq" frosted>
                    <AffiliateFAQ content={content} />
                </Section>

                {/* 7 = LIGHT */}
                <Section id="application-form">
                    <AffiliateForm content={content} lang={lang} />
                </Section>
            </div>

            <Footer content={dict.footer} lang={lang} />
        </div>
    );
}
