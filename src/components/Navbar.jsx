import Image from 'next/image';
import LanguageSelector from './LanguageSelector';

const Navbar = ({ content, lang }) => (
    <nav className="fixed top-0 w-full z-50 liquid-glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center">
                <a href={`/${lang}`}>
                    <Image
                        src="/scaliente_horizontale.png"
                        alt="Scaliente"
                        width={180}
                        height={48}
                        className="h-12 w-auto"
                        priority
                    />
                </a>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href={`/${lang}/#features`} className="hover:text-white transition-colors">{content?.features || "Features"}</a>
                <a href={`/${lang}/#pricing`} className="hover:text-white transition-colors">{content?.pricing || "Pricing"}</a>
                <a href={`/${lang}/#comparison`} className="hover:text-white transition-colors">{content?.comparison || "Before/After"}</a>
            </div>
            <div className="flex items-center gap-4">
                <LanguageSelector currentLang={lang} position="bottom" />
                <a href="https://app.scaliente.com" className="hidden md:block text-sm text-gray-300 hover:text-white transition-colors">
                    {content?.login || "Login"}
                </a>
                <a href="https://app.scaliente.com" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    {content?.freeTrial || "Free Trial"}
                </a>
            </div>
        </div>
    </nav>
);

export default Navbar;
