import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return { title: `${legalPage.sections.terms.title} - Scaliente`, description: legalPage.sections.terms.intro, alternates: buildLocalizedAlternates(lang, '/terms-of-service') };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const terms = content.sections.terms;
    return (
        <LegalPageLayout lang={lang} content={content} active="terms" title={terms.title} intro={terms.intro}>
            <LegalArticle className="space-y-10">
                {terms.items?.map((item) => <section key={item.title}><h2>{item.title}</h2><div dangerouslySetInnerHTML={{ __html: item.content }} /></section>)}
            </LegalArticle>
        </LegalPageLayout>
    );
}
