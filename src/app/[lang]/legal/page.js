import Link from 'next/link';
import { Shield, Lock, FileText, Trash2, Mail, Scale } from 'lucide-react';
import { getDictionary } from '../../i18n';

export async function generateMetadata({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return {
        title: `${dict.legalPage.title} - Scaliente`,
        description: dict.legalPage.subtitle,
    };
}

export default async function LegalPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.legalPage;

    const currentDate = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-rose-100 selection:text-rose-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href={`/${lang}`} className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
                        Scaliente
                    </Link>
                    <nav className="hidden sm:flex gap-6 text-sm font-medium text-neutral-600">
                        <a href="#mentions" className="hover:text-rose-600 transition-colors">{content.nav.mentions}</a>
                        <a href="#privacy" className="hover:text-rose-600 transition-colors">{content.nav.privacy}</a>
                        <a href="#cookies" className="hover:text-rose-600 transition-colors">{content.nav.cookies}</a>
                        <a href="#cgv" className="hover:text-rose-600 transition-colors">{content.nav.cgv}</a>
                        <a href="#terms" className="hover:text-rose-600 transition-colors">{content.nav.terms}</a>
                        <a href="#deletion" className="hover:text-rose-600 transition-colors">{content.nav.deletion}</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">

                {/* Intro */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                        {content?.title}
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
                        {content?.subtitle}
                    </p>
                    <div className="mt-4 text-sm text-neutral-500">
                        {content.updated} {currentDate}
                    </div>
                </div>

                {/* Legal Content Container */}
                <div className="space-y-16">

                    {/* MENTIONS LEGALES SECTION */}
                    <section id="mentions" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Scale size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.mentions?.title}</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <h3>1. {content?.sections?.mentions?.editor}</h3>
                            <p>
                                Le site <strong>Scaliente</strong> (accessible à l&apos;adresse www.scaliente.com et app.scaliente.com) est édité par la société <strong>SCALIENTE LLC</strong>.
                                <br />
                                <strong>Forme juridique :</strong> Limited Liability Company (LLC)
                                <br />
                                <strong>Siège social :</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, USA
                                <br />
                                <strong>Email de contact :</strong> <a href="mailto:scalientesolutions@gmail.com">scalientesolutions@gmail.com</a>
                            </p>

                            <h3>2. {content?.sections?.mentions?.hosting}</h3>
                            <p>
                                Vercel Inc.
                                <br />
                                340 S Lemon Ave #4133 Walnut, CA 91789, USA
                            </p>

                            <h3>3. {content?.sections?.mentions?.ip}</h3>
                            <p>
                                {content?.sections?.mentions?.ip_text}
                            </p>
                        </div>
                    </section>

                    {/* PRIVACY POLICY SECTION */}
                    <section id="privacy" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.privacy?.title}</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <p>
                                {content?.sections?.privacy?.intro}
                            </p>
                            <h3>1. {content?.sections?.privacy?.collect}</h3>
                            <p>
                                {content?.sections?.privacy?.collect_text}
                            </p>

                            <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                                <h4 className="text-blue-900 text-lg font-bold mb-2 flex items-center gap-2">
                                    <Shield size={18} /> Google Limited Use Disclosure
                                </h4>    <p className="text-blue-800 text-sm leading-relaxed">
                                    Scaliente&apos;s use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Google API Services User Data Policy</a>, including the Limited Use requirements.
                                </p>
                            </div>

                            <h3>2. {content?.sections?.privacy?.use}</h3>
                            <p>{content?.sections?.privacy?.use_text}</p>

                            <h3>3. {content?.sections?.privacy?.sharing}</h3>
                            <p>{content?.sections?.privacy?.sharing_text}</p>
                        </div>
                    </section>

                    {/* COOKIES SECTION */}
                    <section id="cookies" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.cookies?.title}</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <p>{content?.sections?.cookies?.intro}</p>
                            <h3>{content?.sections?.cookies?.types}</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>{content?.sections?.cookies?.essential}</li>
                                <li>{content?.sections?.cookies?.analytics}</li>
                            </ul>
                            <h3>{content?.sections?.cookies?.manage}</h3>
                            <p>{content?.sections?.cookies?.manage_text}</p>
                        </div>
                    </section>

                    {/* CGV SECTION */}
                    <section id="cgv" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.cgv?.title}</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                                <p className="text-amber-800 text-sm">
                                    <strong>{content?.sections?.cgv?.b2b}</strong>
                                </p>
                            </div>
                            <h3>{content?.sections?.cgv?.price}</h3>
                            <p>Stripe (Euros/Dollars).</p>
                            <h3>{content?.sections?.cgv?.termination}</h3>
                            <p>{content?.sections?.cgv?.termination_text}</p>
                            <h3>{content?.sections?.cgv?.retraction}</h3>
                            <p>{content?.sections?.cgv?.retraction_text}</p>
                        </div>
                    </section>

                    {/* TERMS SECTION */}
                    <section id="terms" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.terms?.title}</h2>
                        </div>
                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <p>{content?.sections?.terms?.acceptance}</p>
                            <p>{content?.sections?.terms?.description}</p>
                            <p>{content?.sections?.terms?.responsibilities}</p>
                        </div>
                    </section>

                    {/* DATA DELETION SECTION */}
                    <section id="deletion" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Trash2 size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">{content?.sections?.deletion?.title}</h2>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <p className="text-neutral-600 mb-6">{content?.sections?.deletion?.intro}</p>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <h4 className="font-bold text-lg mb-2">{content?.sections?.deletion?.option1}</h4>
                                </div>
                                <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <h4 className="font-bold text-lg mb-2">{content?.sections?.deletion?.option2}</h4>
                                    <a href="mailto:scalientesolutions@gmail.com" className="inline-flex items-center gap-2 text-rose-600 font-medium hover:underline">
                                        <Mail size={16} /> scalientesolutions@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <footer className="mt-24 pt-12 border-t border-neutral-200 text-center text-neutral-500 text-sm">
                    <p className="mb-2">© {new Date().getFullYear()} SCALIENTE LLC. All rights reserved.</p>
                </footer>

            </div>
        </main>
    );
}
