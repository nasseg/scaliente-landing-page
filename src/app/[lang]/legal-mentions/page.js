import Link from 'next/link';
import { Scale } from 'lucide-react';
import { getDictionary } from '../../i18n';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.legalPage.sections.mentions.title} - Scaliente`,
        description: dict.legalPage.subtitle,
        alternates: {
            canonical: `https://scaliente.com/${lang}/legal-mentions`,
            languages: {
                'fr': 'https://scaliente.com/fr/legal-mentions',
                'en': 'https://scaliente.com/en/legal-mentions',
                'de': 'https://scaliente.com/de/legal-mentions',
                'x-default': 'https://scaliente.com/fr/legal-mentions',
            },
        },
    };
}

export default async function LegalMentionsPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.legalPage;
    const mentions = content.sections.mentions;

    const currentDate = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-rose-100 selection:text-rose-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href={`/${lang}`} className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
                        Scaliente
                    </Link>
                    <nav className="hidden sm:flex gap-6 text-sm font-medium text-neutral-600">
                        <Link href={`/${lang}/legal-mentions`} className="text-rose-600">{content.nav.mentions}</Link>
                        <Link href={`/${lang}/privacy-policy`} className="hover:text-rose-600 transition-colors">{content.nav.privacy}</Link>
                        <Link href={`/${lang}/cookies`} className="hover:text-rose-600 transition-colors">{content.nav.cookies}</Link>
                        <Link href={`/${lang}/terms-of-sale`} className="hover:text-rose-600 transition-colors">{content.nav.cgv}</Link>
                        <Link href={`/${lang}/terms-of-service`} className="hover:text-rose-600 transition-colors">{content.nav.terms}</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                            {mentions.title}
                        </h1>
                    </div>
                    <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
                        {content.subtitle}
                    </p>
                    <div className="mt-4 text-sm text-neutral-500">
                        {content.updated} {currentDate}
                    </div>
                </div>

                <div className="prose prose-neutral max-w-none bg-white p-8 md:p-12 rounded-2xl border border-neutral-200 shadow-sm space-y-12">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">1. {mentions.editor}</h3>
                        <div className="text-neutral-600 leading-relaxed">
                            <p dangerouslySetInnerHTML={{ __html: mentions.editor_text }} />
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div><strong>{mentions.legal_form_label}</strong> {mentions.legal_form_value}</div>
                                <div><strong>{mentions.headquarters_label}</strong> {mentions.headquarters_value}</div>
                                <div><strong>{mentions.email_label}</strong> <a href="mailto:scalientesolutions@gmail.com" className="text-rose-600 hover:underline">scalientesolutions@gmail.com</a></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">2. {mentions.hosting}</h3>
                        <div className="text-neutral-600 leading-relaxed">
                            <p>Vercel Inc.</p>
                            <p>340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">3. {mentions.ip}</h3>
                        <div className="text-neutral-600 leading-relaxed">
                            <p>{mentions.ip_text}</p>
                        </div>
                    </div>
                </div>

                <footer className="mt-24 pt-12 border-t border-neutral-200 text-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} SCALIENTE LLC. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
