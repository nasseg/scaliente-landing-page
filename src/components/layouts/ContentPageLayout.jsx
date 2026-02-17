import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';

const ContentPageLayout = ({
    lang,
    navContent,
    footerContent,
    common,
    heroTitle,
    heroSubtitle,
    heroDescription,
    ctaText,
    ctaHref = 'https://apps.shopify.com/scaliente',
    showCTA = true,
    children
}) => (
    <div className="min-h-screen selection:bg-orange-500/30 font-sans">
        <Navbar content={navContent} lang={lang} isHomePage={false} />

        {/* Hero Section */}
        <div className="relative z-10">
            <div className="absolute bottom-0 left-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
            <div className="absolute bottom-0 right-0 w-12 h-12 md:w-14 md:h-14 bg-[#fafafa]" />
            <div className="relative text-white bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-b-[2.5rem] md:rounded-b-[3rem]">
                <div className="absolute inset-0 grain pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-center relative z-10">
                    <h1 className="font-brand text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-[-0.025em]">
                        {heroTitle}
                    </h1>
                    {heroSubtitle && (
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            {heroSubtitle}
                        </p>
                    )}
                    {heroDescription && (
                        <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed mt-4">
                            {heroDescription}
                        </p>
                    )}
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="bg-[#fafafa] text-zinc-900">
            {children}
        </div>

        {/* Inline CTA */}
        {showCTA && ctaText && (
            <div className="bg-[#fafafa] py-16 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <CTAButton href={ctaHref} size="lg">
                        {ctaText}
                    </CTAButton>
                    <p className="mt-4 text-sm text-zinc-500">
                        {common?.noCard || 'Aucune carte requise'}
                    </p>
                </div>
            </div>
        )}

        <Footer content={footerContent} lang={lang} />
    </div>
);

export default ContentPageLayout;
