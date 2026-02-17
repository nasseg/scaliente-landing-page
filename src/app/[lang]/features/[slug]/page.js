import { getDictionary } from '../../../i18n';
import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import FeaturePageContent from '@/components/features/FeaturePageContent';

export async function generateStaticParams() {
    const slugs = ['profit-dashboard', 'ad-tracking', 'product-analytics', 'multi-shop', 'multi-currency', 'reports'];
    const langs = ['fr', 'en', 'de'];
    return langs.flatMap(lang => slugs.map(slug => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const page = dict.featurePages?.[slugToKey(slug)];
    return {
        title: page?.meta?.title || `Scaliente - ${slug}`,
        description: page?.meta?.description || dict.metadata.description,
        alternates: {
            canonical: `https://scaliente.com/${lang}/features/${slug}`,
            languages: {
                fr: `https://scaliente.com/fr/features/${slug}`,
                en: `https://scaliente.com/en/features/${slug}`,
                de: `https://scaliente.com/de/features/${slug}`,
                'x-default': `https://scaliente.com/fr/features/${slug}`,
            },
        },
    };
}

function slugToKey(slug) {
    const map = {
        'profit-dashboard': 'profitDashboard',
        'ad-tracking': 'adTracking',
        'product-analytics': 'productAnalytics',
        'multi-shop': 'multiShop',
        'multi-currency': 'multiCurrency',
        'reports': 'reports',
    };
    return map[slug] || slug;
}

export default async function FeaturePage({ params }) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const page = dict.featurePages?.[slugToKey(slug)];

    if (!page) {
        return <div>Feature not found</div>;
    }

    return (
        <ContentPageLayout
            lang={lang}
            navContent={dict.navbar}
            footerContent={dict.footer}
            common={dict.common}
            heroTitle={page.hero?.title || page.title}
            heroSubtitle={page.hero?.subtitle || page.subtitle}
            showCTA={false}
        >
            <FeaturePageContent page={page} common={dict.common} />
        </ContentPageLayout>
    );
}
