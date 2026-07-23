import Link from 'next/link';
import { ArrowRight, BookOpen, Calculator, CircleDollarSign, Gauge, ListChecks, Scale } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';
import { GUIDE_PAGES } from '@/lib/guide-pages';

const ICONS = {
    profitTracker: CircleDollarSign,
    methodology: ListChecks,
    revenueVsProfit: Scale,
    roasVsPoas: Gauge,
    breakevenRoas: Calculator,
    shopifyCosts: BookOpen,
};

export default function GuidesHub({ content, navbar, footer, common, lang }) {
    const pages = Object.entries(GUIDE_PAGES).map(([slug, config]) => ({
        slug,
        ...content.pages[config.dictionaryKey],
        icon: ICONS[config.dictionaryKey] || BookOpen,
    }));

    return (
        <div className="min-h-screen bg-[#09090b] font-sans text-white selection:bg-orange-500/30">
            <Navbar content={navbar} lang={lang} />
            <header data-header-theme="dark" className="relative overflow-hidden border-b border-white/[0.08] px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
                <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" aria-hidden="true" />
                <div className="relative mx-auto max-w-[1240px]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">{content.hub.eyebrow}</p>
                    <div className="mt-7 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <h1 className="max-w-5xl text-balance font-brand text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                            {content.hub.title}
                        </h1>
                        <p className="max-w-xl text-pretty text-lg leading-8 text-zinc-400">{content.hub.subtitle}</p>
                    </div>
                </div>
            </header>

            <main data-header-theme="light" className="rounded-t-[28px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-t-[40px] sm:px-8 sm:py-28">
                <div className="mx-auto max-w-[1240px]">
                    <div className="grid gap-8 border-b border-zinc-200 pb-14 lg:grid-cols-[0.7fr_1.3fr]">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">{content.hub.indexLabel}</p>
                        <p className="max-w-3xl text-pretty text-2xl leading-9 tracking-[-0.025em] text-zinc-700">{content.hub.intro}</p>
                    </div>

                    <div className="grid border-t border-zinc-200 lg:grid-cols-2">
                        {pages.map(({ slug, icon: Icon, eyebrow, title, summary, readTime }, index) => (
                            <article key={slug} className={`group border-b border-zinc-200 py-9 lg:min-h-[360px] lg:px-10 lg:py-10 ${index % 2 === 0 ? 'lg:border-r lg:pl-0' : 'lg:pr-0'}`}>
                                <Link href={`/${lang}/guides/${slug}`} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                                    <div className="flex items-center justify-between">
                                        <Icon className="h-6 w-6 text-orange-600" strokeWidth={1.5} aria-hidden="true" />
                                        <span className="font-mono text-xs text-zinc-400">{readTime}</span>
                                    </div>
                                    <div className="mt-16 max-w-xl">
                                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{eyebrow}</p>
                                        <h2 className="mt-4 text-balance font-brand text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-4xl">{title}</h2>
                                        <p className="mt-5 text-sm leading-6 text-zinc-600">{summary}</p>
                                    </div>
                                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-zinc-950">
                                        {content.common.readArticle}
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <section className="mt-20 grid gap-10 rounded-[24px] bg-[#111113] px-6 py-10 text-white sm:rounded-[32px] sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">{content.hub.ctaEyebrow}</p>
                            <h2 className="mt-5 max-w-3xl text-balance font-brand text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-5xl">{content.hub.ctaTitle}</h2>
                            <p className="mt-5 max-w-2xl text-zinc-400">{content.hub.ctaDescription}</p>
                        </div>
                        <div className="lg:justify-self-end">
                            <CTAButton size="lg">{content.hub.ctaButton || common?.getStarted}</CTAButton>
                        </div>
                    </section>
                </div>
            </main>
            <Footer content={footer} lang={lang} />
        </div>
    );
}
