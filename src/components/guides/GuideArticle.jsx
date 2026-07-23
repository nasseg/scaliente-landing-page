import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';
import { GUIDE_PAGES } from '@/lib/guide-pages';

export default function GuideArticle({ page, guides, config, navbar, footer, lang }) {
    const common = guides.common;
    const related = config.related.map((slug) => {
        const relatedConfig = GUIDE_PAGES[slug];
        return { slug, ...guides.pages[relatedConfig.dictionaryKey] };
    });

    return (
        <div className="min-h-screen bg-[#09090b] font-sans text-white selection:bg-orange-500/30">
            <Navbar content={navbar} lang={lang} />
            <article>
                <header data-header-theme="dark" className="relative overflow-hidden border-b border-white/[0.08] px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
                    <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
                    <div className="relative mx-auto max-w-[1240px]">
                        <Link href={`/${lang}/guides`} className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            {common.backToGuides}
                        </Link>
                        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">{page.eyebrow}</p>
                                <h1 className="mt-6 max-w-5xl text-balance font-brand text-[clamp(2.8rem,6vw,6.3rem)] font-semibold leading-[0.92] tracking-[-0.052em]">{page.title}</h1>
                            </div>
                            <div className="border-t border-white/[0.12] pt-6">
                                <p className="text-pretty text-lg leading-8 text-zinc-300">{page.summary}</p>
                                <dl className="mt-7 grid grid-cols-2 gap-5 text-xs">
                                    <div>
                                        <dt className="text-zinc-600">{common.updatedLabel}</dt>
                                        <dd className="mt-1 text-zinc-300">{page.updated}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-zinc-600">{common.readTimeLabel}</dt>
                                        <dd className="mt-1 text-zinc-300">{page.readTime}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </header>

                <div data-header-theme="light" className="rounded-t-[28px] bg-[#fafafa] px-5 py-16 text-zinc-950 sm:rounded-t-[40px] sm:px-8 sm:py-24">
                    <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[240px_minmax(0,760px)] lg:justify-between lg:gap-20">
                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{common.contentsLabel}</p>
                            <nav aria-label={common.contentsLabel} className="mt-5 border-l border-zinc-200">
                                {page.sections.map((section, index) => (
                                    <a key={section.id} href={`#${section.id}`} className="block border-l border-transparent py-2 pl-4 text-sm text-zinc-500 transition-colors hover:border-orange-500 hover:text-zinc-950">
                                        <span className="mr-2 font-mono text-[0.65rem] text-zinc-400">0{index + 1}</span>
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                            <p className="mt-8 text-xs leading-5 text-zinc-500">{common.authorLabel}: {common.author}</p>
                        </aside>

                        <div>
                            <section aria-labelledby="direct-answer" className="border-y border-zinc-200 py-9">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">{common.directAnswerLabel}</p>
                                <h2 id="direct-answer" className="sr-only">{common.directAnswerLabel}</h2>
                                <p className="mt-5 text-pretty text-2xl font-medium leading-9 tracking-[-0.025em] text-zinc-800">{page.answer}</p>
                            </section>

                            <section className="py-10">
                                <h2 className="font-brand text-2xl font-semibold tracking-[-0.03em]">{common.keyPointsLabel}</h2>
                                <ul className="mt-6 space-y-4">
                                    {page.keyPoints.map((point) => (
                                        <li key={point} className="flex gap-4 text-base leading-7 text-zinc-700">
                                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {page.sections.map((section) => (
                                <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-zinc-200 py-12">
                                    <h2 className="text-balance font-brand text-3xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-4xl">{section.title}</h2>
                                    <div className="mt-7 space-y-5 text-[1.05rem] leading-8 text-zinc-700">
                                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                                    </div>
                                    <ul className="mt-7 grid gap-3">
                                        {section.bullets.map((bullet) => (
                                            <li key={bullet} className="border-l-2 border-orange-500 bg-orange-50/70 px-5 py-3 text-sm leading-6 text-orange-950">{bullet}</li>
                                        ))}
                                    </ul>
                                </section>
                            ))}

                            <section className="border-t border-zinc-200 py-12">
                                <h2 className="font-brand text-2xl font-semibold tracking-[-0.03em]">{common.sourcesLabel}</h2>
                                <p className="mt-4 text-sm leading-6 text-zinc-500">{common.sourcesIntro}</p>
                                <ul className="mt-6 space-y-3">
                                    {page.sources.map((source) => (
                                        <li key={source.url}>
                                            <a href={source.url} rel="noreferrer" className="inline-flex items-start gap-2 text-sm leading-6 text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-orange-500">
                                                {source.label}
                                                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="rounded-[22px] bg-[#111113] p-7 text-white sm:p-9">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">{common.productEyebrow}</p>
                                <h2 className="mt-4 text-balance font-brand text-3xl font-semibold tracking-[-0.04em]">{page.productTitle}</h2>
                                <p className="mt-4 max-w-2xl leading-7 text-zinc-400">{page.productDescription}</p>
                                <div className="mt-7">
                                    <CTAButton href={`/${lang}${config.featurePath}`} size="lg">{page.productCta}</CTAButton>
                                </div>
                            </section>
                        </div>
                    </div>

                    <section className="mx-auto mt-20 max-w-[1240px] border-t border-zinc-200 pt-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{common.relatedLabel}</p>
                        <div className="mt-7 grid gap-px overflow-hidden rounded-[18px] border border-zinc-200 bg-zinc-200 md:grid-cols-3">
                            {related.map((item) => (
                                <Link key={item.slug} href={`/${lang}/guides/${item.slug}`} className="group flex min-h-52 flex-col bg-white p-6 transition-colors hover:bg-orange-50">
                                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">{item.eyebrow}</span>
                                    <h3 className="mt-5 text-balance font-brand text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                                    <ArrowRight className="mt-auto h-4 w-4 text-orange-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </article>
            <Footer content={footer} lang={lang} />
        </div>
    );
}
