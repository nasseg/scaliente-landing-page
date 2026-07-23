import Image from 'next/image';
import { ArrowUpRight, Gauge, PackageSearch, Scale } from 'lucide-react';
import StoryHeader from './StoryHeader';

const icons = [Gauge, PackageSearch, Scale];

export default function DecisionStory({ content }) {
    const decisions = Object.values(content?.decisions || {});

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32 lg:py-40">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-20">
                    <StoryHeader content={content} index={3} />
                    <p className="max-w-xl text-pretty text-lg leading-8 text-[var(--text-secondary)] lg:pb-1">{content?.aside}</p>
                </div>

                <div className="mt-14 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
                    <ol className="overflow-hidden rounded-[18px] border border-[var(--card-border)] bg-[var(--card-bg)]">
                        {decisions.map((decision, index) => {
                            const Icon = icons[index];
                            return (
                                <li key={decision.title} className="group grid grid-cols-[2.75rem_1fr_auto] gap-4 border-b border-[var(--divider)] p-5 last:border-b-0 sm:p-7">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--card-bg-alt)] text-orange-500"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                                    <span>
                                        <span className="block font-brand text-lg font-semibold tracking-[-0.025em]">{decision.title}</span>
                                        <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{decision.description}</span>
                                    </span>
                                    <ArrowUpRight className="mt-1 h-4 w-4 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500" aria-hidden="true" />
                                </li>
                            );
                        })}
                    </ol>

                    <div className="min-w-0 overflow-hidden rounded-[18px] bg-[#f2f4f7] p-3 sm:p-5 lg:p-7">
                        <Image
                            src="/desktop_dashboard_ads_meta_anonymized.png"
                            alt={content?.imageAlt || ''}
                            width={3024}
                            height={1548}
                            sizes="(max-width: 1024px) 100vw, 62vw"
                            className="h-auto w-full rounded-[11px] shadow-[0_30px_70px_-38px_rgba(15,23,42,0.58)] ring-1 ring-zinc-950/8"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
