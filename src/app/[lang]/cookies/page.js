import Link from 'next/link';
import { Shield } from 'lucide-react';
import { getDictionary } from '../../i18n';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.legalPage.sections.cookies.title} - Scaliente`,
        description: dict.legalPage.sections.cookies.intro,
    };
}

export default async function CookiesPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.legalPage;
    const cookies = content.sections.cookies;

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
                        <Link href={`/${lang}/legal-mentions`} className="hover:text-rose-600 transition-colors">{content.nav.mentions}</Link>
                        <Link href={`/${lang}/privacy-policy`} className="hover:text-rose-600 transition-colors">{content.nav.privacy}</Link>
                        <Link href={`/${lang}/cookies`} className="text-rose-600">{content.nav.cookies}</Link>
                        <Link href={`/${lang}/terms-of-sale`} className="hover:text-rose-600 transition-colors">{content.nav.cgv}</Link>
                        <Link href={`/${lang}/terms-of-service`} className="hover:text-rose-600 transition-colors">{content.nav.terms}</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                            {cookies.title}
                        </h1>
                    </div>
                    <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
                        {cookies.intro}
                    </p>
                    <div className="mt-4 text-sm text-neutral-500">
                        {content.updated} {currentDate}
                    </div>
                </div>

                <div className="prose prose-neutral max-w-none bg-white p-8 md:p-12 rounded-2xl border border-neutral-200 shadow-sm space-y-10">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">{cookies.types}</h3>
                        <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed">
                            <li>{cookies.essential}</li>
                            <li>{cookies.analytics}</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">{cookies.manage}</h3>
                        <p className="text-neutral-600 leading-relaxed">{cookies.manage_text}</p>
                    </div>
                </div>

                <footer className="mt-24 pt-12 border-t border-neutral-200 text-center text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} SCALIENTE LLC. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
