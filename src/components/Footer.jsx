import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

const Footer = ({ content, lang }) => (
    <footer className="bg-[#09090b] relative z-20">
        <div className="max-w-6xl mx-auto px-6 py-16">
            <nav aria-label="Footer navigation">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                    {/* Logo & Tagline */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:max-w-xs">
                        <div className="mb-4">
                            <Image
                                src="/scaliente_horizontale.png"
                                alt="Scaliente - Profit Tracker Shopify"
                                width={140}
                                height={36}
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                            {content?.tagline}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span>🇺🇸</span>
                            <span>{content?.madeInUsa || 'Made in USA'}</span>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-brand text-white font-semibold mb-4 text-sm">
                            {content?.product || "Produit"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href={`/${lang}/#features`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.features || "Fonctionnalites"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/#pricing`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.pricing || "Tarifs"}
                                </Link>
                            </li>
                            <li>
                                <a href="https://app.scaliente.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.login || "Connexion"}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-brand text-white font-semibold mb-4 text-sm">
                            {content?.resources || "Ressources"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href={`/${lang}/tools/roas-calculator`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.calculator || "Calculateur ROAS"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/compare/scaliente-vs-trueprofit`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.compare || "Scaliente vs TrueProfit"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/compare/scaliente-vs-triple-whale`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.compareTripleWhale || "Scaliente vs Triple Whale"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/compare/scaliente-vs-lifetimely`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.compareLifetimely || "Scaliente vs Lifetimely"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/affiliate`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.affiliate || "Programme affilie"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-brand text-white font-semibold mb-4 text-sm">
                            {content?.legal || "Legal"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href={`/${lang}/privacy-policy`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.privacy || "Vie privee"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/terms-of-service`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.terms || "CGU"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/terms-of-sale`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.termsOfSale || "CGV"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/cookies`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.cookies || "Cookies"}
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/legal-mentions`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    {content?.links?.legalMentions || "Mentions legales"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-brand text-white font-semibold mb-4 text-sm">
                            {content?.company || "Entreprise"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:contact@scaliente.com" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-zinc-500 text-sm">
                    &copy; {new Date().getFullYear()} Scaliente. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <LanguageSelector currentLang={lang} position="top" theme="dark" />
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
