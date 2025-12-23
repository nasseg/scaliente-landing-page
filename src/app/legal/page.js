import Link from 'next/link';
import { Shield, Lock, FileText, Trash2, Mail, Scale } from 'lucide-react';

export const metadata = {
    title: 'Legal Center - Privacy & Terms',
    description: 'Procedures for data privacy, terms of service, and data deletion for SCALIENTE LLC.',
};

export default function LegalPage() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-rose-100 selection:text-rose-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity">
                        Scaliente
                    </Link>
                    <nav className="hidden sm:flex gap-6 text-sm font-medium text-neutral-600">
                        <a href="#mentions" className="hover:text-rose-600 transition-colors">Mentions Légales</a>
                        <a href="#privacy" className="hover:text-rose-600 transition-colors">Privacy Policy</a>
                        <a href="#cgv" className="hover:text-rose-600 transition-colors">CGV (Sales Terms)</a>
                        <a href="#terms" className="hover:text-rose-600 transition-colors">Terms of Service</a>
                        <a href="#deletion" className="hover:text-rose-600 transition-colors">Data Deletion</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 sm:py-20">

                {/* Intro */}
                <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
                        Legal Center
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
                        Transparency is core to our values. Below you will find our Privacy Policy, Terms of Service, and Data Deletion instructions.
                    </p>
                    <div className="mt-4 text-sm text-neutral-500">
                        Last Updated: {currentDate}
                    </div>
                </div>

                {/* Legal Content Container */}
                <div className="space-y-16">

                    {/* MENTIONS LEGALES SECTION - ADDED */}
                    <section id="mentions" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Scale size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Mentions Légales</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <h3>1. Éditeur du Site</h3>
                            <p>
                                Le site <strong>Scaliente</strong> (accessible à l'adresse www.scaliente.com et app.scaliente.com) est édité par la société <strong>SCALIENTE LLC</strong>.
                                <br />
                                <strong>Forme juridique :</strong> Limited Liability Company (LLC)
                                <br />
                                <strong>Siège social :</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801, USA
                                <br />
                                <strong>Email de contact :</strong> <a href="mailto:scalientesolutions@gmail.com">scalientesolutions@gmail.com</a>
                                <br />
                                <strong>Directeur de la publication :</strong> SCALIENTE LLC
                            </p>

                            <h3>2. Hébergement</h3>
                            <p>
                                Le site est hébergé par la société <strong>Vercel Inc.</strong>
                                <br />
                                <strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA
                                <br />
                                <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
                            </p>

                            <h3>3. Propriété Intellectuelle</h3>
                            <p>
                                L'ensemble de ce site relève de la législation internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique ou papier quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                            </p>
                        </div>
                    </section>

                    {/* PRIVACY POLICY SECTION */}
                    <section id="privacy" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Privacy Policy</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <h3>1. Identity and Contact</h3>
                            <p>
                                This Privacy Policy explains how <strong>SCALIENTE LLC</strong> ("we", "us", or "our") collects, uses, and discloses information about you.
                                <br />
                                <strong>Registered Address:</strong> 1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801
                                <br />
                                <strong>Contact Email:</strong> scalientesolutions@gmail.com
                            </p>

                            <h3>2. Information We Collect</h3>
                            <p>We collect information you provide directly to us, such as when you create an account, connect a third-party service, or request customer support.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Account Information:</strong> Name, email address, password, and Shopify store URL.</li>
                                <li><strong>Platform Data:</strong> When you connect third-party platforms (Google Ads, Meta Ads, TikTok Ads, Snap Ads, Shopify), we collect performance metrics (spend, conversions, sales) to display them on your dashboard.</li>
                                <li><strong>Usage Data:</strong> Log data, IP address, device type, and browser info to improve security and user experience.</li>
                            </ul>

                            <div className="my-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                                <h4 className="text-blue-900 text-lg font-bold mb-2 flex items-center gap-2">
                                    <Shield size={18} /> Google Limited Use Disclosure
                                </h4>
                                <p className="text-blue-800 text-sm leading-relaxed">
                                    Scaliente's use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Google API Services User Data Policy</a>, including the Limited Use requirements. We do not use Google Workspace APIs to develop, improve, or train generalized AI and/or ML models.
                                </p>
                            </div>

                            <h3>3. How We Use Your Information</h3>
                            <p>We use the collected data for the following purposes:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To provide, maintain, and improve our unified analytics dashboard.</li>
                                <li>To process transactions and manage your subscription.</li>
                                <li>To send you technical notices, updates, security alerts, and support messages.</li>
                                <li>To comply with legal obligations.</li>
                            </ul>

                            <h3>4. Data Sharing and Disclosure</h3>
                            <p>
                                We do <strong>not</strong> sell your personal data. We may share information with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Service Providers:</strong> Vendors who perform services on our behalf (e.g., hosting via Vercel, database via Supabase).</li>
                                <li><strong>Compliance:</strong> In response to a request for information if we believe disclosure is in accordance with any applicable law or legal process.</li>
                            </ul>
                        </div>
                    </section>

                    {/* CGV SECTION - ADDED */}
                    <section id="cgv" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Conditions Générales de Vente (CGV)</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                                <p className="text-amber-800 text-sm">
                                    <strong>Usage Professionnel Uniquement (B2B) :</strong> Les services de SCALIENTE sont exclusivement destinés aux professionnels (e-commerçants, agences). En souscrivant, vous reconnaissez agir à des fins professionnelles, ce qui exclut l'application du droit de la consommation (sauf dispositions d'ordre public).
                                </p>
                            </div>

                            <h3>1. Objet</h3>
                            <p>
                                Les présentes Conditions Générales de Vente (CGV) régissent la fourniture des services SaaS proposés par SCALIENTE LLC ("le Prestataire") au Client ("le Client"). Toute souscription implique l'adhésion sans réserve à ces CGV.
                            </p>

                            <h3>2. Prix et Paiement</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Tarifs :</strong> Les prix sont indiqués en Euros ou Dollars hors taxes. SCALIENTE se réserve le droit de modifier ses tarifs à tout moment pour la période de renouvellement suivante, sous réserve d'en informer le Client au moins 30 jours à l'avance.</li>
                                <li><strong>Facturation :</strong> Le paiement est exigible d'avance (terme à échoir) par carte bancaire via notre prestataire sécurisé Stripe.</li>
                                <li><strong>Retard de paiement :</strong> Tout retard entraîne la suspension immédiate de l'accès aux services.</li>
                            </ul>

                            <h3>3. Durée et Résiliation</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Santé de l'abonnement :</strong> L'abonnement est conclu pour une durée indéterminée avec tacite reconduction mensuelle ou annuelle selon le plan choisi.</li>
                                <li><strong>Annulation (Désabonnement) :</strong> Le Client peut résilier son abonnement à tout moment depuis son espace client. La résiliation prendra effet à la fin de la période de facturation en cours. <strong>Aucun remboursement prorata temporis n'est effectué pour la période entamée.</strong></li>
                            </ul>

                            <h3>4. Renonciation au Droit de Rétractation (Fin de Non-Recevoir)</h3>
                            <p>
                                Conformément à l'article L.221-28 du Code de la Consommation (et équivalents européens), le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
                                <br /><br />
                                <strong>En validant sa commande et en accédant immédiatement au service, le Client reconnait expressément que l'exécution du service commence immédiatement et renonce expressément à son droit de rétractation de 14 jours.</strong>
                            </p>

                            <h3>5. Limitation de Responsabilité</h3>
                            <p>
                                SCALIENTE LLC s'engage à une obligation de moyens. La responsabilité de SCALIENTE ne pourra être engagée qu'en cas de faute prouvée. En tout état de cause, la responsabilité globale de SCALIENTE, toutes causes confondues, est strictement limitée au montant total payé par le Client au cours des 3 derniers mois précédant le fait générateur. SCALIENTE ne saurait être tenu responsable des pertes indirectes (perte de chiffre d'affaires, perte de données, préjudice d'image).
                            </p>
                        </div>
                    </section>


                    {/* TERMS OF SERVICE SECTION */}
                    <section id="terms" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Terms of Service</h2>
                        </div>

                        <div className="prose prose-neutral max-w-none bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <h3>1. Acceptance of Terms</h3>
                            <p>
                                By accessing or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use our services.
                            </p>

                            <h3>2. Description of Service</h3>
                            <p>
                                Scaliente provides an analytics dashboard that aggregates data from Shopify, Google Ads, Meta Ads, TikTok Ads, and Snap Ads. You authorize us to access these accounts on your behalf via official APIs (OAuth).
                            </p>

                            <h3>3. User Responsibilities</h3>
                            <p>You interact with our service at your own risk. You are responsible for maintaining the confidentiality of your account credentials.</p>

                            <h3>4. Termination</h3>
                            <p>
                                We reserve the right to suspend or terminate your access to the service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users of the service, us, or third parties, or for any other reason.
                            </p>

                            <h3>5. Disclaimer of Warranties</h3>
                            <p>
                                The service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied.
                            </p>
                        </div>
                    </section>

                    {/* DATA DELETION SECTION */}
                    <section id="deletion" className="scroll-mt-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                <Trash2 size={24} />
                            </div>
                            <h2 className="text-3xl font-bold">Data Deletion Instructions</h2>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                                <p className="text-amber-800 text-sm">
                                    <strong>Meta (Facebook/Instagram) User Data Deletion:</strong> Pursuant to Meta's Platform Policy, we provide a mechanism for you to request the deletion of your data.
                                </p>
                            </div>

                            <h3 className="text-xl font-bold mb-4">How to Request Data Deletion</h3>
                            <p className="text-neutral-600 mb-6">
                                If you wish to remove your account and delete all associated data from our systems (including synced ad metrics and personal profile data), please follow these steps:
                            </p>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <h4 className="font-bold text-lg mb-2">Option 1: Automated (If Logged In)</h4>
                                    <p className="text-sm text-neutral-600 mb-4">
                                        Navigate to your <Link href="/settings" className="text-rose-600 font-medium hover:underline">Settings Page</Link> and click the "Delete Account" button at the bottom of the profile section.
                                    </p>
                                </div>

                                <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-100">
                                    <h4 className="font-bold text-lg mb-2">Option 2: Email Request</h4>
                                    <p className="text-sm text-neutral-600 mb-4">
                                        Send an email to our support team with the subject line <strong>"Data Deletion Request"</strong>.
                                    </p>
                                    <a href="mailto:scalientesolutions@gmail.com" className="inline-flex items-center gap-2 text-rose-600 font-medium hover:underline">
                                        <Mail size={16} /> scalientesolutions@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-bold text-neutral-900 mb-2">What happens next?</h4>
                                <ul className="list-disc pl-5 space-y-1 text-neutral-600 text-sm">
                                    <li>We will confirm receipt of your request within 48 hours.</li>
                                    <li>All of your account data will be permanently deleted from our primary database within 30 days.</li>
                                    <li>If you connected via Facebook Login, we will trigger the data deletion callback to notify Meta that your data has been purged.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <footer className="mt-24 pt-12 border-t border-neutral-200 text-center text-neutral-500 text-sm">
                    <p className="mb-2">© {new Date().getFullYear()} SCALIENTE LLC. All rights reserved.</p>
                    <p>1309 Coffeen Avenue STE 1200, Sheridan, Wyoming 82801</p>
                </footer>

            </div>
        </main>
    );
}
