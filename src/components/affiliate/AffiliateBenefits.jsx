import { BadgePercent, CalendarClock, Cookie, WalletCards } from 'lucide-react';

const ICONS = [BadgePercent, CalendarClock, Cookie, WalletCards];

export default function AffiliateBenefits({ content }) {
    const items = Object.values(content?.benefits?.items || {});
    return (
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">01 / Programme</p>
                <h2 className="max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content?.benefits?.title}</h2>
            </div>
            <div className="mt-16 border-t border-zinc-200">
                {items.map((item, index) => {
                    const Icon = ICONS[index] || BadgePercent;
                    return (
                        <article key={item.title} className="grid gap-5 border-b border-zinc-200 py-8 md:grid-cols-[4rem_0.8fr_1.2fr] md:items-baseline md:gap-8">
                            <Icon className="h-5 w-5 text-orange-600" strokeWidth={1.5} aria-hidden="true" />
                            <h3 className="font-brand text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                            <p className="max-w-xl text-sm leading-6 text-zinc-600">{item.desc}</p>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
