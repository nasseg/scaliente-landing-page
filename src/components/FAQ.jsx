'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Est-ce que Scaliente va ralentir mon site Shopify ?",
        answer: "Absolument pas. Scaliente fonctionne via l'API officielle de Shopify et se connecte en arrière-plan. Aucun script n'est injecté sur votre vitrine (storefront), donc aucun impact sur vos temps de chargement ou vos Core Web Vitals."
    },
    {
        question: "Ma boutique utilise un thème personnalisé, est-ce compatible ?",
        answer: "Oui, Scaliente est compatible avec 100% des thèmes Shopify (2.0 et anciens). Comme nous n'altérons pas le code de votre thème, tout fonctionne parfaitement quelle que soit votre configuration visuelle."
    },
    {
        question: "Est-ce compliqué à installer ? Je ne suis pas dev.",
        answer: "C'est un jeu d'enfant. L'installation se fait en 1 clic via l'App Store Shopify. Ensuite, vous connectez vos comptes publicitaires (Facebook, Google, etc.) via une connexion sécurisée standard. En 2 minutes chrono, votre dashboard est prêt."
    },
    {
        question: "Mes données sont-elles en sécurité ?",
        answer: "La sécurité est notre priorité absolue. Nous utilisons uniquement des accès en lecture seule (read-only) pour analyser vos pubs. Vos données de vente sont chiffrées (AES-256) et nous ne vendons jamais vos informations à des tiers."
    },
    {
        question: "Pourquoi pas juste utiliser Shopify Analytics ?",
        answer: "Shopify vous donne votre Chiffre d'Affaires, pas votre profit réel. Il ne déduit pas vos coûts publicitaires (Ads), ni vos frais de transaction (Stripe/PayPal), ni vos coûts produits (COGS) en temps réel. Scaliente vous montre ce qui reste vraiment dans votre poche."
    },
    {
        question: "Suis-je engagé sur la durée ?",
        answer: "Non, c'est sans engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre dashboard en un clic. L'accès s'arrêtera simplement à la fin de votre période de facturation en cours."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-white/5 last:border-0"
        >
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between gap-4 text-left group hover:bg-white/[0.02] transition-colors rounded-lg px-2"
            >
                <span className="text-lg font-medium text-white group-hover:text-orange-400 transition-colors">
                    {question}
                </span>
                <div className={`p-2 rounded-full border border-white/10 transition-colors ${isOpen ? 'bg-orange-500/10 border-orange-500/30' : 'bg-[#1A1D24]'}`}>
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-orange-400" />
                    ) : (
                        <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    )}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 px-2 leading-relaxed text-base border-l-2 border-orange-500/30 pl-4 ml-2 mb-2">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = ({ content }) => {
    const [openIndex, setOpenIndex] = useState(0);

    // Map dictionary structure to component expectations
    const faqs = content?.questions ? Object.values(content.questions).map(q => ({
        question: q.q,
        answer: q.a
    })) : [
        // Fallback
        {
            question: "Est-ce que Scaliente va ralentir mon site Shopify ?",
            answer: "Absolument pas. Scaliente fonctionne via l'API officielle de Shopify et se connecte en arrière-plan. Aucun script n'est injecté sur votre vitrine (storefront), donc aucun impact sur vos temps de chargement ou vos Core Web Vitals."
        }
    ];

    return (
        <section className="py-24 relative z-10">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
                        <HelpCircle className="w-4 h-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-200">{content?.badge || "Support & Questions"}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {content?.title}
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {content?.subtitle}
                    </p>
                </div>

                <div className="bg-[#0F1115]/50 backdrop-blur-xl border border-white/5 rounded-2xl p-4 md:p-8 shadow-2xl">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            index={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
