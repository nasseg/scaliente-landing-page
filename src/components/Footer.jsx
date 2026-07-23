import Image from 'next/image';
import Link from 'next/link';
import LanguageSelector from './LanguageSelector';

const Footer = ({ content, lang }) => {
    const groups = [
        {
            title: content?.product || 'Produit',
            links: [
                [content?.links?.features || 'Fonctionnalités', `/${lang}/#profit-truth`],
                [content?.links?.pricing || 'Tarifs', `/${lang}/#pricing`],
                [content?.links?.login || 'Connexion', 'https://app.scaliente.com'],
            ],
        },
        {
            title: content?.resources || 'Ressources',
            links: [
                [content?.links?.guides || 'Guides', `/${lang}/guides`],
                [content?.links?.calculator || 'Calculateur ROAS', `/${lang}/tools/roas-calculator`],
                [content?.links?.compare || 'Scaliente vs TrueProfit', `/${lang}/compare/scaliente-vs-trueprofit`],
                [content?.links?.compareTripleWhale || 'Scaliente vs Triple Whale', `/${lang}/compare/scaliente-vs-triple-whale`],
                [content?.links?.compareLifetimely || 'Scaliente vs Lifetimely', `/${lang}/compare/scaliente-vs-lifetimely`],
                [content?.links?.affiliate || 'Programme affilié', `/${lang}/affiliate`],
            ],
        },
        {
            title: content?.legal || 'Légal',
            links: [
                [content?.links?.privacy || 'Vie privée', `/${lang}/privacy-policy`],
                [content?.links?.terms || 'CGU', `/${lang}/terms-of-service`],
                [content?.links?.termsOfSale || 'CGV', `/${lang}/terms-of-sale`],
                [content?.links?.cookies || 'Cookies', `/${lang}/cookies`],
                [content?.links?.legalMentions || 'Mentions légales', `/${lang}/legal-mentions`],
            ],
        },
    ];

    return (
        <footer data-header-theme="dark" className="relative z-20 border-t border-white/[0.08] bg-[#08080a] text-white">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18">
                <div className="grid gap-12 lg:grid-cols-[1.1fr_1.9fr]">
                    <div className="max-w-sm">
                        <Image src="/scaliente_horizontale.png" alt="Scaliente - Profit Tracker Shopify" width={132} height={44} className="h-8 w-auto" />
                        <p className="mt-5 text-sm leading-6 text-zinc-400">{content?.tagline}</p>
                        <span className="mt-6 block h-1 w-12 rounded-full bg-orange-500" aria-hidden="true" />
                        <p className="mt-5 text-xs text-zinc-500">🇺🇸 {content?.madeInUsa || 'Made in USA'}</p>
                    </div>

                    <nav aria-label="Navigation de pied de page" className="grid gap-9 sm:grid-cols-3">
                        {groups.map((group) => (
                            <div key={group.title}>
                                <h3 className="font-brand text-sm font-semibold">{group.title}</h3>
                                <ul className="mt-4 space-y-3">
                                    {group.links.map(([label, href]) => (
                                        <li key={href}><Link href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">{label}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="border-t border-white/[0.08]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <p>&copy; {new Date().getFullYear()} Scaliente. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="mailto:contact@scaliente.com" className="transition-colors hover:text-white">Contact</a>
                        <LanguageSelector currentLang={lang} position="top" theme="dark" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
