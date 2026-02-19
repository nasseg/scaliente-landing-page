import { getDictionary } from '../../../i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoasCalculator from '@/components/RoasCalculator';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const calc = dict.calculator || {};

    return {
        title: calc?.meta?.title || 'ROAS Calculator - Scaliente',
        description: calc?.meta?.description || 'Free ROAS and breakeven calculator for Shopify store owners',
        alternates: {
            canonical: `https://scaliente.com/${lang}/tools/roas-calculator`,
            languages: {
                'fr': 'https://scaliente.com/fr/tools/roas-calculator',
                'en': 'https://scaliente.com/en/tools/roas-calculator',
                'de': 'https://scaliente.com/de/tools/roas-calculator',
                'x-default': 'https://scaliente.com/fr/tools/roas-calculator',
            },
        },
        openGraph: {
            title: calc?.meta?.title,
            description: calc?.meta?.description,
            url: `https://scaliente.com/${lang}/tools/roas-calculator`,
            siteName: "Scaliente",
            type: "website",
            images: [{ url: "/scalienteog.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: calc?.meta?.title,
            description: calc?.meta?.description,
            images: ["/scalienteog.png"],
        },
    };
}

export default async function RoasCalculatorPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const calculatorSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Scaliente ROAS Calculator",
        description: dict.calculator?.meta?.description,
        url: `https://scaliente.com/${lang}/tools/roas-calculator`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
        },
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Calculate ROAS",
        step: [
            { "@type": "HowToStep", position: 1, name: "Enter your revenue", text: "Enter your total revenue from sales." },
            { "@type": "HowToStep", position: 2, name: "Enter your ad spend", text: "Enter your total advertising spend across all platforms." },
            { "@type": "HowToStep", position: 3, name: "Enter your costs", text: "Enter COGS, shipping, and other costs." },
            { "@type": "HowToStep", position: 4, name: "View your results", text: "See your ROAS, breakeven ROAS, and net profit instantly." },
        ],
    };

    return (
        <div className="min-h-screen selection:bg-orange-500/30 font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <Navbar content={dict.navbar} lang={lang} isHomePage={false} />

            {/* Hero */}
            <div className="relative z-10">
                <div className="relative text-white bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem] shadow-[0_0_0_2.5rem_#fafafa] md:shadow-[0_0_0_3rem_#fafafa]" style={{ clipPath: 'inset(0 -3rem -3rem -3rem)' }}>
                    <div className="absolute inset-0 grain pointer-events-none" />
                    <div className="max-w-4xl mx-auto px-6 pt-32 pb-16 text-center relative z-10">
                        <h1 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-[-0.025em]">
                            {dict.calculator?.hero?.title || 'Calculateur ROAS & Breakeven'}
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            {dict.calculator?.hero?.subtitle || 'Calculez votre point de rentabilit\u00e9 en quelques secondes. Gratuit, sans inscription.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculator */}
            <div className="bg-[#fafafa] text-zinc-900">
                <RoasCalculator content={dict.calculator} common={dict.common} lang={lang} />
            </div>

            {/* SEO Content */}
            <div className="bg-[#fafafa] text-zinc-900 py-16">
                <div className="max-w-3xl mx-auto px-6 prose prose-zinc">
                    <h2 className="font-brand text-2xl font-bold text-zinc-900 mb-4">{dict.calculator?.seo?.title || 'Comment utiliser le calculateur ROAS'}</h2>
                    <p className="text-zinc-600 leading-relaxed mb-4">{dict.calculator?.seo?.p1}</p>
                    <p className="text-zinc-600 leading-relaxed mb-4">{dict.calculator?.seo?.p2}</p>
                    <p className="text-zinc-600 leading-relaxed">{dict.calculator?.seo?.p3}</p>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-[#fafafa] py-16 text-center border-t border-zinc-200">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="font-brand text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
                        {dict.calculator?.cta?.title || 'Vous voulez ces m\u00e9triques en temps r\u00e9el ?'}
                    </h2>
                    <p className="text-zinc-500 mb-8">{dict.calculator?.cta?.subtitle || 'Essayez Scaliente gratuitement'}</p>
                    <a
                        href="https://apps.shopify.com/scaliente"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-b from-orange-500 to-orange-600 text-white font-semibold text-lg rounded-2xl hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition-all duration-300"
                    >
                        {dict.calculator?.cta?.button || 'Essayer Scaliente Gratuitement'}
                    </a>
                    <p className="mt-4 text-sm text-zinc-500">{dict.common?.noCard || 'Aucune carte requise'}</p>
                </div>
            </div>

            <Footer content={dict.footer} lang={lang} />
        </div>
    );
}
