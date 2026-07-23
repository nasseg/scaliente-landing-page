import { ArrowUpRight, Check } from 'lucide-react';

const CTA = ({ content }) => (
    <section className="py-24 text-[var(--text-primary)] sm:py-32 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
                <div>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-orange-600"><Check className="h-4 w-4" />{content?.badge}</p>
                    <h2 className="mt-7 max-w-[16ch] text-balance font-brand text-[clamp(3rem,6vw,6rem)] font-semibold leading-[0.93] tracking-[-0.06em]">{content?.title}</h2>
                    <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.subtitle}</p>
                </div>
                <div className="border-t border-[var(--divider)] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <p className="mb-6 text-sm text-[var(--text-secondary)]">{content?.socialProof}</p>
                    <a href="https://apps.shopify.com/scaliente" data-analytics="primary_cta_click" data-analytics-location="final_cta" className="group inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[10px] bg-zinc-950 px-7 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-500 sm:w-auto">
                        {content?.button}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                    <p className="mt-3 text-xs text-[var(--text-muted)]">{content?.noCard}</p>
                </div>
            </div>
        </div>
    </section>
);

export default CTA;
