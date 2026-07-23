import { Mail } from 'lucide-react';
import { getDictionary } from '../../i18n';
import LegalPageLayout, { LegalArticle } from '@/components/legal/LegalPageLayout';
import { buildLocalizedAlternates } from '@/lib/localized-metadata';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const { legalPage } = await getDictionary(lang);
    return {
        title: `${legalPage.title} - Scaliente`,
        description: legalPage.subtitle,
        alternates: buildLocalizedAlternates(lang, '/legal'),
        robots: { index: false, follow: true },
    };
}

function Heading({ children }) {
    return <h2 className="font-brand text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{children}</h2>;
}

export default async function Page({ params }) {
    const { lang } = await params;
    const { legalPage: content } = await getDictionary(lang);
    const { mentions, privacy, cookies, cgv, terms, deletion } = content.sections;
    return (
        <LegalPageLayout lang={lang} content={content} title={content.title} intro={content.subtitle}>
            <div className="space-y-4">
                <section id="mentions" className="scroll-mt-24"><LegalArticle><Heading>{mentions.title}</Heading><div className="mt-8 space-y-6"><div><h3>{mentions.editor}</h3><div dangerouslySetInnerHTML={{ __html: mentions.editor_text }} /></div><div><h3>{mentions.hosting}</h3><p>Vercel Inc.<br />340 S Lemon Ave #4133 Walnut, CA 91789, USA</p></div><div><h3>{mentions.ip}</h3><p>{mentions.ip_text}</p></div></div></LegalArticle></section>
                <section id="privacy" className="scroll-mt-24"><LegalArticle><Heading>{privacy.title}</Heading><p className="mt-5">{privacy.intro}</p><div className="mt-8 space-y-8">{privacy.items?.map((item) => <div key={item.title}><h3>{item.title}</h3><div dangerouslySetInnerHTML={{ __html: item.content }} /></div>)}</div></LegalArticle></section>
                <section id="cookies" className="scroll-mt-24"><LegalArticle><Heading>{cookies.title}</Heading><p className="mt-5">{cookies.intro}</p><div className="mt-8"><h3>{cookies.types}</h3><ul><li>{cookies.essential}</li><li>{cookies.analytics}</li></ul><h3>{cookies.manage}</h3><p>{cookies.manage_text}</p></div></LegalArticle></section>
                <section id="cgv" className="scroll-mt-24"><LegalArticle><Heading>{cgv.title}</Heading><p className="mt-5 rounded-[10px] border border-amber-200 bg-amber-50 p-4 text-amber-900">{cgv.b2b}</p><div className="mt-8"><h3>{cgv.price}</h3><p>Stripe (Euros/Dollars).</p><h3>{cgv.termination}</h3><p>{cgv.termination_text}</p><h3>{cgv.retraction}</h3><p>{cgv.retraction_text}</p></div></LegalArticle></section>
                <section id="terms" className="scroll-mt-24"><LegalArticle><Heading>{terms.title}</Heading><p className="mt-5">{terms.intro}</p><div className="mt-8 space-y-8">{terms.items?.map((item) => <div key={item.title}><h3>{item.title}</h3><div dangerouslySetInnerHTML={{ __html: item.content }} /></div>)}</div></LegalArticle></section>
                <section id="deletion" className="scroll-mt-24"><LegalArticle><Heading>{deletion.title}</Heading><p className="mt-5">{deletion.intro}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-[12px] bg-zinc-50 p-5"><h3>{deletion.option1}</h3></div><div className="rounded-[12px] bg-zinc-50 p-5"><h3>{deletion.option2}</h3><a href="mailto:scalientesolutions@gmail.com" className="mt-4 inline-flex items-center gap-2 font-semibold text-orange-600"><Mail className="h-4 w-4" />scalientesolutions@gmail.com</a></div></div><div className="mt-6"><h3>{deletion.process}</h3><p>{deletion.process_text}</p></div></LegalArticle></section>
            </div>
        </LegalPageLayout>
    );
}
