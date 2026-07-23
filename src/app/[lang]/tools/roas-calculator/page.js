import { getDictionary } from '../../../i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoasCalculator from '@/components/RoasCalculator';
import PageHero from '@/components/ui/PageHero';
import CTAButton from '@/components/ui/CTAButton';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';
import { localizedUrl } from '@/lib/site';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const calc = dict.calculator || {};

    return {
        title: calc?.meta?.title || 'ROAS Calculator - Scaliente',
        description: calc?.meta?.description || 'Free ROAS and breakeven calculator for Shopify store owners',
        alternates: buildLocalizedAlternates(lang, '/tools/roas-calculator'),
        openGraph: {
            title: calc?.meta?.title,
            description: calc?.meta?.description,
            url: localizedUrl(lang, '/tools/roas-calculator'),
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
        url: localizedUrl(lang, '/tools/roas-calculator'),
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

            <PageHero
                eyebrow="ROAS / Breakeven"
                title={dict.calculator?.hero?.title}
                subtitle={dict.calculator?.hero?.subtitle}
            />

            {/* Calculator */}
            <div data-header-theme="light" className="bg-[#fafafa] text-zinc-900">
                <RoasCalculator content={dict.calculator} common={dict.common} lang={lang} />
            </div>

            {/* SEO Content */}
            <div data-header-theme="light" className="bg-[#fafafa] px-5 py-20 text-zinc-900 sm:px-8 sm:py-28">
                <div className="mx-auto grid max-w-[1180px] gap-10 border-t border-zinc-200 pt-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <h2 className="text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em]">{dict.calculator?.seo?.title}</h2>
                    <div className="space-y-5 text-lg leading-8 text-zinc-600">
                        <p>{dict.calculator?.seo?.p1}</p>
                        <p>{dict.calculator?.seo?.p2}</p>
                        <p>{dict.calculator?.seo?.p3}</p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
                <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <h2 className="max-w-3xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{dict.calculator?.cta?.title}</h2>
                        <p className="mt-6 text-lg text-zinc-400">{dict.calculator?.cta?.subtitle}</p>
                    </div>
                    <div className="lg:justify-self-end">
                        <CTAButton href="https://apps.shopify.com/scaliente" size="lg">{dict.calculator?.cta?.button}</CTAButton>
                        <p className="mt-4 text-sm text-zinc-500">{dict.common?.noCard}</p>
                    </div>
                </div>
            </div>

            <Footer content={dict.footer} lang={lang} />
        </div>
    );
}
