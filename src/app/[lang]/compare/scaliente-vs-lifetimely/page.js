import { getDictionary } from '../../../i18n';
import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import ComparisonContent from '@/components/ComparisonContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const compare = dict.compareLifetimely;
    return {
        title: compare?.meta?.title || 'Scaliente vs Lifetimely',
        description: compare?.meta?.description || dict.metadata.description,
        alternates: {
            canonical: `https://scaliente.com/${lang}/compare/scaliente-vs-lifetimely`,
            languages: {
                fr: `https://scaliente.com/fr/compare/scaliente-vs-lifetimely`,
                en: `https://scaliente.com/en/compare/scaliente-vs-lifetimely`,
                de: `https://scaliente.com/de/compare/scaliente-vs-lifetimely`,
                'x-default': `https://scaliente.com/fr/compare/scaliente-vs-lifetimely`,
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
            heroTitle={dict.compareLifetimely?.hero?.title}
            heroSubtitle={dict.compareLifetimely?.hero?.subtitle}
            heroDescription={dict.compareLifetimely?.hero?.description}
            ctaText={dict.common?.getStarted}
        >
            <ComparisonContent content={dict.compareLifetimely} competitorName="Lifetimely" />
        </ContentPageLayout>
    );
}
