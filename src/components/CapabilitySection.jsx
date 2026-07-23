import { Download, FileText, Receipt, ShieldAlert, Store, UserCog } from 'lucide-react';

const ICONS = {
    disputes: ShieldAlert,
    expenses: Receipt,
    reports: FileText,
    roles: UserCog,
    multiShop: Store,
    export: Download,
};

const CapabilitySection = ({ content, cards = [] }) => {
    if (!content) return null;
    const teamwork = cards[0] === 'roles';
    const items = cards.map((key) => ({ key, card: content.cards?.[key], Icon: ICONS[key] })).filter(({ card }) => card);

    if (teamwork) {
        return (
            <section className="py-24 text-[var(--text-primary)] sm:py-32">
                <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
                    <div className="max-w-4xl">
                        <p className="text-sm font-semibold text-orange-500">{content.badge}</p>
                        <h2 className="mt-5 text-balance font-brand text-[clamp(2.8rem,5.6vw,5.2rem)] font-bold leading-[0.96] tracking-[-0.045em]">
                            {content.title?.main} <span className="text-orange-500">{content.title?.highlight}</span>
                        </h2>
                        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content.subtitle}</p>
                    </div>

                    <div className="mt-16 grid gap-4 lg:grid-cols-[1.35fr_0.825fr_0.825fr]">
                        {items.map(({ key, card, Icon }, index) => (
                            <article key={key} className={`group flex min-h-[330px] flex-col justify-between rounded-[16px] border border-[var(--card-border)] bg-[var(--card-bg)] p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-orange-500/40 sm:p-9 ${index === 0 ? 'lg:min-h-[420px]' : ''}`}>
                                <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-orange-500 text-white">
                                    {Icon && <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />}
                                </div>
                                <div className="mt-14">
                                    <h3 className={`font-brand font-semibold tracking-[-0.03em] ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{card.title}</h3>
                                    <p className="mt-4 max-w-xl text-pretty leading-7 text-[var(--text-secondary)]">{card.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 text-[var(--text-primary)] sm:py-32">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="text-sm font-semibold text-orange-600">{content.badge}</p>
                    <h2 className="mt-5 max-w-[11ch] text-balance font-brand text-[clamp(2.8rem,5vw,4.9rem)] font-bold leading-[0.98] tracking-[-0.045em]">
                        {content.title?.main} <span className="text-orange-600">{content.title?.highlight}</span>
                    </h2>
                    <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content.subtitle}</p>
                </div>

                <div className="space-y-4">
                    {items.map(({ key, card, Icon }) => (
                        <article key={key} className="group grid gap-7 rounded-[16px] border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-orange-500/35 sm:grid-cols-[52px_0.68fr_1fr] sm:p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-zinc-950 text-orange-500">
                                {Icon && <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />}
                            </div>
                            <h3 className="font-brand text-2xl font-semibold tracking-[-0.03em]">{card.title}</h3>
                            <p className="text-pretty leading-7 text-[var(--text-secondary)]">{card.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CapabilitySection;
