import ProductFrame from '@/components/ui/ProductFrame';

function VisualStack({ visual, title }) {
    if (!visual?.images?.length) return null;

    const [lead, ...supporting] = visual.images;
    return (
        <div className="relative mx-auto w-full max-w-[620px] lg:mx-0">
            <div className="pointer-events-none absolute inset-[-15%] bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_62%)] blur-3xl" aria-hidden="true" />
            <ProductFrame image={lead} alt={`${title} | Scaliente`} priority className="relative z-20" />
            {supporting.slice(0, 2).map((image, index) => (
                <ProductFrame
                    key={image.src}
                    image={image}
                    alt={`${title} | Scaliente`}
                    className={`absolute hidden w-[52%] lg:block ${index === 0 ? '-bottom-10 -left-10 z-30 rotate-[-2deg]' : '-right-8 -top-10 z-10 rotate-[2deg]'}`}
                    sizes="28vw"
                />
            ))}
        </div>
    );
}

export default function PageHero({ title, subtitle, description, eyebrow, visual }) {
    const hasVisual = Boolean(visual?.images?.length);

    return (
        <section data-header-theme="dark" className="relative overflow-hidden bg-[#09090b] text-white">
            <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" aria-hidden="true" />
            <div className={`relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 ${hasVisual ? 'min-h-[clamp(560px,72svh,700px)] lg:grid-cols-[0.95fr_1.05fr] lg:gap-10' : 'min-h-[clamp(440px,58svh,560px)] lg:grid-cols-[1.3fr_0.7fr] lg:gap-14'}`}>
                <div className="relative z-30 max-w-[900px]">
                    {eyebrow && <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-400">{eyebrow}</p>}
                    <h1 className="text-balance font-brand text-[clamp(2.7rem,5.1vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-white">
                        {title}
                    </h1>
                    {hasVisual && subtitle && <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg">{subtitle}</p>}
                    {hasVisual && description && <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">{description}</p>}
                </div>
                {hasVisual ? (
                    <VisualStack visual={visual} title={title} />
                ) : (
                        <div className="border-t border-white/[0.12] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                            {subtitle && <p className="max-w-xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg">{subtitle}</p>}
                            {description && <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">{description}</p>}
                        </div>
                )}
            </div>
        </section>
    );
}
