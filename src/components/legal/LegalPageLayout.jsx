import Image from 'next/image';
import Link from 'next/link';
import { FileText, Lock, Scale, Shield } from 'lucide-react';

const NAV_ITEMS = [
    ['mentions', 'legal-mentions'],
    ['privacy', 'privacy-policy'],
    ['cookies', 'cookies'],
    ['cgv', 'terms-of-sale'],
    ['terms', 'terms-of-service'],
];

const ICONS = { mentions: Scale, privacy: Lock, cookies: Shield, cgv: FileText, terms: FileText, legal: Scale };

export function formatLegalDate(lang, date = new Date()) {
    const locale = lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US';
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function LegalArticle({ children, className = '' }) {
    return <article className={`legal-article rounded-[18px] border border-zinc-200 bg-white p-6 sm:p-10 ${className}`}>{children}</article>;
}

export default function LegalPageLayout({ lang, content, active = 'legal', title, intro, children }) {
    const Icon = ICONS[active] || Scale;
    return (
        <main className="min-h-screen bg-[#f4f4f1] font-sans text-[#111113] selection:bg-orange-200">
            <header className="sticky top-0 z-50 border-b border-zinc-200 bg-[#f4f4f1]/90 backdrop-blur-xl">
                <div className="mx-auto flex min-h-16 max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
                    <Link href={`/${lang}`} className="relative block h-7 w-[132px]" aria-label="Scaliente">
                        <Image src="/scaliente-horizontal-dark.svg" alt="" fill sizes="132px" className="object-contain object-left" priority />
                    </Link>
                    <nav aria-label="Legal" className="hidden items-center gap-5 lg:flex">
                        {NAV_ITEMS.map(([key, route]) => (
                            <Link key={key} href={`/${lang}/${route}`} className={`text-xs font-semibold transition-colors ${active === key ? 'text-orange-700' : 'text-zinc-700 hover:text-zinc-950'}`}>{content.nav[key]}</Link>
                        ))}
                    </nav>
                    <Link href={`/${lang}`} className="text-xs font-semibold text-zinc-700 transition-colors hover:text-orange-700">scaliente.com</Link>
                </div>
            </header>

            <div className="mx-auto max-w-[1180px] px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
                <div className="grid gap-7 border-b border-zinc-300 pb-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-14">
                    <div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-600"><Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /></span>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-600">{content.updated} {formatLegalDate(lang)}</p>
                    </div>
                    <div>
                        <h1 className="text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{title}</h1>
                        {intro && <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-700 sm:text-lg">{intro}</p>}
                    </div>
                </div>

                <div className="mt-8">{children}</div>
                <footer className="mt-20 border-t border-zinc-300 pt-8 text-xs text-zinc-600">© {new Date().getFullYear()} SCALIENTE LLC. All rights reserved.</footer>
            </div>
        </main>
    );
}
