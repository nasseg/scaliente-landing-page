import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return { title: `${legalPage.sections.privacy.title} - Scaliente`, description: legalPage.sections.privacy.intro, alternates: buildLocalizedAlternates(lang, '/privacy-policy') };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const privacy = content.sections.privacy;
    return (
        <LegalPageLayout lang={lang} content={content} active="privacy" title={privacy.title} intro={privacy.intro}>
            <LegalArticle className="space-y-10">
                {privacy.items?.map((item) => <section key={item.title}><h2>{item.title}</h2><div dangerouslySetInnerHTML={{ __html: item.content }} /></section>)}
            </LegalArticle>
        </LegalPageLayout>
    );
}
