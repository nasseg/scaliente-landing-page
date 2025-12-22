import { CheckCircle2, XCircle } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section id="comparison" className="py-24 liquid-glass relative">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-black/80 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Pourquoi payer plus pour la même chose ?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Competitor */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] opacity-70 hover:opacity-100 transition-opacity">
                        <h3 className="text-xl font-bold text-gray-400 mb-6">La &quot;Baleine&quot; Bleue</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-gray-500">
                                <CheckCircle2 className="w-5 h-5 text-gray-600" /> Dashboard E-com
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <CheckCircle2 className="w-5 h-5 text-gray-600" /> Attribution
                            </li>
                            <li className="flex items-center gap-3 text-red-400">
                                <XCircle className="w-5 h-5" /> Prix basé sur le CA (Variable)
                            </li>
                            <li className="flex items-center gap-3 text-red-400">
                                <XCircle className="w-5 h-5" /> Coûteux ($300+/mois)
                            </li>
                        </ul>
                        <div className="text-2xl font-bold text-gray-500">Variable $$$</div>
                    </div>

                    {/* Scaliente */}
                    <div className="relative p-8 rounded-2xl border border-orange-500/50 bg-gradient-to-b from-orange-500/10 to-purple-600/10 overflow-hidden transform md:scale-105 shadow-2xl">
                        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            RECOMMANDÉ
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6">Scaliente</h3>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="w-5 h-5 text-orange-500" /> Dashboard E-com Complet
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="w-5 h-5 text-orange-500" /> Attribution Intelligente
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> <span className="font-bold text-green-400">PRIX FIXE</span> garanti
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> <span className="font-bold text-green-400">Abordable</span>
                            </li>
                        </ul>
                        <div className="text-4xl font-bold text-white">49€<span className="text-lg text-gray-400 font-normal">/mois</span></div>
                        <button className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors">
                            Passer à Scaliente
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
