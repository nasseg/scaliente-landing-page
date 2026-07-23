import { getDictionary } from '../../../i18n';
import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import FeaturePageContent from '@/components/features/FeaturePageContent';
import PixelAttributionPage from '@/components/pixel/PixelAttributionPage';
import CustomerServiceAIPage from '@/components/inbox/CustomerServiceAIPage';
import { FEATURE_PAGE_VISUALS, FEATURE_SLUGS, slugToFeatureKey } from '@/lib/feature-page-visuals';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';
import { localizedUrl } from '@/lib/site';
import { INBOX_PUBLIC } from '@/lib/public-release-flags';
import { resolvePublicLaunchContent } from '@/lib/public-launch-content';

export async function generateStaticParams() {
    const langs = ['fr', 'en', 'de'];
    return langs.flatMap(lang => FEATURE_SLUGS.map(slug => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const rawPage = dict.featurePages?.[slugToFeatureKey(slug)];
    const page = slug === 'ai-customer-service'
        ? resolvePublicLaunchContent(rawPage)
        : rawPage;
    return {
        title: page?.meta?.title || `Scaliente - ${slug}`,
        description: page?.meta?.description || dict.metadata.description,
        keywords: page?.meta?.keywords,
        alternates: buildLocalizedAlternates(lang, `/features/${slug}`),
        openGraph: {
            title: page?.meta?.title,
            description: page?.meta?.description,
            url: localizedUrl(lang, `/features/${slug}`),
            siteName: "Scaliente",
            type: "article",
            images: [{ url: "/scalienteog.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: page?.meta?.title,
            description: page?.meta?.description,
            images: ["/scalienteog.png"],
        },
    };
}

export default async function FeaturePage({ params }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const rawPage = dict.featurePages?.[slugToFeatureKey(slug)];
    const page = slug === 'ai-customer-service'
        ? resolvePublicLaunchContent(rawPage)
        : rawPage;

    if (!page) {
        return <div>Feature not found</div>;
    }

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Scaliente", item: localizedUrl(lang) },
            { "@type": "ListItem", position: 2, name: page?.meta?.title || slug, item: localizedUrl(lang, `/features/${slug}`) },
        ],
    };

    if (slug === 'pixel-attribution' || slug === 'ai-customer-service') {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: (page.faq?.items || []).map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
        };
        const inboxApplicationSchema = slug === 'ai-customer-service' ? {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: page.meta?.entityName || "Scaliente AI Inbox",
            description: page.meta?.description,
            url: localizedUrl(lang, `/features/${slug}`),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            inLanguage: lang,
            provider: { "@id": "https://www.scaliente.com/#organization" },
            featureList: (page.hero?.proof || []).map((item) => `${item.value}: ${item.label}`),
            ...(INBOX_PUBLIC ? {
                offers: {
                    "@type": "Offer",
                    price: "39",
                    priceCurrency: "EUR",
                    url: "https://app.scaliente.com/inbox/discover",
                    category: "Add-on",
                },
            } : {}),
        } : null;

        return (
            <>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
                {inboxApplicationSchema && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(inboxApplicationSchema) }} />
                )}
                {slug === 'pixel-attribution'
                    ? <PixelAttributionPage page={page} navbar={dict.navbar} footer={dict.footer} lang={lang} />
                    : <CustomerServiceAIPage page={page} navbar={dict.navbar} footer={dict.footer} lang={lang} />}
            </>
        );
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ContentPageLayout
                lang={lang}
                navContent={dict.navbar}
                footerContent={dict.footer}
                common={dict.common}
                heroTitle={page.hero?.title || page.title}
                heroSubtitle={page.hero?.subtitle || page.subtitle}
                heroVisual={FEATURE_PAGE_VISUALS[slug]}
                showCTA={false}
            >
                <FeaturePageContent page={page} common={dict.common} lang={lang} slug={slug} />
            </ContentPageLayout>
        </>
    );
}
