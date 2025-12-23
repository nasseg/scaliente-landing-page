const CTA = () => (
    <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Prêt à voir la vérité ?</h2>
            <p className="text-xl text-gray-300 mb-10">Rejoignez les e-commerçants qui ont arrêté de perdre de l'argent avec des données floues.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <input type="email" placeholder="votre@email.com"
                    className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-full sm:w-80" />
                <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                    Essai Gratuit 14 jours
                </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">Pas de carte bancaire requise.</p>
        </div>
    </section>
);

export default CTA;
