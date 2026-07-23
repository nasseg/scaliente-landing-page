import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return { title: `${legalPage.sections.mentions.title} - Scaliente`, description: legalPage.subtitle, alternates: buildLocalizedAlternates(lang, '/legal-mentions') };
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const mentions = content.sections.mentions;
    return (
        <LegalPageLayout lang={lang} content={content} active="mentions" title={mentions.title} intro={content.subtitle}>
            <LegalArticle className="space-y-12">
                <section><h2>1. {mentions.editor}</h2><div dangerouslySetInnerHTML={{ __html: mentions.editor_text }} /><dl className="mt-5 grid gap-3 sm:grid-cols-2"><div><dt>{mentions.legal_form_label}</dt><dd>{mentions.legal_form_value}</dd></div><div><dt>{mentions.headquarters_label}</dt><dd>{mentions.headquarters_value}</dd></div><div><dt>{mentions.email_label}</dt><dd><a href="mailto:scalientesolutions@gmail.com">scalientesolutions@gmail.com</a></dd></div></dl></section>
                <section><h2>2. {mentions.hosting}</h2><p>Vercel Inc.<br />340 S Lemon Ave #4133 Walnut, CA 91789, USA</p></section>
                <section><h2>3. {mentions.ip}</h2><p>{mentions.ip_text}</p></section>
            </LegalArticle>
        </LegalPageLayout>
    );
}
