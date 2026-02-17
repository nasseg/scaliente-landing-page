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
                                alt="Scaliente"
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

                        {/* Social Links */}
                        <div className="flex items-center gap-3 mt-6">
                            <a href="https://x.com/scaliente" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://linkedin.com/company/scaliente" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </a>
                        </div>
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
