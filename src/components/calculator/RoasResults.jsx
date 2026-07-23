import { BarChart3, Calculator, Copy, DollarSign, ShoppingCart, Target } from 'lucide-react';

function Metric({ icon: Icon, label, value, tone = 'text-zinc-950' }) {
    return (
        <div className="border-t border-zinc-200 py-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">
                <Icon className="h-4 w-4 text-orange-600" strokeWidth={1.6} aria-hidden="true" />{label}
            </div>
            <p className={`mt-3 font-brand text-3xl font-semibold tracking-[-0.04em] ${tone}`}>{value}</p>
        </div>
    );
}

function WaterfallRow({ label, value, tone = 'text-zinc-600' }) {
    return (
        <div className={`flex items-center justify-between gap-5 py-2 text-sm ${tone}`}>
            <span>{label}</span><span className="font-mono font-semibold">{value}</span>
        </div>
    );
}

export default function RoasResults({ content, values, results, symbol, copied, onCopy, resultsRef }) {
    const format = (value) => `${value.toFixed(2)} ${symbol}`;
    const hasResults = values.price > 0 && values.cost > 0;

    if (!hasResults) {
        return (
            <div ref={resultsRef} className="sticky top-24 rounded-[20px] border border-zinc-800 bg-[#111114] p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-400">02</p>
                <h2 className="mt-3 font-brand text-3xl font-semibold tracking-[-0.04em]">{content?.results?.title}</h2>
                <div className="mt-16 border-y border-white/[0.1] py-8">
                    <p className="max-w-sm text-lg leading-8 text-zinc-400">{content?.results?.empty}</p>
                </div>
            </div>
        );
    }

    const deductions = [
        [content?.results?.vatDeducted, results.vatAmount],
        [content?.results?.returnsImpact, results.returnsAmount],
        [content?.results?.discountImpact, results.discountAmount],
        [content?.results?.productCost, values.cost],
        [content?.results?.shipping, values.shipping + values.supplierShip],
        [content?.results?.packaging, values.packaging],
        [content?.results?.customs, values.customs],
        [content?.results?.fees, results.paymentFee],
        [content?.results?.socialCharges, results.socialChargesAmount],
    ].filter(([label, value]) => label && value > 0);

    return (
        <div ref={resultsRef} className="sticky top-24 rounded-[20px] border border-zinc-800 bg-[#111114] p-6 text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-400">02</p>
                    <h2 className="mt-2 font-brand text-2xl font-semibold tracking-[-0.035em]">{content?.results?.title}</h2>
                </div>
                <Calculator className="h-5 w-5 text-zinc-500" aria-hidden="true" />
            </div>

            <div className="mt-6">
                <WaterfallRow label={content?.results?.revenue} value={format(values.price)} tone="text-zinc-200" />
                {deductions.map(([label, value]) => <WaterfallRow key={label} label={label} value={`−${format(value)}`} tone="text-zinc-500" />)}
                <div className="mt-3 flex items-end justify-between gap-5 border-t border-white/[0.12] pt-5">
                    <span className="text-sm font-semibold text-zinc-200">{content?.results?.profitPerOrder}</span>
                    <strong className={`font-brand text-4xl tracking-[-0.045em] ${results.profitPerOrder >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{format(results.profitPerOrder)}</strong>
                </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-5">
                <Metric icon={BarChart3} label={content?.results?.margin} value={`${results.marginPercent.toFixed(1)}%`} tone="text-white" />
                <Metric icon={Target} label={content?.results?.roasBreakeven} value={results.roasBreakeven > 0 ? `${results.roasBreakeven.toFixed(2)}x` : '–'} tone="text-white" />
                <Metric icon={DollarSign} label={content?.results?.maxCPA} value={results.profitPerOrder > 0 ? format(results.profitPerOrder) : '–'} tone="text-white" />
                {(values.adBudget > 0 || values.fixedCosts > 0) && <Metric icon={ShoppingCart} label={content?.results?.breakEvenOrders} value={results.profitPerOrder > 0 ? results.ordersNeeded : '∞'} tone="text-white" />}
            </div>

            {(values.adBudget > 0 || values.fixedCosts > 0) && results.profitPerOrder > 0 && (
                <div className="mt-5 border-t border-white/[0.12] pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">{content?.results?.monthlyTitle}</p>
                    <div className="mt-4 space-y-2">
                        <WaterfallRow label={content?.results?.monthlyRevenue} value={format(results.monthlyRevenue)} tone="text-zinc-300" />
                        <WaterfallRow label={content?.results?.monthlyProfit} value={format(results.monthlyProfit)} tone={results.monthlyProfit >= 0 ? 'text-emerald-400' : 'text-red-400'} />
                    </div>
                </div>
            )}

            <button type="button" onClick={onCopy} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/[0.12] px-4 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/[0.25] hover:text-white">
                <Copy className="h-4 w-4" aria-hidden="true" />{copied ? content?.results?.copied : content?.results?.copy}
            </button>
        </div>
    );
}
