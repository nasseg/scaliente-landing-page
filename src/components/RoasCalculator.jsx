'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import RoasForm from '@/components/calculator/RoasForm';
import RoasResults from '@/components/calculator/RoasResults';
import { computeRoas } from '@/lib/roas-calc';
import { COUNTRY_GROUPS, CURRENCIES } from '@/lib/roas-presets';

const INITIAL_STATE = {
    country: '', preset: '', currency: 'EUR',
    price: '', cost: '', shipping: '', feeRate: '2.9', fixedFee: '0.25', adBudget: '',
    supplierShip: '', packaging: '', customs: '', discount: '',
    vat: '', vatIncluded: false, socialRate: '', socialBase: 'revenue', fixedCosts: '', returns: '',
};

function numericValues(state) {
    const numbers = ['price', 'cost', 'shipping', 'feeRate', 'fixedFee', 'adBudget', 'supplierShip', 'packaging', 'customs', 'discount', 'vat', 'socialRate', 'fixedCosts', 'returns'];
    return numbers.reduce((values, key) => ({ ...values, [key]: Number.parseFloat(state[key]) || 0 }), {
        vatIncluded: state.vatIncluded,
        socialBase: state.socialBase,
    });
}

export default function RoasCalculator({ content, lang }) {
    const [state, setState] = useState(INITIAL_STATE);
    const [copied, setCopied] = useState(false);
    const [showSticky, setShowSticky] = useState(false);
    const resultsRef = useRef(null);
    const values = useMemo(() => numericValues(state), [state]);
    const results = useMemo(() => computeRoas(values), [values]);
    const symbol = CURRENCIES.find(({ code }) => code === state.currency)?.symbol || '€';
    const hasResults = values.price > 0 && values.cost > 0;

    const update = (key, value) => setState((current) => ({ ...current, [key]: value }));

    const applyCountry = (country) => {
        const group = COUNTRY_GROUPS.find(({ key }) => key === country);
        setState((current) => ({
            ...current,
            country,
            preset: '',
            currency: group?.presets?.[0]?.currency || current.currency,
            ...(country === 'custom' ? { vat: '', vatIncluded: false, socialRate: '', socialBase: 'revenue' } : {}),
        }));
    };

    const applyPreset = (preset) => setState((current) => ({
        ...current,
        country: COUNTRY_GROUPS.find(({ presets }) => presets.some(({ key }) => key === preset.key))?.key || current.country,
        preset: preset.key,
        currency: preset.currency,
        vat: preset.vatRate ? String(preset.vatRate) : '',
        vatIncluded: preset.vatIncluded,
        socialRate: preset.socialRate ? String(preset.socialRate) : '',
        socialBase: preset.socialBase,
    }));

    useEffect(() => {
        if (!hasResults || !resultsRef.current) return undefined;
        const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0.1 });
        observer.observe(resultsRef.current);
        return () => observer.disconnect();
    }, [hasResults]);

    const copyResults = async () => {
        const lines = [
            `${content?.results?.revenue}: ${values.price.toFixed(2)} ${symbol}`,
            `${content?.results?.profitPerOrder}: ${results.profitPerOrder.toFixed(2)} ${symbol}`,
            `${content?.results?.margin}: ${results.marginPercent.toFixed(1)}%`,
            `${content?.results?.roasBreakeven}: ${results.roasBreakeven.toFixed(2)}x`,
            `scaliente.com/${lang}/tools/roas-calculator`,
        ];
        await navigator.clipboard.writeText(lines.join('\n'));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="bg-[#fafafa] px-5 py-16 text-zinc-950 sm:px-8 sm:py-24">
            <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                <RoasForm content={content} state={state} update={update} applyCountry={applyCountry} applyPreset={applyPreset} symbol={symbol} />
                <RoasResults content={content} values={values} results={results} symbol={symbol} copied={copied} onCopy={copyResults} resultsRef={resultsRef} />
            </div>
            {showSticky && hasResults && (
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-3 shadow-[0_-10px_35px_rgba(0,0,0,0.1)] backdrop-blur-xl lg:hidden">
                    <div className="mx-auto flex max-w-lg items-center justify-between gap-5">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-500">{content?.results?.profitPerOrder}</p>
                            <p className={`font-brand text-xl font-semibold ${results.profitPerOrder >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{results.profitPerOrder.toFixed(2)} {symbol}</p>
                        </div>
                        <button type="button" onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-orange-500 px-4 text-sm font-semibold text-white">
                            <ArrowDown className="h-4 w-4" aria-hidden="true" />{content?.results?.seeDetails}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
