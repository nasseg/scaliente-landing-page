import { getDictionary } from '../../../i18n';
import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import ComparisonContent from '@/components/ComparisonContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de' }];
}

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const compare = dict.compareTripleWhale;
    return {
        title: compare?.meta?.title || 'Scaliente vs Triple Whale',
        description: compare?.meta?.description || dict.metadata.description,
        alternates: {
            canonical: `https://scaliente.com/${lang}/compare/scaliente-vs-triple-whale`,
            languages: {
                fr: `https://scaliente.com/fr/compare/scaliente-vs-triple-whale`,
                en: `https://scaliente.com/en/compare/scaliente-vs-triple-whale`,
                de: `https://scaliente.com/de/compare/scaliente-vs-triple-whale`,
                'x-default': `https://scaliente.com/fr/compare/scaliente-vs-triple-whale`,
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
            heroTitle={dict.compareTripleWhale?.hero?.title}
            heroSubtitle={dict.compareTripleWhale?.hero?.subtitle}
            heroDescription={dict.compareTripleWhale?.hero?.description}
            ctaText={dict.common?.getStarted}
        >
            <ComparisonContent content={dict.compareTripleWhale} competitorName="Triple Whale" />
        </ContentPageLayout>
    );
}
