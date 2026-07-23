import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CTAButton from '@/components/ui/CTAButton';
import PageHero from '@/components/ui/PageHero';

const ContentPageLayout = ({
    lang,
    navContent,
    footerContent,
    common,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroEyebrow,
    heroVisual,
    ctaText,
    ctaHref = 'https://apps.shopify.com/scaliente',
    showCTA = true,
    children
}) => (
    <div className="min-h-screen bg-[#09090b] font-sans selection:bg-orange-500/30">
        <Navbar content={navContent} lang={lang} isHomePage={false} />

        <PageHero
            title={heroTitle}
            subtitle={heroSubtitle}
            description={heroDescription}
            eyebrow={heroEyebrow}
            visual={heroVisual}
        />

        {/* Content */}
        <div data-header-theme="light" className="secondary-page bg-[#fafafa] text-zinc-900">
            {children}
        </div>

        {/* Inline CTA */}
        {showCTA && ctaText && (
            <div data-header-theme="light" className="bg-[#fafafa] py-16 text-center">
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
