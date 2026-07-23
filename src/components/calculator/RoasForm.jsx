import { Globe } from 'lucide-react';
import NumberField from '@/components/calculator/NumberField';
import { COUNTRY_GROUPS, CURRENCIES, PAYMENT_PRESETS } from '@/lib/roas-presets';

const BASIC_FIELDS = [
    ['price', 'sellingPrice', '29.90'],
    ['cost', 'productCost', '8.50'],
    ['shipping', 'shippingCost', '4.90'],
    ['adBudget', 'adBudget', '500'],
];

const ADVANCED_FIELDS = [
    ['supplierShip', 'supplierShipping', '2.00'],
    ['fixedFee', 'fixedFee', '0.25'],
    ['packaging', 'packagingCost', '1.50'],
    ['customs', 'customsDuty', '2.00'],
    ['discount', 'discountRate', '10', '%', '100'],
];

const TAX_FIELDS = [
    ['vat', 'vatRate', '20', '%', '100'],
    ['socialRate', 'socialChargesRate', '13.8', '%', '100'],
    ['fixedCosts', 'monthlyFixedCosts', '200'],
    ['returns', 'returnRate', '5', '%', '100'],
];

function FieldSet({ fields, state, update, content, symbol }) {
    return fields.map(([name, key, placeholder, unit, max]) => (
        <NumberField
            key={name}
            label={content?.fields?.[key] || key}
            hint={content?.fields?.[`${key}Hint`]}
            symbol={unit || symbol}
            value={state[name]}
            onChange={(value) => update(name, value)}
            placeholder={placeholder}
            max={max}
            step={unit === '%' ? '0.1' : undefined}
        />
    ));
}

export default function RoasForm({ content, state, update, applyCountry, applyPreset, symbol }) {
    const activeGroup = COUNTRY_GROUPS.find(({ key }) => key === state.country);
    const primaryCurrencies = CURRENCIES.slice(0, 6);

    return (
        <div className="rounded-[20px] border border-zinc-200 bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-600">01</p>
                    <h2 className="mt-2 font-brand text-2xl font-semibold tracking-[-0.035em]">{content?.formTitle || content?.title}</h2>
                </div>
                <Globe className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            </div>

            <div className="mt-7 space-y-6">
                <label className="block text-sm font-medium text-zinc-800">
                    {content?.presets?.countryLabel}
                    <select value={state.country} onChange={(event) => applyCountry(event.target.value)} className="mt-2 min-h-12 w-full rounded-[10px] border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10">
                        <option value="">{content?.presets?.selectCountry}</option>
                        {COUNTRY_GROUPS.map(({ key, flag }) => <option key={key} value={key}>{flag} {content?.presets?.[key]}</option>)}
                        <option value="custom">{content?.presets?.custom}</option>
                    </select>
                </label>

                {activeGroup && (
                    <div>
                        <p className="text-sm font-medium text-zinc-800">{content?.presets?.statusLabel}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {activeGroup.presets.map((preset) => (
                                <button key={preset.key} type="button" onClick={() => applyPreset(preset)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${state.preset === preset.key ? 'border-orange-300 bg-orange-50 text-orange-800' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'}`}>
                                    {content?.presets?.[preset.key]}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <p className="text-sm font-medium text-zinc-800">{content?.fields?.currency}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {primaryCurrencies.map(({ code, symbol: currencySymbol }) => (
                            <button key={code} type="button" onClick={() => update('currency', code)} className={`rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${state.currency === code ? 'border-orange-300 bg-orange-50 text-orange-800' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400'}`}>
                                {currencySymbol} {code}
                            </button>
                        ))}
                        <select value={primaryCurrencies.some(({ code }) => code === state.currency) ? '' : state.currency} onChange={(event) => event.target.value && update('currency', event.target.value)} aria-label={content?.fields?.otherCurrency} className="rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600">
                            <option value="">{content?.fields?.otherCurrency}</option>
                            {CURRENCIES.slice(6).map(({ code, symbol: currencySymbol }) => <option key={code} value={code}>{currencySymbol} {code}</option>)}
                        </select>
                    </div>
                </div>

                <FieldSet fields={BASIC_FIELDS} state={state} update={update} content={content} symbol={symbol} />

                <div>
                    <p className="text-sm font-medium text-zinc-800">{content?.fields?.paymentFee}</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                        {PAYMENT_PRESETS.map(({ label, value }) => (
                            <button key={label} type="button" onClick={() => update('feeRate', value)} className={`rounded-[10px] border px-2 py-2 text-xs font-semibold ${state.feeRate === value ? 'border-orange-300 bg-orange-50 text-orange-800' : 'border-zinc-200 text-zinc-700'}`}>{label}<span className="mt-0.5 block font-mono text-[10px]">{value}%</span></button>
                        ))}
                    </div>
                    <NumberField ariaLabel={content?.fields?.paymentFee} value={state.feeRate} onChange={(value) => update('feeRate', value)} max="100" step="0.1" />
                </div>

                <details className="group border-t border-zinc-200 pt-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-900 marker:hidden">{content?.advanced?.toggle}<span className="text-orange-600 transition-transform group-open:rotate-45">+</span></summary>
                    <div className="mt-5 space-y-5"><FieldSet fields={ADVANCED_FIELDS} state={state} update={update} content={content} symbol={symbol} /></div>
                </details>

                <details className="group border-t border-zinc-200 pt-5" open={state.country === 'custom' ? true : undefined}>
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-zinc-900 marker:hidden">{content?.taxSection?.toggle}<span className="text-orange-600 transition-transform group-open:rotate-45">+</span></summary>
                    <div className="mt-5 space-y-5">
                        <FieldSet fields={TAX_FIELDS} state={state} update={update} content={content} symbol={symbol} />
                        <label className="flex items-center justify-between gap-4 text-sm font-medium text-zinc-800">
                            {content?.fields?.vatIncluded}
                            <input type="checkbox" checked={state.vatIncluded} onChange={(event) => update('vatIncluded', event.target.checked)} className="h-5 w-5 accent-orange-500" />
                        </label>
                        <label className="block text-sm font-medium text-zinc-800">
                            {content?.fields?.socialBase}
                            <select value={state.socialBase} onChange={(event) => update('socialBase', event.target.value)} className="mt-2 min-h-12 w-full rounded-[10px] border border-zinc-200 bg-white px-4 text-sm">
                                <option value="revenue">{content?.fields?.socialBaseRevenue}</option>
                                <option value="profit">{content?.fields?.socialBaseProfit}</option>
                            </select>
                        </label>
                    </div>
                </details>
            </div>
        </div>
    );
}
