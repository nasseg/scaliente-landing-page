import Image from 'next/image';
import { ArrowRight, CircleDot, Crosshair, Eye } from 'lucide-react';
import StoryHeader from './StoryHeader';

export default function AttributionStory({ content }) {
    const stages = Object.values(content?.journey || {});

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32 lg:py-40">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <StoryHeader content={content} index={2} />

                <div className="mt-14 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
                    <div className="flex min-h-[520px] flex-col rounded-[18px] border border-white/10 bg-white/[0.035] p-6 sm:p-9">
                        <Crosshair className="h-7 w-7 text-orange-500" strokeWidth={1.6} aria-hidden="true" />
                        <p className="mt-8 max-w-[15ch] font-brand text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">{content?.signal?.title}</p>
                        <p className="mt-4 max-w-lg leading-7 text-[var(--text-secondary)]">{content?.signal?.description}</p>

                        <div className="mt-auto pt-12">
                            <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-black/25 p-2">
                                {stages.map((stage, index) => (
                                    <div key={stage} className="contents">
                                        <span className="inline-flex min-h-9 flex-1 items-center justify-center rounded-full bg-white/[0.06] px-3 text-center text-[0.68rem] font-medium text-zinc-200 sm:text-xs">{stage}</span>
                                        {index < stages.length - 1 && <ArrowRight className="mx-1 h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden="true" />}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-sm leading-6 text-zinc-400">
                                <Eye className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                                <p>{content?.signal?.transparency}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative min-w-0 overflow-hidden rounded-[18px] border border-white/10 bg-[#f3f5f8] p-3 sm:p-5 lg:p-7">
                        <div className="mb-4 flex items-center justify-between px-1 text-zinc-950">
                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]"><CircleDot className="h-4 w-4 text-orange-500" />{content?.screenLabel}</div>
                            <span className="text-xs text-zinc-500">{content?.screenNote}</span>
                        </div>
                        <Image
                            src="/desktop_dashboard_ads_overview_anonymized.png"
                            alt={content?.imageAlt || ''}
                            width={3020}
                            height={1544}
                            sizes="(max-width: 1024px) 100vw, 62vw"
                            className="h-auto w-full rounded-[11px] shadow-[0_30px_70px_-38px_rgba(15,23,42,0.62)] ring-1 ring-zinc-950/8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
