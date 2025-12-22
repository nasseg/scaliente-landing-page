import Image from 'next/image';

const Navbar = () => (
    <nav className="fixed top-0 w-full z-50 liquid-glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src="/scaliente_horizontale.png"
                    alt="Scaliente"
                    width={180}
                    height={48}
                    className="h-12 w-auto"
                    priority
                />
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a>
                <a href="#comparison" className="hover:text-white transition-colors">Comparatif</a>
                <a href="#pricing" className="hover:text-white transition-colors">Tarifs</a>
            </div>
            <div className="flex items-center gap-4">
                <button className="hidden md:block text-sm text-gray-300 hover:text-white">Connexion</button>
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Essai Gratuit
                </button>
            </div>
        </div>
    </nav>
);

export default Navbar;
