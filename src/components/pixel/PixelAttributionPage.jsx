import Image from 'next/image';
import Link from 'next/link';
import {
    Activity,
    ArrowDownRight,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Check,
    ChevronRight,
    CircleDollarSign,
    Crosshair,
    DatabaseZap,
    Fingerprint,
    Gauge,
    MousePointerClick,
    PackageCheck,
    RadioTower,
    Route,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ICONS = {
    Activity,
    BarChart3,
    CircleDollarSign,
    Crosshair,
    DatabaseZap,
    Fingerprint,
    Gauge,
    MousePointerClick,
    PackageCheck,
    RadioTower,
    Route,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
};

const SHOPIFY_APP_URL = 'https://apps.shopify.com/scaliente';

function Kicker({ children, dark = false }) {
    return (
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-orange-400' : 'text-orange-700'}`}>
            {children}
        </p>
    );
}

function SectionIntro({ eyebrow, title, description, dark = false }) {
    return (
        <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Kicker dark={dark}>{eyebrow}</Kicker>
            <div>
                <h2 className="max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                    {title}
                </h2>
                {description && (
                    <p className={`mt-6 max-w-2xl text-pretty text-base leading-7 sm:text-lg sm:leading-8 ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

function HeroVisual({ title, label, statusLabel }) {
    return (
        <div className="relative mx-auto w-full max-w-[650px] lg:mx-0 lg:justify-self-end" aria-label={title}>
            <div className="pointer-events-none absolute inset-[-20%] rounded-full bg-orange-500/15 blur-[90px]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[22px] border border-white/[0.13] bg-white/[0.045] p-2 shadow-[0_36px_110px_rgba(0,0,0,.58)] backdrop-blur-xl">
                <div className="flex h-9 items-center justify-between border-b border-white/[0.09] px-3 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-zinc-500">
                    <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Scaliente</span>
                    <span>{label}</span>
                </div>
                <Image
                    src="/desktop_dashboard_ads_overview_anonymized.png"
                    alt={title}
                    width={2048}
                    height={1152}
                    priority
                    sizes="(min-width: 1024px) 48vw, 94vw"
                    className="h-auto w-full rounded-[14px] bg-white object-cover"
                />
            </div>
            <div className="absolute -bottom-7 -left-3 hidden w-[48%] overflow-hidden rounded-[16px] border border-white/[0.13] bg-[#111114] p-1.5 shadow-[0_24px_70px_rgba(0,0,0,.5)] sm:block lg:-left-10">
                <Image
                    src="/desktop_dashboard_overview_anonymized.png"
                    alt=""
                    width={2048}
                    height={1152}
                    sizes="24vw"
                    className="h-auto w-full rounded-[11px] bg-white object-cover"
                />
            </div>
            <div className="absolute -right-2 -top-6 hidden items-center gap-3 rounded-full border border-white/[0.13] bg-[#111114]/90 px-4 py-3 text-sm text-zinc-300 shadow-xl backdrop-blur-xl sm:flex">
                <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                {statusLabel}
            </div>
        </div>
    );
}

function PixelHero({ content }) {
    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] text-white">
            <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.032)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute right-[10%] top-[24%] h-[26rem] w-[26rem] rounded-full bg-orange-600/[0.08] blur-[110px]" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:min-h-[760px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pt-28">
                <div className="relative z-10 max-w-[760px]">
                    <Kicker dark>{content.eyebrow}</Kicker>
                    <h1 className="mt-6 text-balance font-brand text-[clamp(3rem,5.25vw,5.65rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
                        {content.title}
                    </h1>
                    <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-zinc-300 sm:text-xl">{content.subtitle}</p>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">{content.note}</p>
                    <p className="mt-5 inline-flex items-center gap-2 border-l-2 border-orange-500 pl-3 text-sm font-semibold text-orange-200">
                        <BadgeCheck className="h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                        {content.offer}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href={SHOPIFY_APP_URL} data-analytics="primary_cta_click" data-analytics-location="pixel_hero" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[12px] bg-orange-500 px-6 font-semibold text-white shadow-[0_16px_44px_rgba(249,115,22,.24)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400">
                            {content.primaryCta}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                        <Link href="#how-it-works" className="inline-flex min-h-13 items-center justify-center rounded-[12px] border border-white/[0.15] px-6 font-medium text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.05] hover:text-white">
                            {content.secondaryCta}
                        </Link>
                    </div>
                </div>

                <HeroVisual title={content.visualAlt} label={content.visualLabel} statusLabel={content.statusLabel} />
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

function Architecture({ content }) {
    return (
        <section id="how-it-works" data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid overflow-hidden border-y border-zinc-200 lg:grid-cols-4">
                    {content.steps.map((step, index) => {
                        const Icon = ICONS[step.icon] || Crosshair;
                        return (
                            <article key={step.title} className="relative border-b border-zinc-200 py-8 last:border-b-0 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                                <div className="flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-[11px] bg-zinc-950 text-orange-400"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                                    <span className="font-mono text-xs text-zinc-400">0{index + 1}</span>
                                </div>
                                <h3 className="mt-14 font-brand text-2xl font-semibold tracking-[-0.035em]">{step.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-zinc-600">{step.description}</p>
                                {index < content.steps.length - 1 && <ChevronRight className="absolute -right-3.5 top-12 z-10 hidden h-7 w-7 rounded-full border border-zinc-200 bg-[#fafafa] p-1.5 text-orange-600 lg:block" />}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function EventLedger({ content }) {
    return (
        <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro dark eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-t border-white/[0.12] sm:grid-cols-2 lg:grid-cols-5">
                    {content.items.map((item, index) => (
                        <div key={item} className={`flex min-h-24 items-center gap-3 border-b border-white/[0.1] py-5 sm:px-5 lg:border-r ${index % 5 === 0 ? 'lg:pl-0' : ''} ${index % 5 === 4 ? 'lg:border-r-0 lg:pr-0' : ''}`}>
                            <span className="font-mono text-[0.65rem] text-orange-400">{String(index + 1).padStart(2, '0')}</span>
                            <p className="text-sm font-medium text-zinc-200">{item}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex items-start gap-3 border-l-2 border-orange-500 pl-5 text-sm leading-6 text-zinc-400">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" aria-hidden="true" />
                    <p>{content.privacyNote}</p>
                </div>
            </div>
        </section>
    );
}

function ModelSection({ content }) {
    return (
        <section data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-t border-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {content.items.map((item, index) => (
                        <article key={item.title} className={`min-h-56 border-b border-zinc-200 py-7 md:px-8 ${index % 2 === 0 ? 'md:border-r md:pl-0' : ''} ${index % 3 === 0 ? 'lg:pl-0' : ''} ${index % 3 === 2 ? 'lg:border-r-0 lg:pr-0' : 'lg:border-r'}`}>
                            <div className="flex items-center justify-between">
                                <Route className="h-5 w-5 text-orange-600" strokeWidth={1.6} aria-hidden="true" />
                                <span className="font-mono text-xs text-zinc-400">0{index + 1}</span>
                            </div>
                            <h3 className="mt-12 font-brand text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-zinc-600">{item.description}</p>
                        </article>
                    ))}
                </div>
                <div className="mt-8 grid gap-5 border border-orange-200 bg-orange-50 p-6 sm:grid-cols-[auto_1fr] sm:items-start">
                    <Gauge className="h-6 w-6 text-orange-700" aria-hidden="true" />
                    <div>
                        <h3 className="font-semibold">{content.coverageTitle}</h3>
                        <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-700">{content.coverageDescription}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProfitDifference({ content }) {
    return (
        <section data-header-theme="dark" className="bg-[#09090b] px-5 py-20 text-white sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <SectionIntro dark eyebrow={content.eyebrow} title={content.title} description={content.description} />
                <div className="mt-16 grid border-y border-white/[0.12] lg:grid-cols-2">
                    <div className="py-8 lg:border-r lg:border-white/[0.12] lg:pr-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">{content.inputLabel}</p>
                        <ul className="mt-7 space-y-4">
                            {content.inputs.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-zinc-300"><Check className="h-4 w-4 text-orange-400" />{item}</li>)}
                        </ul>
                    </div>
                    <div className="py-8 lg:pl-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">{content.outputLabel}</p>
                        <ul className="mt-7 space-y-4">
                            {content.outputs.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-zinc-100"><BadgeCheck className="h-4 w-4 text-emerald-400" />{item}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400">
                    {content.platforms.map((platform) => <span key={platform} className="border-b border-white/[0.12] pb-1">{platform}</span>)}
                </div>
            </div>
        </section>
    );
}

function SetupAndFaq({ setup, faq }) {
    return (
        <section data-header-theme="light" className="rounded-[26px] bg-[#fafafa] px-5 py-20 text-zinc-950 sm:rounded-[38px] sm:px-8 sm:py-28">
            <div className="mx-auto max-w-[1240px]">
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                    <div>
                        <Kicker>{setup.eyebrow}</Kicker>
                        <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{setup.title}</h2>
                        <ol className="mt-10 border-t border-zinc-200">
                            {setup.steps.map((step, index) => (
                                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-zinc-200 py-6">
                                    <span className="font-mono text-xs text-orange-700">0{index + 1}</span>
                                    <div><h3 className="font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-600">{step.description}</p></div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div>
                        <Kicker>{faq.eyebrow}</Kicker>
                        <h2 className="mt-5 text-balance font-brand text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl">{faq.title}</h2>
                        <div className="mt-10 border-t border-zinc-200">
                            {faq.items.map((item) => (
                                <details key={item.question} className="group border-b border-zinc-200 py-1">
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold [&::-webkit-details-marker]:hidden">
                                        {item.question}<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-transform group-open:rotate-90"><ChevronRight className="h-3.5 w-3.5" /></span>
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
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/[0.08] blur-[100px]" />
            <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
                <div>
                    <Kicker dark>{content.eyebrow}</Kicker>
                    <h2 className="mt-6 max-w-4xl text-balance font-brand text-4xl font-semibold leading-[1.01] tracking-[-0.05em] sm:text-6xl">{content.title}</h2>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{content.subtitle}</p>
                </div>
                <div className="lg:justify-self-end">
                    <a href={SHOPIFY_APP_URL} data-analytics="primary_cta_click" data-analytics-location="pixel_final" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[12px] bg-orange-500 px-7 font-semibold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-orange-400">
                        {content.button}<ArrowRight className="h-4 w-4" />
                    </a>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">{content.note}</p>
                </div>
            </div>
        </section>
    );
}

export default function PixelAttributionPage({ page, navbar, footer, lang }) {
    return (
        <div className="min-h-screen bg-[#09090b] font-sans selection:bg-orange-500/30">
            <Navbar content={navbar} lang={lang} />
            <PixelHero content={page.hero} />
            <main className="space-y-3 bg-[#09090b] pb-3">
                <Architecture content={page.architecture} />
                <EventLedger content={page.events} />
                <ModelSection content={page.models} />
                <ProfitDifference content={page.difference} />
                <SetupAndFaq setup={page.setup} faq={page.faq} />
                <FinalCta content={page.finalCta} />
            </main>
            <Footer content={footer} lang={lang} />
        </div>
    );
}
