'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Lock, ShoppingBag } from 'lucide-react';

const PLAN_DEFINITIONS = [
    { key: 'discovery', monthly: 0, annual: 0, included: ['orders', 'shop', 'history', 'adPlatform', 'collaborators'] },
    { key: 'lite', monthly: 39, annual: 374, included: ['orders', 'shop', 'history', 'adPlatforms', 'export', 'collaborators'] },
    { key: 'starter', monthly: 89, annual: 854, included: ['orders', 'shop', 'history', 'adPlatforms', 'comparison', 'export', 'collaborators'] },
    { key: 'growth', monthly: 149, annual: 1430, included: ['orders', 'shops', 'history', 'adPlatforms', 'multiShop', 'comparison', 'collaborators'] },
    { key: 'scale', monthly: 249, annual: 2390, included: ['orders', 'shops', 'history', 'adPlatforms', 'priority', 'collaborators'] },
];

export default function Pricing({ content, common }) {
    const [isAnnual, setIsAnnual] = useState(true);
    const [selectedKey, setSelectedKey] = useState('starter');
    const selectedDefinition = PLAN_DEFINITIONS.find((plan) => plan.key === selectedKey) || PLAN_DEFINITIONS[2];
    const selectedCopy = content?.plans?.[selectedDefinition.key] || {};
    const displayPrice = isAnnual && selectedDefinition.annual
        ? Math.round(selectedDefinition.annual / 12)
        : selectedDefinition.monthly;

    return (
        <section className="py-20 text-[var(--text-primary)] sm:py-24 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="max-w-4xl">
                        <h2 className="text-balance font-brand text-[clamp(2.7rem,5.4vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                            {content?.header?.title?.main} <span className="text-orange-500">{content?.header?.title?.highlight}</span>
                        </h2>
                        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.header?.quote}</p>
                    </div>

                    <div className="inline-flex w-fit rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] p-1" aria-label={content?.billingLabel || 'Billing'}>
                        <button type="button" onClick={() => setIsAnnual(false)} className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${!isAnnual ? 'bg-zinc-950 text-white' : 'text-[var(--text-secondary)]'}`}>
                            {content?.toggle?.monthly}
                        </button>
                        <button type="button" onClick={() => setIsAnnual(true)} className={`min-h-11 rounded-full px-5 text-sm font-medium transition-colors ${isAnnual ? 'bg-zinc-950 text-white' : 'text-[var(--text-secondary)]'}`}>
                            {content?.toggle?.annual} <span className="ml-1 text-orange-500">{content?.toggle?.discount}</span>
                        </button>
                    </div>
                </div>

                <div className="mt-14">
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                        <ShoppingBag className="h-4 w-4 text-orange-500" aria-hidden="true" />
                        {content?.volume?.label}
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5" role="group" aria-label={content?.volume?.label}>
                        {PLAN_DEFINITIONS.map((plan) => {
                            const copy = content?.plans?.[plan.key] || {};
                            const selected = selectedKey === plan.key;
                            return (
                                <button
                                    key={plan.key}
                                    type="button"
                                    onClick={() => setSelectedKey(plan.key)}
                                    aria-pressed={selected}
                                    className={`min-h-24 rounded-[13px] border p-4 text-left transition-[background-color,border-color,color,transform] sm:min-h-28 ${selected ? 'border-orange-500 bg-orange-500 text-white sm:-translate-y-1' : 'border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--card-border-hover)]'}`}
                                >
                                    <span className={`block text-xs ${selected ? 'text-orange-100' : 'text-[var(--text-muted)]'}`}>{copy.name}</span>
                                    <span className="mt-4 block font-mono text-xl font-semibold">{content?.volume?.options?.[plan.key]}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-[18px] border border-[var(--card-border)] bg-[var(--card-bg)]">
                    <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                        <div className="flex flex-col justify-between border-b border-[var(--divider)] p-6 sm:p-9 lg:border-b-0 lg:border-r lg:p-11">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-orange-500">{content?.volume?.recommendation}</p>
                                <h3 data-recommended="true" className="mt-5 font-brand text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{selectedCopy.name}</h3>
                                <p className="mt-4 max-w-sm leading-7 text-[var(--text-secondary)]">{selectedCopy.desc}</p>
                            </div>

                            <div className="mt-10">
                                <div className="flex items-end gap-2">
                                    <span className="font-mono text-5xl font-semibold tracking-[-0.055em]">{displayPrice === 0 ? common?.free : `${displayPrice}€`}</span>
                                    {displayPrice > 0 && <span className="pb-1.5 text-sm text-[var(--text-secondary)]">/{common?.month}</span>}
                                </div>
                                <p className="mt-3 min-h-5 text-xs text-[var(--text-muted)]">
                                    {isAnnual && selectedDefinition.annual > 0
                                        ? `${common?.billed} ${selectedDefinition.annual}€/${common?.year}`
                                        : selectedDefinition.monthly === 0 ? common?.noCard : ' '}
                                </p>
                                <a
                                    href="https://apps.shopify.com/scaliente"
                                    data-analytics="pricing_cta_click"
                                    data-analytics-location="pricing"
                                    data-analytics-plan={selectedDefinition.key}
                                    data-analytics-billing={isAnnual ? 'annual' : 'monthly'}
                                    className="group mt-7 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[10px] bg-zinc-950 px-6 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-500 sm:w-auto"
                                >
                                    {selectedCopy.cta}
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                                </a>
                                {selectedDefinition.monthly > 0 && <p className="mt-3 text-xs text-[var(--text-muted)]">{content?.trial}</p>}
                            </div>
                        </div>

                        <div className="p-6 sm:p-9 lg:p-11">
                            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--text-muted)]">{content?.includedLabel || content?.volume?.selected}</p>
                            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                                {selectedDefinition.included.map((featureKey) => {
                                    const feature = selectedCopy.features?.[featureKey];
                                    if (!feature) return null;
                                    return (
                                        <li key={featureKey} className="flex items-start gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"><Check className="h-3 w-3" strokeWidth={2.5} /></span>
                                            {feature}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="mt-10 flex items-start gap-4 border-t border-[var(--divider)] pt-7">
                                <Lock className="mt-1 h-5 w-5 shrink-0 text-orange-500" aria-hidden="true" />
                                <div>
                                    <p className="font-brand text-lg font-semibold">{content?.antiObjection?.title}</p>
                                    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-secondary)]">{content?.antiObjection?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
