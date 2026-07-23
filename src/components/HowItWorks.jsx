import { Megaphone, Receipt, Settings2, ShoppingBag } from 'lucide-react';
import CTAButton from './ui/CTAButton';

const HowItWorks = ({ content }) => {
    const steps = [
        [ShoppingBag, content?.steps?.shopify],
        [Megaphone, content?.steps?.ads],
        [Settings2, content?.steps?.mode],
        [Receipt, content?.steps?.expenses],
    ];

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <h2 className="max-w-[11ch] text-balance font-brand text-[clamp(2.7rem,5vw,4.9rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                            {content?.title?.part1} <span className="text-orange-500">{content?.title?.part2}</span>
                        </h2>
                        <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.description}</p>
                        <div className="mt-8">
                            <CTAButton analyticsLocation="setup">{content?.cta}</CTAButton>
                        </div>
                    </div>

                    <ol className="list-none border-b border-[var(--divider)] p-0">
                        {steps.map(([Icon, step]) => (
                            <li key={step?.title} className="grid gap-4 border-t border-[var(--divider)] py-8 sm:grid-cols-[48px_1fr_auto] sm:items-start sm:gap-6 sm:py-10">
                                <span className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-[var(--card-border)] bg-[var(--card-bg)] text-orange-500">
                                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                                </span>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-brand text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{step?.title}</h3>
                                    </div>
                                    <p className="mt-3 max-w-xl text-pretty leading-7 text-[var(--text-secondary)]">{step?.desc}</p>
                                </div>
                                <p className="font-mono text-xs tracking-[0.14em] text-orange-500 sm:pt-1">{step?.time}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
