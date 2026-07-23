import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return { title: `${legalPage.sections.cgv.title} - Scaliente`, description: legalPage.sections.cgv.b2b, alternates: buildLocalizedAlternates(lang, '/terms-of-sale') };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const cgv = content.sections.cgv;
    return (
        <LegalPageLayout lang={lang} content={content} active="cgv" title={cgv.title} intro={cgv.b2b}>
            <LegalArticle className="space-y-10">
                <section><h2>{cgv.price}</h2><p>Stripe (Euros/Dollars).</p></section>
                <section><h2>{cgv.termination}</h2><p>{cgv.termination_text}</p></section>
                <section><h2>{cgv.retraction}</h2><p>{cgv.retraction_text}</p></section>
            </LegalArticle>
        </LegalPageLayout>
    );
}
