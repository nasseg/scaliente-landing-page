import { Check, Minus, ArrowUpRight, Shield, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

const DIFFERENTIATORS = [
    { key: 'freePlan', icon: Zap },
    { key: 'noSurcharge', icon: Shield },
    { key: 'multiCurrency', icon: Globe },
];

const ROWS = [
    ['freePlan', 'competitorFreePlan'],
    ['perOrderFee', 'competitorPerOrderFee'],
    ['multiCurrency', 'competitorMultiCurrency'],
    ['multiShop', 'competitorMultiShop'],
    ['adPlatforms', 'competitorAdPlatforms'],
    ['realtime', 'competitorRealtime'],
    ['mobileApp', 'competitorMobileApp'],
    ['gdpr', 'competitorGdpr'],
    ['europeanHosting', 'competitorEuropeanHosting'],
];

function Value({ value, accent = false }) {
    if (typeof value !== 'boolean') {
        return <span className={`text-sm font-semibold ${accent ? 'text-orange-600' : 'text-zinc-700'}`}>{value}</span>;
    }
    return value
        ? <Check className={`mx-auto h-5 w-5 ${accent ? 'text-orange-600' : 'text-emerald-600'}`} aria-label="Yes" />
        : <Minus className="mx-auto h-5 w-5 text-zinc-300" aria-label="No" />;
}

function DecisionLedger({ content }) {
    const items = DIFFERENTIATORS.map(({ key, icon }) => ({ ...content?.differentiators?.[key], key, icon }))
        .filter(({ title, desc }) => title && desc);
    if (!items.length) return null;

    return (
        <div className="border-y border-zinc-200">
            {items.map(({ key, icon: Icon, title, desc }, index) => (
                <article key={key} className="grid gap-5 border-b border-zinc-200 py-8 last:border-b-0 md:grid-cols-[4rem_0.8fr_1.2fr] md:items-baseline md:gap-8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-orange-600">
                        <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <h2 className="font-brand text-2xl font-semibold tracking-[-0.035em]">{title}</h2>
                    <p className="max-w-xl text-sm leading-6 text-zinc-600">{desc}</p>
                    <span className="sr-only">{index + 1}</span>
                </article>
            ))}
        </div>
    );
}

function ComparisonTable({ content, competitorName }) {
    const rows = ROWS.map(([label, competitor]) => ({
        feature: content?.table?.[label],
        scaliente: true,
        competitor: content?.table?.[competitor],
    })).filter(({ feature, competitor }) => feature && competitor !== undefined);

    if (content?.table?.startingPrice) {
        rows.push({
            feature: content.table.startingPrice,
            scaliente: content.table.scalinetPrice,
            competitor: content.table.competitorPrice,
        });
    }

    return (
        <details className="group mt-16 border-y border-zinc-200" open>
            <summary className="flex cursor-pointer list-none items-center justify-between py-6 text-sm font-semibold text-zinc-900 marker:hidden">
                {content?.tableToggle}
                <span className="text-xs text-zinc-500 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="overflow-x-auto pb-8">
                <table className="w-full min-w-[680px] border-collapse text-left">
                    <thead>
                        <tr className="border-y border-zinc-200 text-xs uppercase tracking-[0.12em] text-zinc-500">
                            <th className="px-4 py-5 font-semibold">{content?.table?.feature}</th>
                            <th className="bg-orange-50 px-4 py-5 text-center font-semibold text-orange-700">Scaliente</th>
                            <th className="px-4 py-5 text-center font-semibold">{competitorName}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.feature} className="border-b border-zinc-200 last:border-b-0">
                                <td className="px-4 py-5 text-sm text-zinc-700">{row.feature}</td>
                                <td className="bg-orange-50/60 px-4 py-5 text-center"><Value value={row.scaliente} accent /></td>
                                <td className="px-4 py-5 text-center"><Value value={row.competitor} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </details>
    );
}

export default function ComparisonContent({ content, competitorName, lang, slug }) {
    const comparisons = [
        ['scaliente-vs-trueprofit', 'TrueProfit'],
        ['scaliente-vs-triple-whale', 'Triple Whale'],
        ['scaliente-vs-lifetimely', 'Lifetimely'],
    ].filter(([candidate]) => candidate !== slug);

    return (
        <div className="space-y-3 bg-[#09090b] pb-3">
            <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[36px] sm:px-8 sm:py-28">
                <div className="mx-auto max-w-[1120px]">
                    <p className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">Scaliente / {competitorName}</p>
                    <DecisionLedger content={content} />
                    <ComparisonTable content={content} competitorName={competitorName} />
                </div>
            </section>

            {(content?.whyScaliente?.title || content?.whyScaliente?.p1) && (
                <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
                    <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                        <h2 className="text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{content.whyScaliente.title}</h2>
                        <div className="space-y-5 text-lg leading-8 text-zinc-400">
                            {content.whyScaliente.p1 && <p>{content.whyScaliente.p1}</p>}
                            {content.whyScaliente.p2 && <p>{content.whyScaliente.p2}</p>}
                        </div>
                    </div>
                </section>
            )}

            <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-16 text-zinc-950 sm:rounded-[36px] sm:px-8">
                <div className="mx-auto flex max-w-[1120px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-brand text-2xl font-semibold tracking-[-0.035em]">{content?.seeAlso}</h2>
                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {comparisons.map(([href, label]) => (
                            <Link key={href} href={`/${lang}/compare/${href}`} className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 transition-colors hover:text-orange-600">
                                {label}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
