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
    };
}

export default async function ComparePage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
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
            <ComparisonContent content={dict.compare} competitorName="TrueProfit" />
        </ContentPageLayout>
    );
}
