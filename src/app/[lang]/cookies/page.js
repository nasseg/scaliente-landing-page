import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return { title: `${legalPage.sections.cookies.title} - Scaliente`, description: legalPage.sections.cookies.intro, alternates: buildLocalizedAlternates(lang, '/cookies') };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const cookies = content.sections.cookies;
    return (
        <LegalPageLayout lang={lang} content={content} active="cookies" title={cookies.title} intro={cookies.intro}>
            <LegalArticle className="space-y-10">
                <section><h2>{cookies.types}</h2><ul><li>{cookies.essential}</li><li>{cookies.analytics}</li></ul></section>
                <section><h2>{cookies.manage}</h2><p>{cookies.manage_text}</p></section>
            </LegalArticle>
        </LegalPageLayout>
    );
}
