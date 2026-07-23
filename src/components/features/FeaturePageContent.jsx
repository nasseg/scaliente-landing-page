import {
    Activity, AlertTriangle, ArrowDownRight, ArrowRight, BarChart3,
    CalendarRange, CircleDollarSign, Clock, Coins, Crosshair, DollarSign,
    Download, FileText, Globe, LayoutGrid, Layers, MessageSquareText,
    Package, Percent, PieChart, RefreshCw, Shield, Sparkles, Target,
    TrendingUp, Users, Zap,
} from 'lucide-react';
import CTAButton from '@/components/ui/CTAButton';

const ICON_MAP = {
    Activity, AlertTriangle, BarChart3, CalendarRange, CircleDollarSign, Clock,
    Coins, Crosshair, DollarSign, Download, FileText, Globe, LayoutGrid, Layers,
    MessageSquareText, Package, Percent, PieChart, RefreshCw, Shield, Sparkles,
    Target, TrendingUp, Users, Zap,
};

function SectionHeading({ eyebrow, title, description, dark = false }) {
    return (
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-orange-400' : 'text-orange-600'}`}>{eyebrow}</p>
            <div>
                <h2 className="max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{title}</h2>
                {description && <p className={`mt-7 max-w-2xl text-pretty text-lg leading-8 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>{description}</p>}
            </div>
        </div>
    );
}

function ProblemSection({ problem }) {
    if (!problem) return null;
    return (
        <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[36px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionHeading eyebrow={problem.badge} title={problem.title} description={problem.subtitle} />
                <div className="mt-16 border-y border-zinc-200">
                    {problem.points?.map((point, index) => (
                        <article key={point.title} className="grid gap-4 border-b border-zinc-200 py-7 last:border-b-0 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-baseline md:gap-8">
                            <span className="font-mono text-xs text-orange-600">0{index + 1}</span>
                            <h3 className="text-xl font-semibold tracking-[-0.025em]">{point.title}</h3>
                            <p className="max-w-xl text-sm leading-6 text-zinc-600">{point.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SolutionSection({ solution }) {
    if (!solution) return null;
    return (
        <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionHeading
                    eyebrow={solution.badge}
                    title={<>{solution.title} <span className="text-orange-500">{solution.titleHighlight}</span></>}
                    description={solution.description}
                    dark
                />
                <ArrowDownRight className="ml-auto mt-14 h-10 w-10 text-zinc-700" strokeWidth={1.2} aria-hidden="true" />
            </div>
        </section>
    );
}

function FeatureLedger({ features }) {
    if (!features.length) return null;
    return (
        <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[36px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <div className="grid border-t border-zinc-200 lg:grid-cols-2">
                    {features.map((feature, index) => {
                        const Icon = ICON_MAP[feature.icon] || Zap;
                        return (
                            <article key={feature.title} className={`group min-h-72 border-b border-zinc-200 py-8 lg:px-10 ${index % 2 === 0 ? 'lg:border-r lg:pl-0' : 'lg:pr-0'}`}>
                                <div className="flex items-center justify-between">
                                    <Icon className="h-6 w-6 text-orange-600" strokeWidth={1.5} aria-hidden="true" />
                                    <span className="font-mono text-xs text-zinc-400">0{index + 1}</span>
                                </div>
                                <div className="mt-20 max-w-xl">
                                    <h3 className="font-brand text-3xl font-semibold tracking-[-0.04em]">{feature.title}</h3>
                                    <p className="mt-4 text-sm leading-6 text-zinc-600">{feature.description}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function StepsSection({ content }) {
    const steps = Array.isArray(content?.steps) ? content.steps : [];
    if (!steps.length) return null;
    return (
        <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <div className="flex items-end justify-between gap-8">
                    <h2 className="max-w-3xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                        {content.title} <span className="text-orange-500">{content.titleHighlight}</span>
                    </h2>
                    <ArrowRight className="hidden h-10 w-10 text-zinc-700 lg:block" strokeWidth={1.2} aria-hidden="true" />
                </div>
                <ol className="mt-16 border-t border-white/[0.12]">
                    {steps.map((step, index) => (
                        <li key={step.title} className="grid gap-5 border-b border-white/[0.1] py-8 md:grid-cols-[5rem_0.8fr_1.2fr] md:items-baseline md:gap-8">
                            <span className="font-mono text-xs text-orange-400">0{index + 1}</span>
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <p className="max-w-xl text-sm leading-6 text-zinc-400">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default function FeaturePageContent({ page, common }) {
    const features = Array.isArray(page.features) ? page.features : [];
    return (
        <div className="space-y-3 bg-[#09090b] pb-3">
            {page.availability && (
                <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-7 text-zinc-950 sm:rounded-[36px] sm:px-8 lg:px-12">
                    <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-[auto_0.8fr_1.2fr] md:items-center md:gap-8">
                        <span className="w-fit rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">{page.availability.label}</span>
                        <h2 className="font-brand text-xl font-semibold tracking-[-0.025em]">{page.availability.title}</h2>
                        <p className="text-sm leading-6 text-zinc-600">{page.availability.description}</p>
                    </div>
                </section>
            )}
            <ProblemSection problem={page.problem} />
            <SolutionSection solution={page.solution} />
            <FeatureLedger features={features} />
            <StepsSection content={page.howItWorks} />
            {page.finalCta && (
                <section data-header-theme="light" className="rounded-[24px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[36px] sm:px-8 sm:py-28">
                    <div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                        <div>
                            <p className="max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">{page.finalCta.title}</p>
                            {page.finalCta.subtitle && <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{page.finalCta.subtitle}</p>}
                        </div>
                        <div className="lg:justify-self-end">
                            <CTAButton href={page.finalCta.href} size="lg">{page.finalCta.button || common?.getStarted || 'Start'}</CTAButton>
                            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">{page.finalCta.note || common?.noCard}</p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
