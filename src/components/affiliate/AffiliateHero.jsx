import { ArrowRight } from 'lucide-react';
import { AFFILIATE_TERMS } from '@/lib/affiliate-application';

export default function AffiliateHero({ content }) {
    const stats = [
        { value: `${AFFILIATE_TERMS.minimumCommissionPercent}-${AFFILIATE_TERMS.maximumCommissionPercent}%`, label: content?.stats?.commissionLabel },
        { value: `${AFFILIATE_TERMS.referralDiscountPercent}%`, label: content?.stats?.discountLabel },
        { value: content?.stats?.cookieValue, label: content?.stats?.cookieLabel },
        { value: content?.stats?.durationValue, label: content?.stats?.durationLabel },
    ];

    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] px-5 pb-14 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
            <div className="relative mx-auto max-w-[1240px]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">{content?.hero?.badge}</p>
                <div className="mt-5 grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <h1 className="max-w-5xl text-balance font-brand text-[clamp(2.75rem,5.5vw,6rem)] font-semibold leading-[0.93] tracking-[-0.055em]">
                        {content?.hero?.titleWhite} <span className="text-orange-500">{content?.hero?.titleOrange}</span>
                    </h1>
                    <div className="lg:pb-2">
                        <p className="text-pretty text-base leading-7 text-zinc-400 sm:text-lg">{content?.hero?.subtitle}</p>
                        <a href="#application-form" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400">
                            {content?.hero?.cta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
                <div className="mt-12 grid border-y border-white/[0.12] sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map(({ value, label }, index) => (
                        <div key={label} className="border-b border-white/[0.1] py-5 sm:px-5 sm:[&:nth-child(even)]:border-l lg:border-b-0 lg:border-l lg:first:border-l-0">
                            <span className="font-brand text-3xl font-semibold tracking-[-0.04em]">{value}</span>
                            <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-zinc-500">{label}</span>
                            <span className="sr-only">{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
