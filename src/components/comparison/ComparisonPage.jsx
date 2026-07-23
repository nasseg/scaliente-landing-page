import ContentPageLayout from '@/components/layouts/ContentPageLayout';
import ComparisonContent from '@/components/ComparisonContent';
import { buildComparisonBreadcrumb, COMPARISON_PAGES } from '@/lib/comparison-pages';

export default function ComparisonPage({ dict, lang, slug }) {
    const config = COMPARISON_PAGES[slug];
    const content = dict[config.dictionaryKey];
    const title = content?.meta?.title || `Scaliente vs ${config.competitorName}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buildComparisonBreadcrumb({ lang, slug, title })) }}
            />
            <ContentPageLayout
                lang={lang}
                navContent={dict.navbar}
                footerContent={dict.footer}
                common={dict.common}
                heroEyebrow={`Scaliente / ${config.competitorName}`}
                heroTitle={content?.hero?.title}
                heroSubtitle={content?.hero?.subtitle}
                heroDescription={content?.hero?.description}
                ctaText={dict.common?.getStarted}
            >
                <ComparisonContent content={content} competitorName={config.competitorName} lang={lang} slug={slug} />
            </ContentPageLayout>
        </>
    );
}
