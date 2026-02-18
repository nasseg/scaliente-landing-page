import { getDictionary } from '../../../i18n';
import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import ComparisonContent from '@/components/ComparisonContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const compare = dict.compare;
    return {
        title: compare?.meta?.title || 'Scaliente vs TrueProfit',
        description: compare?.meta?.description || dict.metadata.description,
        alternates: {
            canonical: `https://scaliente.com/${lang}/compare/scaliente-vs-trueprofit`,
            languages: {
                fr: `https://scaliente.com/fr/compare/scaliente-vs-trueprofit`,
                en: `https://scaliente.com/en/compare/scaliente-vs-trueprofit`,
                de: `https://scaliente.com/de/compare/scaliente-vs-trueprofit`,
                'x-default': `https://scaliente.com/fr/compare/scaliente-vs-trueprofit`,
            },
        },
        openGraph: {
            title: compare?.meta?.title,
            description: compare?.meta?.description,
            url: `https://scaliente.com/${lang}/compare/scaliente-vs-trueprofit`,
            siteName: "Scaliente",
            type: "article",
            images: [{ url: "/scalienteog.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: compare?.meta?.title,
            description: compare?.meta?.description,
            images: ["/scalienteog.png"],
        },
    };
}

export default async function ComparePage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        { "@type": "ListItem", position: 1, name: "Home", item: `https://scaliente.com/${lang}` },
                        { "@type": "ListItem", position: 2, name: "Compare", item: `https://scaliente.com/${lang}/compare/scaliente-vs-trueprofit` },
                        { "@type": "ListItem", position: 3, name: "Scaliente vs TrueProfit" },
                    ],
                }) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Article",
                    headline: dict.compare?.meta?.title || "Scaliente vs TrueProfit",
                    description: dict.compare?.meta?.description,
                    datePublished: "2024-06-01",
                    dateModified: new Date().toISOString().split('T')[0],
                    author: { "@type": "Organization", name: "Scaliente" },
                }) }}
            />
            <ContentPageLayout
                lang={lang}
                navContent={dict.navbar}
                footerContent={dict.footer}
                common={dict.common}
                heroTitle={dict.compare?.hero?.title}
                heroSubtitle={dict.compare?.hero?.subtitle}
                heroDescription={dict.compare?.hero?.description}
                ctaText={dict.common?.getStarted}
            >
                <ComparisonContent content={dict.compare} competitorName="TrueProfit" lang={lang} slug="scaliente-vs-trueprofit" />
            </ContentPageLayout>
        </>
    );
}
