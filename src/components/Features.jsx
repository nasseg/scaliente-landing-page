import React from 'react';
import { Layers, DollarSign, Activity } from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

const FeatureSection = () => {
    return (
        <section id="features" className="py-24 liquid-glass relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Centralisez. Analysez. <span className="text-orange-500">Scalez.</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Scaliente se connecte à tous vos outils en un clic. Fini les tableurs Excel et les calculs manuels à 2h du matin.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Layers className="text-purple-400" />}
                        title="Attribution Précise"
                        desc="Sachez exactement quelle pub a généré quelle vente. Nous croisons les données de Meta, TikTok, Google et Shopify."
                    />
                    <FeatureCard
                        icon={<DollarSign className="text-green-400" />}
                        title="Profit Net Réel (POAS)"
                        desc="Nous déduisons tout : Coût produit (COGS), frais de port, frais de transaction Stripe/PayPal et taxes."
                    />
                    <FeatureCard
                        icon={<Activity className="text-orange-400" />}
                        title="Temps Réel"
                        desc="Vos données sont rafraîchies toutes les 5 minutes. Prenez des décisions basées sur l'instant présent, pas sur hier."
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
