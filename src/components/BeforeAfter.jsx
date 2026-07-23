import { ArrowRight, Check, FileSpreadsheet, X } from 'lucide-react';

const BeforeAfter = ({ content }) => {
    const tabs = Object.values(content?.before?.tabs || {});
    const clarity = [
        content?.after?.dashboard?.netProfit,
        content?.after?.dashboard?.margin,
        content?.after?.dashboard?.lastUpdate,
    ].filter(Boolean);

    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="max-w-4xl">
                    <h2 className="text-balance font-brand text-[clamp(2.7rem,6vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[var(--text-primary)]">
                        {content?.title?.main} <span className="text-orange-600">{content?.title?.highlight}</span>
                    </h2>
                    <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">
                        {content?.subtitle}
                    </p>
                </div>

                <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[0.92fr_64px_1.08fr] lg:gap-0">
                    <article className="flex min-h-[420px] flex-col rounded-[16px] border border-zinc-300 bg-zinc-100 p-6 text-zinc-950 sm:p-9">
                        <div className="flex items-center justify-between gap-5">
                            <div className="flex items-center gap-3">
                                <FileSpreadsheet className="h-5 w-5 text-zinc-500" aria-hidden="true" />
                                <h3 className="font-brand text-xl font-semibold">{content?.before?.label}</h3>
                            </div>
                            <span className="inline-flex items-center gap-2 text-xs font-medium text-red-700">
                                <X className="h-4 w-4" aria-hidden="true" />
                                {content?.before?.excel?.error}
                            </span>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-2.5" aria-label={content?.before?.label}>
                            {tabs.map((tab, index) => (
                                <span key={tab} className={`rounded-[8px] border px-3 py-2 text-sm ${index === 0 ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-300 bg-white text-zinc-600'}`}>
                                    {tab}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto border-t border-zinc-300 pt-7">
                            <p className="font-mono text-xs text-zinc-500">{content?.before?.excel?.filename}</p>
                            <p className="mt-4 max-w-md text-pretty text-lg italic leading-8 text-zinc-700">{content?.before?.quote}</p>
                        </div>
                    </article>

                    <div className="relative z-10 flex items-center justify-center py-2 text-orange-600 lg:py-0" aria-hidden="true">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-300 bg-white shadow-[0_10px_30px_rgba(24,24,27,0.08)]">
                            <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                        </span>
                    </div>

                    <article className="flex min-h-[420px] flex-col rounded-[16px] bg-zinc-950 p-6 text-white sm:p-9">
                        <div className="flex items-center justify-between gap-5 border-b border-white/10 pb-6">
                            <div>
                                <p className="text-sm font-semibold text-orange-400">Scaliente</p>
                                <h3 className="mt-2 font-brand text-2xl font-semibold">{content?.after?.label}</h3>
                            </div>
                            <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300">
                                <Check className="h-4 w-4 text-orange-400" aria-hidden="true" />
                                {content?.after?.dashboard?.synced}
                            </span>
                        </div>

                        <p className="mt-10 max-w-[14ch] text-balance font-brand text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                            {content?.after?.quote}
                        </p>

                        <div className="mt-auto grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
                            {clarity.map((item) => (
                                <p key={item} className="text-sm leading-6 text-zinc-400">{item}</p>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
