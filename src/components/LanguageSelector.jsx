'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
];

const LanguageSelector = ({ currentLang, position = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleLanguageChange = (langCode) => {
        if (langCode === currentLang) {
            setIsOpen(false);
            return;
        }

        // Simple path replacement logic: /fr/some-page -> /en/some-page
        const newPath = pathname.replace(`/${currentLang}`, `/${langCode}`);
        router.push(newPath);
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            >
                <Globe size={18} />
                <span className="uppercase">{currentLang}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: position === 'top' ? 10 : -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 w-40 bg-[#0F1115] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50`}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm text-left text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <span>{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </span>
                                {currentLang === lang.code && <Check size={14} className="text-orange-500" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
