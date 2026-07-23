export default function AffiliateHowItWorks({ content }) {
    return (
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="max-w-3xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{content?.howItWorks?.title}</h2>
            <ol className="mt-16 border-t border-white/[0.12]">
                {(content?.howItWorks?.steps || []).map((step, index) => (
                    <li key={step.title} className="grid gap-5 border-b border-white/[0.1] py-8 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-baseline md:gap-8">
                        <span className="font-mono text-xs text-orange-400">0{index + 1}</span>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                        <p className="max-w-xl text-sm leading-6 text-zinc-400">{step.desc}</p>
                    </li>
                ))}
            </ol>
        </div>
    );
}
