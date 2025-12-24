'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = ({ content }) => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setShowBanner(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        localStorage.setItem('cookie-consent-date', new Date().toISOString());
        setShowBanner(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookie-consent', 'declined');
        localStorage.setItem('cookie-consent-date', new Date().toISOString());
        setShowBanner(false);
    };

    if (!showBanner || !content) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div className="max-w-4xl mx-auto bg-[#1A1D24] border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">{content?.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                            {content?.text}{' '}
                            <Link href="/legal#cookies" className="text-orange-400 hover:underline">
                                {content?.learnMore}
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                        <button
                            onClick={declineCookies}
                            className="px-5 py-2.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                        >
                            {content?.essentialOnly}
                        </button>
                        <button
                            onClick={acceptCookies}
                            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                        >
                            {content?.acceptAll}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
