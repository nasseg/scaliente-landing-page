export default function AffiliateEarnings({ content }) {
    return (
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600">02 / Tiers</p>
                    <h2 className="mt-6 text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content?.earnings?.title}</h2>
                </div>
                <p className="self-end text-lg leading-8 text-zinc-600">{content?.earnings?.subtitle}</p>
            </div>
            <div className="mt-16 overflow-x-auto border-y border-zinc-200">
                <table className="w-full min-w-[680px] text-left">
                    <thead className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                        <tr><th className="py-5 font-semibold">{content?.earnings?.colReferrals}</th><th className="py-5 font-semibold">{content?.earnings?.colPlan}</th><th className="py-5 font-semibold">{content?.earnings?.colMonthly}</th><th className="py-5 text-right font-semibold">{content?.earnings?.colYearly}</th></tr>
                    </thead>
                    <tbody>
                        {(content?.earnings?.rows || []).map((row) => (
                            <tr key={row.referrals} className="border-t border-zinc-200">
                                <td className="py-6 font-brand text-2xl font-semibold tracking-[-0.035em]">{row.referrals}</td>
                                <td className="py-6 text-sm text-zinc-600">{row.plan}</td>
                                <td className="py-6 font-mono text-sm text-orange-600">{row.monthly}</td>
                                <td className="py-6 text-right text-sm text-zinc-600">{row.yearly}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-5 text-zinc-500">{content?.earnings?.disclaimer}</p>
        </div>
    );
}
