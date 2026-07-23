import { Activity, BarChart3, CircleDollarSign, Globe2, Layers3, Users } from 'lucide-react';

const FeatureSection = ({ content }) => {
    const features = [
        [Layers3, content?.cards?.ads],
        [CircleDollarSign, content?.cards?.profit],
        [Activity, content?.cards?.realtime],
        [Globe2, content?.cards?.multiCurrency],
        [Users, content?.cards?.customerLtv],
        [BarChart3, content?.cards?.adsPage],
    ];
    const deductions = [
        content?.bento?.ads,
        content?.bento?.cogs,
        content?.bento?.shipping,
        content?.bento?.fees,
    ];
    const cardStyles = [
        'lg:col-span-5 bg-[#151517] border-white/10 text-white',
        'lg:col-span-5 bg-[#f4f4f5] border-zinc-200 text-zinc-950',
        'lg:col-span-3 bg-[#151517] border-white/10 text-white',
        'lg:col-span-3 bg-[#151517] border-white/10 text-white',
        'lg:col-span-3 bg-[#151517] border-white/10 text-white',
        'lg:col-span-3 bg-[#151517] border-white/10 text-white',
    ];

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="max-w-5xl">
                    <h2 className="text-balance font-brand text-[clamp(2.8rem,5.8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
                        {content?.title?.part1} <span className="text-orange-500">{content?.title?.part2}</span>
                    </h2>
                    <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.description}</p>
                </div>

                <div className="mt-16 grid gap-4 lg:grid-cols-12">
                    <article className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[16px] bg-orange-500 p-7 text-white sm:p-10 lg:col-span-7 lg:row-span-2">
                        <div>
                            <p className="text-sm font-semibold text-orange-100">{content?.howItWorks}</p>
                            <h3 className="mt-4 max-w-[11ch] text-balance font-brand text-4xl font-semibold leading-[1] tracking-[-0.04em] sm:text-6xl">
                                {content?.bento?.trueProfit}
                            </h3>
                        </div>

                        <div className="mt-16 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                            <div>
                                <p className="text-sm text-orange-100">{content?.bento?.totalRevenue}</p>
                                <div className="mt-3 h-px bg-white/40" />
                            </div>
                            <span className="font-mono text-3xl" aria-hidden="true">-</span>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-white">
                                {deductions.map((label) => <span key={label}>{label}</span>)}
                            </div>
                        </div>
                    </article>

                    {features.map(([Icon, feature], index) => {
                        const lightCard = index === 1;
                        return (
                            <article key={feature?.title} className={`group flex min-h-[230px] flex-col justify-between rounded-[16px] border p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${cardStyles[index]}`}>
                                <Icon className={`h-6 w-6 ${lightCard ? 'text-orange-600' : 'text-orange-500'}`} strokeWidth={1.6} aria-hidden="true" />
                                <div className="mt-12">
                                    <h3 className="font-brand text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{feature?.title}</h3>
                                    <p className={`mt-3 text-pretty text-sm leading-6 ${lightCard ? 'text-zinc-600' : 'text-zinc-400'}`}>{feature?.desc}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
