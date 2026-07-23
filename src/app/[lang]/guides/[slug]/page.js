import { notFound } from 'next/navigation';
import { getDictionary } from '../../../i18n';
import GuideArticle from '@/components/guides/GuideArticle';
import { getGuideConfig, GUIDE_SLUGS } from '@/lib/guide-pages';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';
import { SITE_URL, localizedUrl } from '@/lib/site';

export function generateStaticParams() {
    return ['fr', 'en', 'de'].flatMap((lang) => GUIDE_SLUGS.map((slug) => ({ lang, slug })));
}
export async function generateMetadata({ params }) {
    const { lang, slug } = await params;
    const config = getGuideConfig(slug);
    if (!config) return {};
    const dict = await getDictionary(lang);
    const page = dict.guides.pages[config.dictionaryKey];
    const path = `/guides/${slug}`;
    return {
        title: page.meta.title,
        description: page.meta.description,
        alternates: buildLocalizedAlternates(lang, path),
        openGraph: {
            title: page.meta.title,
            description: page.meta.description,
            url: localizedUrl(lang, path),
            siteName: 'Scaliente',
            type: 'article',
            publishedTime: '2026-07-23',
            modifiedTime: '2026-07-23',
            images: [{ url: '/scalienteog.png', width: 1200, height: 630 }],
        },
    };
}

export default async function GuidePage({ params }) {
    const { lang, slug } = await params;
    const config = getGuideConfig(slug);
    if (!config) notFound();
    const dict = await getDictionary(lang);
    const page = dict.guides.pages[config.dictionaryKey];
    const url = localizedUrl(lang, `/guides/${slug}`);

    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: page.title,
        description: page.meta.description,
        mainEntityOfPage: url,
        inLanguage: lang,
        datePublished: '2026-07-23',
        dateModified: '2026-07-23',
        author: { '@id': `${SITE_URL}/#organization` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        citation: page.sources.map((source) => source.url),
    };
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Scaliente', item: localizedUrl(lang) },
            { '@type': 'ListItem', position: 2, name: dict.guides.hub.title, item: localizedUrl(lang, '/guides') },
            { '@type': 'ListItem', position: 3, name: page.title, item: url },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <GuideArticle page={page} guides={dict.guides} config={config} navbar={dict.navbar} footer={dict.footer} lang={lang} />
        </>
    );
}
