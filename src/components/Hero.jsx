import Link from 'next/link';
import CTAButton from './ui/CTAButton';
import HeroAmbient from './HeroAmbient';
import HeroProductCarousel from './HeroProductCarousel';
import LogoMarquee from './LogoMarquee';

const Hero = ({ content, common, integrations, lang }) => {
    const dashboard = content?.dashboard || {};
    const imageAlt = `${dashboard.overview || 'Dashboard'} - Scaliente`;
    const screenAlts = {
        overview: imageAlt,
        profit: dashboard.profit,
        report: dashboard.report,
        inbox: dashboard.inbox,
    };
    const descriptionSegments = content?.descriptionSegments;

    return (
        <section className="relative isolate min-h-[100dvh] overflow-hidden border-b border-white/[0.08] pb-10 pt-24 text-white sm:pt-24 lg:flex lg:items-center lg:py-24">
            <HeroAmbient />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />
            <div className="mx-auto w-full max-w-[1740px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.6fr)] lg:items-center lg:gap-8 xl:gap-12">
                    <div className="hero-copy relative z-10 min-w-0 max-w-[1120px]">
                        <p className="inline-flex text-xs font-semibold uppercase tracking-[0.11em] text-orange-300">
                            <span className="lg:hidden">{integrations?.title}</span>
                            <span className="hidden lg:inline">{content?.pill}</span>
                        </p>

                        <h1 className="mt-5 text-balance font-brand text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] sm:mt-7">
                            <span className="block">{content?.title}</span>
                            <span className="mt-2 block text-[0.82em] text-orange-500">{content?.subtitle}</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-zinc-300 sm:mt-8 sm:text-lg sm:leading-8">
                            {descriptionSegments ? (
                                <>
                                    {descriptionSegments.before}
                                    <Link
                                        href={`/${lang}/features/ai-customer-service`}
                                        className="font-medium text-zinc-100 underline decoration-orange-500/70 decoration-2 underline-offset-4 transition-colors hover:text-orange-300"
                                    >
                                        {descriptionSegments.link}
                                    </Link>
                                    {descriptionSegments.after}
                                </>
                            ) : content?.description}
                        </p>

                        <div className="mt-6 flex max-w-2xl flex-col gap-3 sm:mt-8 sm:flex-row">
                            <CTAButton size="lg" analyticsLocation="hero">{content?.ctaStart || common?.getStarted}</CTAButton>
                            <CTAButton href="https://app.scaliente.com" variant="secondary" size="lg" analytics="login_click" analyticsLocation="hero">
                                {content?.ctaLogin}
                            </CTAButton>
                        </div>
                    </div>

                    <HeroProductCarousel imageAlt={imageAlt} screenAlts={screenAlts} />
                </div>
            </div>

            <div className="relative z-20 mt-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
                <LogoMarquee content={integrations} embedded />
            </div>
        </section>
    );
};

export default Hero;
