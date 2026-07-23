import { Check } from 'lucide-react';
import { AFFILIATE_TERMS } from '@/lib/affiliate-application';

export default function AffiliateTerms({ content }) {
    const terms = [
        `${AFFILIATE_TERMS.minimumCommissionPercent}-${AFFILIATE_TERMS.maximumCommissionPercent}%`,
        `${AFFILIATE_TERMS.commissionDurationMonths} ${content?.stats?.durationLabel}`,
        `${AFFILIATE_TERMS.cookieDays} ${content?.stats?.cookieLabel}`,
        `${AFFILIATE_TERMS.minimumPayoutEur} €`,
    ];

    return (
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
                <h2 className="text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content?.features?.title}</h2>
                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-zinc-200 bg-zinc-200">
                    {terms.map((term) => <div key={term} className="bg-white p-5 font-brand text-2xl font-semibold tracking-[-0.035em] text-zinc-950">{term}</div>)}
                </div>
            </div>
            <ul className="border-t border-zinc-200">
                {(content?.features?.items || []).map((item) => (
                    <li key={item} className="flex gap-4 border-b border-zinc-200 py-6 text-sm leading-6 text-zinc-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" strokeWidth={2} aria-hidden="true" />{item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
