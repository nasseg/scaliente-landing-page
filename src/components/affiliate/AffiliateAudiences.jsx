import { Building2, Megaphone, PenTool, Store } from 'lucide-react';

const ICONS = [Megaphone, PenTool, Building2, Store];

export default function AffiliateAudiences({ content }) {
    const items = Object.values(content?.audiences?.items || {});
    return (
        <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">03 / Profils</p>
                <h2 className="max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">{content?.audiences?.title}</h2>
            </div>
            <div className="mt-16 grid border-t border-white/[0.12] lg:grid-cols-2">
                {items.map((item, index) => {
                    const Icon = ICONS[index] || Store;
                    return (
                        <article key={item.title} className={`min-h-64 border-b border-white/[0.1] py-8 lg:px-10 ${index % 2 === 0 ? 'lg:border-r lg:pl-0' : 'lg:pr-0'}`}>
                            <Icon className="h-5 w-5 text-orange-400" strokeWidth={1.5} aria-hidden="true" />
                            <div className="mt-16 max-w-xl">
                                <h3 className="font-brand text-2xl font-semibold tracking-[-0.035em] text-white">{item.title}</h3>
                                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.desc}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
