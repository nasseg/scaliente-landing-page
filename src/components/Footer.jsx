import { TrendingUp } from 'lucide-react';

const Footer = () => (
    <footer className="liquid-glass py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-purple-600 rounded flex items-center justify-center">
                        <TrendingUp className="text-white w-3 h-3" />
                    </div>
                    <span className="text-lg font-bold text-white">Scaliente</span>
                </div>
                <p className="text-gray-500 text-sm max-w-xs">
                    Le tracker de profit ultime pour les e-commerçants ambitieux.
                </p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Produit</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-orange-400">Fonctionnalités</a></li>
                    <li><a href="#" className="hover:text-orange-400">Intégrations</a></li>
                    <li><a href="#" className="hover:text-orange-400">Tarifs</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Légal</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-orange-400">Confidentialité</a></li>
                    <li><a href="#" className="hover:text-orange-400">CGU</a></li>
                    <li><a href="#" className="hover:text-orange-400">Mentions Légales</a></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
            © 2024 Scaliente. Tous droits réservés.
        </div>
    </footer>
);

export default Footer;
