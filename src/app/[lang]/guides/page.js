import { getDictionary } from '../../i18n';
import GuidesHub from '@/components/guides/GuidesHub';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';
import { localizedUrl } from '@/lib/site';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const hub = dict.guides.hub;
    return {
        title: hub.meta.title,
        description: hub.meta.description,
        alternates: buildLocalizedAlternates(lang, '/guides'),
        openGraph: {
            title: hub.meta.title,
            description: hub.meta.description,
            url: localizedUrl(lang, '/guides'),
            siteName: 'Scaliente',
            type: 'website',
            images: [{ url: '/scalienteog.png', width: 1200, height: 630 }],
        },
    };
}
export default async function GuideHubPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return <GuidesHub content={dict.guides} navbar={dict.navbar} footer={dict.footer} common={dict.common} lang={lang} />;
}
