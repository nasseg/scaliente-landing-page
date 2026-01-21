import Image from 'next/image';
import LanguageSelector from './LanguageSelector';

const Footer = ({ content, lang }) => (
    <footer className="bg-white relative z-20">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-12">
                {/* Logo & Tagline */}
                <div className="lg:max-w-xs">
                    <div className="mb-4">
                        <Image
                            src="https://res.cloudinary.com/deaalisac/image/upload/v1767990403/logo_yjfbxb.png"
                            alt="Scaliente"
                            width={140}
                            height={36}
                            className="h-8 w-auto"
                            priority
                        />
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        {content?.tagline}
                    </p>
                </div>

                {/* Links Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
                    {/* Product Links */}
                    <div>
                        <h4 className="font-brand text-zinc-900 font-semibold mb-4 text-sm">
                            {content?.product || "Produit"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href={`/${lang}/#features`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.features || "Fonctionnalités"}
                                </a>
                            </li>
                            <li>
                                <a href={`/${lang}/#pricing`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.pricing || "Tarifs"}
                                </a>
                            </li>
                            <li>
                                <a href="https://app.scaliente.com" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.login || "Connexion"}
                                </a>
                            </li>
                            <li>
                                <a href={`/${lang}/affiliate`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.affiliate || "Affiliation"}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-brand text-zinc-900 font-semibold mb-4 text-sm">
                            {content?.legal || "Légal"}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href={`/${lang}/privacy-policy`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.privacy || "Confidentialité"}
                                </a>
                            </li>
                            <li>
                                <a href={`/${lang}/terms-of-service`} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    {content?.links?.terms || "CGU"}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-brand text-zinc-900 font-semibold mb-4 text-sm">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:contact@scaliente.com" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                                    contact@scaliente.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom Bar */}
        <div>
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-zinc-400 text-sm">
                    © {new Date().getFullYear()} Scaliente
                </p>
                <div className="flex items-center gap-6">
                    <LanguageSelector currentLang={lang} position="top" theme="light" />
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
