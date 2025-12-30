import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

const Footer = ({ content, lang }) => (
    <footer className="bg-[#0F1115] border-t border-white/5 py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
                <div className="mb-4">
                    <Image
                        src="/scaliente_horizontale.png"
                        alt="Scaliente"
                        width={140}
                        height={35}
                        className="h-8 w-auto"
                        priority
                    />
                </div>
                <p className="text-gray-500 text-sm max-w-xs">
                    {content?.tagline}
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">{content?.product}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href={`/${lang}/#features`} className="hover:text-orange-400 transition-colors">{content?.links?.features}</a></li>
                    <li><a href={`/${lang}/#pricing`} className="hover:text-orange-400 transition-colors">{content?.links?.pricing}</a></li>
                    <li><a href="https://app.scaliente.com" className="hover:text-orange-400 transition-colors">{content?.links?.login}</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">{content?.legal}</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href={`/${lang}/privacy-policy`} className="hover:text-orange-400 transition-colors">{content?.links?.privacy}</a></li>
                    <li><a href={`/${lang}/cookies`} className="hover:text-orange-400 transition-colors">{content?.links?.cookies}</a></li>
                    <li><a href={`/${lang}/terms-of-service`} className="hover:text-orange-400 transition-colors">{content?.links?.terms}</a></li>
                    <li><a href={`/${lang}/legal`} className="hover:text-orange-400 transition-colors">{content?.links?.legalMentions}</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-gray-600 text-sm">
            <div>{content?.copyright?.replace('{{year}}', new Date().getFullYear()) || `© ${new Date().getFullYear()} Scaliente. All rights reserved.`}</div>
            <LanguageSelector currentLang={lang} position="top" />
        </div>
    </footer>
);

export default Footer;
