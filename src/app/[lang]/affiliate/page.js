import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AffiliateContent from '@/components/AffiliateContent';
import { getDictionary } from '../../i18n';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const affiliate = dict.affiliate;

    return {
        title: affiliate?.metadata?.title || `${affiliate?.hero?.title} - Scaliente`,
        description: affiliate?.metadata?.description || affiliate?.hero?.subtitle,
        alternates: {
            canonical: `https://scaliente.com/${lang}/affiliate`,
            languages: {
                'fr': 'https://scaliente.com/fr/affiliate',
                'en': 'https://scaliente.com/en/affiliate',
                'de': 'https://scaliente.com/de/affiliate',
                'x-default': 'https://scaliente.com/fr/affiliate',
            },
        },
    };
}

export default async function AffiliatePage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.affiliate;

    return (
        <div className="min-h-screen bg-[#0A0B0D] text-white selection:bg-orange-500/30">
            <Navbar content={dict.navbar} common={dict.common} lang={lang} isHomePage={false} />
            <AffiliateContent content={content} lang={lang} />
            <Footer content={dict.footer} lang={lang} />
        </div>
    );
}
