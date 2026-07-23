import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock3, MessageSquareText, Package, ShieldCheck, UserRound } from 'lucide-react';
import StoryHeader from './StoryHeader';

const contextIcons = [Package, UserRound, Clock3];

export default function InboxStory({ content, lang }) {
    const context = Object.values(content?.context || {});

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32 lg:py-40">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="flex flex-wrap items-start justify-between gap-8">
                    <StoryHeader content={content} index={4} />
                    <div className="flex flex-wrap items-center gap-3">
                        {content?.beta && (
                            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-orange-300">
                                {content.beta}
                            </span>
                        )}
                        <Link
                            href={`/${lang}/features/ai-customer-service`}
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500/45 hover:text-orange-300"
                        >
                            {content?.cta}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>

                <div className="mt-14 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.035]">
                    <div className="grid lg:grid-cols-[0.72fr_0.88fr_1.1fr]">
                        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                            <MessageSquareText className="h-6 w-6 text-orange-400" strokeWidth={1.6} />
                            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{content?.flow?.requestLabel}</p>
                            <blockquote className="mt-4 font-brand text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-white">“{content?.flow?.request}”</blockquote>
                        </div>

                        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{content?.flow?.contextLabel}</p>
                            <div className="mt-5 space-y-2">
                                {context.map((item, index) => {
                                    const Icon = contextIcons[index];
                                    return <div key={item} className="flex items-center gap-3 rounded-[10px] border border-white/8 bg-black/20 px-4 py-3 text-sm text-zinc-300"><Icon className="h-4 w-4 text-orange-400" />{item}</div>;
                                })}
                            </div>
                            <ArrowRight className="mt-7 h-5 w-5 text-orange-500" aria-hidden="true" />
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{content?.flow?.draftLabel}</p>
                                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-semibold text-emerald-300"><ShieldCheck className="h-3.5 w-3.5" />{content?.flow?.guard}</span>
                            </div>
                            <p className="mt-6 leading-7 text-zinc-200">{content?.flow?.draft}</p>
                            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-zinc-400">
                                <CheckCircle2 className="h-4 w-4 text-orange-400" />
                                {content?.flow?.approval}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
