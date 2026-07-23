import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    BadgeCheck,
    BrainCircuit,
    Check,
    ChevronRight,
    CircleAlert,
    Clock3,
    FileCheck2,
    History,
    Inbox,
    Languages,
    MailCheck,
    MessageSquareText,
    PackageCheck,
    Route,
    ShieldCheck,
    Tags,
    UserCheck,
    Users,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ICONS = {
    BrainCircuit,
    CircleAlert,
    Clock3,
    FileCheck2,
    History,
    Inbox,
    Languages,
    MailCheck,
    MessageSquareText,
    PackageCheck,
    Route,
    ShieldCheck,
    Tags,
    UserCheck,
    Users,
};

function Kicker({ children, dark = false }) {
    return (
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-orange-400' : 'text-orange-700'}`}>
            {children}
        </p>
    );
}

function SectionIntro({ eyebrow, title, description, dark = false, compact = false }) {
    return (
        <div className={`grid gap-7 lg:grid-cols-[0.72fr_1.28fr] ${compact ? 'lg:gap-12' : 'lg:gap-20'}`}>
            {eyebrow ? <Kicker dark={dark}>{eyebrow}</Kicker> : <span aria-hidden="true" />}
            <div>
                <h2 className={`max-w-4xl text-balance font-brand font-semibold leading-[1.01] tracking-[-0.048em] ${compact ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-6xl'}`}>
                    {title}
                </h2>
                {description && (
                    <p className={`mt-6 max-w-3xl text-pretty text-base leading-7 sm:text-lg sm:leading-8 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

function ProductScreenshot({ src, alt, label, priority = false, dark = false }) {
    return (
        <figure className="relative">
            <div className={`overflow-hidden rounded-[18px] border p-1.5 shadow-[0_28px_90px_rgba(0,0,0,.22)] ${dark ? 'border-white/[0.12] bg-white/[0.045]' : 'border-zinc-200 bg-white'}`}>
                <div className={`flex h-9 items-center justify-between border-b px-3 text-[0.62rem] font-medium uppercase tracking-[0.14em] ${dark ? 'border-white/[0.08] text-zinc-500' : 'border-zinc-200 text-zinc-500'}`}>
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        Scaliente Inbox
                    </span>
                    <span>{label}</span>
                </div>
                <Image
                    src={src}
                    alt={alt}
                    width={1512}
                    height={828}
                    priority={priority}
                    sizes="(min-width: 1024px) 58vw, 94vw"
                    className="h-auto w-full rounded-[12px] bg-white object-cover"
                />
            </div>
        </figure>
    );
}

function Hero({ content }) {
    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] text-white">
            <div
                className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_74%_42%,rgba(249,115,22,.16),transparent_33%),linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:auto,72px_72px,72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]"
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute right-[18%] top-[30%] h-72 w-72 rounded-full bg-orange-600/[0.08] blur-[100px]" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:min-h-[760px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:pt-28">
                <div className="relative z-10 max-w-[720px]">
                    <Kicker dark>{content.eyebrow}</Kicker>
                    <h1 className="mt-6 text-balance font-brand text-[clamp(3rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                        {content.title}
                    </h1>
                    <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-300 sm:text-xl">
                        {content.subtitle}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href={content.primaryHref}
                            data-analytics="beta_access_click"
                            data-analytics-location="inbox_ai_hero"
                            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[12px] bg-orange-500 px-6 font-semibold text-white shadow-[0_16px_44px_rgba(249,115,22,.22)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400"
                        >
                            {content.primaryCta}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <Link
                            href="#workflow"
                            className="inline-flex min-h-13 items-center justify-center rounded-[12px] border border-white/[0.15] px-6 font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
                        >
                            {content.secondaryCta}
                        </Link>
                    </div>
                </div>

                <ProductScreenshot
                    src="/inbox-ai-demo-anonymized.png"
                    alt={content.visualAlt}
                    label={content.visualLabel}
                    priority
                    dark
                />
            </div>

            <div className="relative border-t border-white/[0.09]">
                <div className="mx-auto grid max-w-[1400px] divide-y divide-white/[0.09] px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-8 lg:grid-cols-4">
                    {content.proof.map((item) => (
                        <div key={item.label} className="py-5 sm:px-6 first:pl-0 last:pr-0">
                            <p className="font-brand text-xl font-semibold tracking-[-0.025em] text-white">{item.value}</p>
                            <p className="mt-1 text-xs leading-5 text-zinc-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProblemSection({ content }) {
    return (
        <section data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-y border-zinc-200 lg:grid-cols-3">
                    {content.items.map((item, index) => {
                        const Icon = ICONS[item.icon] || CircleAlert;
                        return (
                            <article key={item.title} className="border-b border-zinc-200 py-8 last:border-b-0 lg:min-h-72 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                                <div className="flex items-center justify-between">
                                    <Icon className="h-5 w-5 text-orange-600" strokeWidth={1.6} aria-hidden="true" />
                                    <span className="font-mono text-xs text-zinc-400">0{index + 1}</span>
                                </div>
                                <h3 className="mt-16 max-w-xs font-brand text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                                <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function WorkflowSection({ content }) {
    return (
        <section id="workflow" data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro dark eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-t border-white/[0.12] lg:grid-cols-4">
                    {content.steps.map((step, index) => {
                        const Icon = ICONS[step.icon] || MessageSquareText;
                        return (
                            <article key={step.title} className="relative border-b border-white/[0.1] py-8 lg:min-h-72 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                                <div className="flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/[0.1] bg-white/[0.04] text-orange-400">
                                        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                                    </span>
                                    <span className="font-mono text-xs text-zinc-600">0{index + 1}</span>
                                </div>
                                <h3 className="mt-14 font-brand text-2xl font-semibold tracking-[-0.035em]">{step.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
                                {index < content.steps.length - 1 && (
                                    <ChevronRight className="absolute -right-3.5 top-12 z-10 hidden h-7 w-7 rounded-full border border-white/[0.12] bg-[#09090b] p-1.5 text-orange-400 lg:block" aria-hidden="true" />
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function ContextSection({ content }) {
    return (
        <section data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28">
                        <Kicker>{content.eyebrow}</Kicker>
                        <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.048em] sm:text-5xl">
                            {content.title}
                        </h2>
                        <p className="mt-6 text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">{content.description}</p>
                    </div>
                    <div className="border-t border-zinc-200">
                        {content.items.map((item, index) => {
                            const Icon = ICONS[item.icon] || PackageCheck;
                            return (
                                <article key={item.title} className="grid grid-cols-[3rem_1fr] gap-5 border-b border-zinc-200 py-7 sm:grid-cols-[3rem_1fr_auto] sm:items-start">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-zinc-950 text-orange-400">
                                        <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                                    </span>
                                    <div>
                                        <h3 className="font-brand text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                                        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">{item.description}</p>
                                    </div>
                                    <span className="hidden font-mono text-xs text-zinc-400 sm:block">{String(index + 1).padStart(2, '0')}</span>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ControlSection({ content }) {
    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="pointer-events-none absolute left-[8%] top-[25%] h-80 w-80 rounded-full bg-orange-600/[0.07] blur-[105px]" aria-hidden="true" />
            <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
                <ProductScreenshot src="/inbox-ai-risk-review-anonymized.png" alt={content.visualAlt} label={content.visualLabel} dark />
                <div>
                    <Kicker dark>{content.eyebrow}</Kicker>
                    <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.048em] sm:text-5xl">
                        {content.title}
                    </h2>
                    <p className="mt-6 text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">{content.description}</p>
                    <ul className="mt-9 border-t border-white/[0.12]">
                        {content.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 border-b border-white/[0.1] py-4 text-sm leading-6 text-zinc-300">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function TeamSection({ content }) {
    return (
        <section data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-y border-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((item, index) => {
                        const Icon = ICONS[item.icon] || Users;
                        return (
                            <article key={item.title} className={`min-h-56 border-b border-zinc-200 py-7 md:px-8 ${index % 2 === 0 ? 'md:border-r md:pl-0' : ''} ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 === 2 ? 'lg:border-r-0 lg:pr-0' : 'lg:border-r'}`}>
                                <div className="flex items-center justify-between">
                                    <Icon className="h-5 w-5 text-orange-600" strokeWidth={1.6} aria-hidden="true" />
                                    <span className="font-mono text-xs text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="mt-12 font-brand text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function LearningSection({ content }) {
    return (
        <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro dark eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-y border-white/[0.12] lg:grid-cols-2">
                    <div className="py-8 lg:border-r lg:border-white/[0.12] lg:pr-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">{content.inputLabel}</p>
                        <ul className="mt-7 space-y-4">
                            {content.inputs.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <Check className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="py-8 lg:pl-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">{content.outputLabel}</p>
                        <ul className="mt-7 space-y-4">
                            {content.outputs.map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm text-zinc-100">
                                    <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p className="mt-8 flex max-w-4xl items-start gap-3 border-l-2 border-orange-500 pl-5 text-sm leading-6 text-zinc-400">
                    <BrainCircuit className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                    {content.note}
                </p>
            </div>
        </section>
    );
}

function AvailabilityAndFaq({ availability, faq }) {
    return (
        <section id="pricing" data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <div className="grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
                    <div>
                        <Kicker>{availability.eyebrow}</Kicker>
                        <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.048em] sm:text-5xl">{availability.title}</h2>
                        <p className="mt-6 text-base leading-7 text-zinc-600">{availability.description}</p>
                        <div className="mt-9 border-y border-zinc-200">
                            {availability.items.map((item) => (
                                <div key={item.label} className="grid grid-cols-[1fr_auto] gap-5 border-b border-zinc-200 py-5 last:border-b-0">
                                    <span className="text-sm text-zinc-600">{item.label}</span>
                                    <span className="text-right text-sm font-semibold text-zinc-950">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href={availability.href}
                            data-analytics="beta_access_click"
                            data-analytics-location="inbox_ai_pricing"
                            className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-[12px] bg-zinc-950 px-6 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-zinc-800"
                        >
                            {availability.button}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <p className="mt-4 max-w-md text-xs leading-5 text-zinc-500">{availability.note}</p>
                    </div>
                    <div>
                        <Kicker>{faq.eyebrow}</Kicker>
                        <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.048em] sm:text-5xl">{faq.title}</h2>
                        <div className="mt-10 border-t border-zinc-200">
                            {faq.items.map((item, index) => (
                                <details key={`${item.question || 'faq'}-${index}`} className="group border-b border-zinc-200 py-1">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                                        {item.question}
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-transform group-open:rotate-90">
                                            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                                        </span>
                                    </summary>
                                    <p className="max-w-2xl pb-6 pr-10 text-sm leading-6 text-zinc-600">{item.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FinalCta({ content }) {
    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] px-5 py-24 text-white sm:px-8 sm:py-32">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/[0.08] blur-[100px]" aria-hidden="true" />
            <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <div>
                    <Kicker dark>{content.eyebrow}</Kicker>
                    <h2 className="mt-6 max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.05em] sm:text-6xl">{content.title}</h2>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{content.subtitle}</p>
                </div>
                <div className="lg:justify-self-end">
                    <a
                        href={content.href}
                        data-analytics="beta_access_click"
                        data-analytics-location="inbox_ai_final"
                        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[12px] bg-orange-500 px-7 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400"
                    >
                        {content.button}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">{content.note}</p>
                </div>
            </div>
        </section>
    );
}

export default function CustomerServiceAIPage({ page, navbar, footer, lang }) {
    return (
        <div className="min-h-screen bg-[#09090b] font-sans selection:bg-orange-500/30">
            <Navbar content={navbar} lang={lang} />
            <Hero content={page.hero} />
            <main className="space-y-3 bg-[#09090b] pb-3">
                <ProblemSection content={page.problem} />
                <WorkflowSection content={page.workflow} />
                <ContextSection content={page.context} />
                <ControlSection content={page.control} />
                <TeamSection content={page.team} />
                <LearningSection content={page.learning} />
                <AvailabilityAndFaq availability={page.availability} faq={page.faq} />
                <FinalCta content={page.finalCta} />
            </main>
            <Footer content={footer} lang={lang} />
        </div>
    );
}
