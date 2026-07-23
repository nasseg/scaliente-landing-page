import { buildLocalizedAlternates } from '@/lib/localized-metadata';
import { localizedUrl } from '@/lib/site';

export const COMPARISON_PAGES = {
    'scaliente-vs-trueprofit': { dictionaryKey: 'compare', competitorName: 'TrueProfit' },
    'scaliente-vs-lifetimely': { dictionaryKey: 'compareLifetimely', competitorName: 'Lifetimely' },
    'scaliente-vs-triple-whale': { dictionaryKey: 'compareTripleWhale', competitorName: 'Triple Whale' },
};

export function buildComparisonMetadata({ lang, slug, page, fallbackDescription }) {
    const path = `/compare/${slug}`;
    const url = localizedUrl(lang, path);
    return {
        title: page?.meta?.title,
        description: page?.meta?.description || fallbackDescription,
        alternates: buildLocalizedAlternates(lang, path),
        openGraph: {
            title: page?.meta?.title,
            description: page?.meta?.description,
            url,
            siteName: 'Scaliente',
            type: 'article',
            images: [{ url: '/scalienteog.png', width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: page?.meta?.title,
            description: page?.meta?.description,
            images: ['/scalienteog.png'],
        },
    };
}

export function buildComparisonBreadcrumb({ lang, slug, title }) {
    const url = localizedUrl(lang, `/compare/${slug}`);
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: localizedUrl(lang) },
            { '@type': 'ListItem', position: 2, name: 'Compare', item: url },
            { '@type': 'ListItem', position: 3, name: title },
        ],
    };
}
