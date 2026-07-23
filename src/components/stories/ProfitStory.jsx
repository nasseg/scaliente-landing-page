import Image from 'next/image';
import { ArrowDown, Check } from 'lucide-react';
import StoryHeader from './StoryHeader';

export default function ProfitStory({ content }) {
    const costs = Object.values(content?.costs || {});

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32 lg:py-40">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <StoryHeader content={content} index={1} />

                <div className="mt-14 grid overflow-hidden rounded-[18px] border border-[var(--card-border)] bg-[var(--card-bg)] lg:grid-cols-[0.72fr_1.28fr]">
                    <div className="flex flex-col justify-between border-b border-[var(--divider)] p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{content?.equation?.label}</p>
                            <p className="mt-5 max-w-[12ch] font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{content?.equation?.revenue}</p>
                            <ArrowDown className="my-5 h-5 w-5 text-orange-500" aria-hidden="true" />
                            <div className="space-y-3">
                                {costs.map((cost) => (
                                    <p key={cost} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                                        <span className="h-px w-3 bg-orange-500" aria-hidden="true" />
                                        {cost}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="mt-10 border-t border-[var(--divider)] pt-6">
                            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-600"><Check className="h-4 w-4" />{content?.equation?.resultLabel}</p>
                            <p className="mt-3 font-brand text-3xl font-semibold tracking-[-0.035em]">{content?.equation?.result}</p>
                        </div>
                    </div>

                    <div className="relative min-w-0 overflow-hidden bg-[#f2f4f7] p-3 sm:p-5 lg:p-8">
                        <div className="absolute inset-x-1/4 top-0 h-32 bg-emerald-300/20 blur-3xl" aria-hidden="true" />
                        <Image
                            src="/mobile_dashboard_overview_anonymized.png"
                            alt={content?.imageAlt || ''}
                            width={680}
                            height={1388}
                            sizes="100vw"
                            className="relative h-auto w-full rounded-[12px] shadow-[0_35px_80px_-42px_rgba(15,23,42,0.55)] ring-1 ring-zinc-950/8 sm:hidden"
                        />
                        <Image
                            src="/desktop_dashboard_overview_anonymized.png"
                            alt={content?.imageAlt || ''}
                            width={3024}
                            height={1566}
                            sizes="(max-width: 1024px) 100vw, 65vw"
                            className="relative hidden h-auto w-full rounded-[12px] shadow-[0_35px_80px_-42px_rgba(15,23,42,0.55)] ring-1 ring-zinc-950/8 sm:block"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
