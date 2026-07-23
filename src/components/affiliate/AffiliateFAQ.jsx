export default function AffiliateFAQ({ content }) {
    return (
        <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <h2 className="text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">{content?.faq?.title}</h2>
            <div className="border-t border-white/[0.12]">
                {(content?.faq?.items || []).map((item) => (
                    <details key={item.q} className="group border-b border-white/[0.1]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-semibold text-white marker:hidden">
                            {item.q}<span className="text-orange-400 transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="max-w-2xl pb-6 text-sm leading-7 text-zinc-400">{item.a}</p>
                    </details>
                ))}
            </div>
        </div>
    );
}
