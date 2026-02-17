import { ArrowRight } from 'lucide-react';

const CTAButton = ({
    href = 'https://apps.shopify.com/scaliente',
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    showArrow = true
}) => {
    const sizeClasses = {
        sm: 'px-5 py-2.5 text-sm rounded-xl',
        md: 'px-8 py-4 text-lg rounded-2xl',
        lg: 'px-10 py-5 text-lg rounded-2xl',
    };

    if (variant === 'secondary') {
        return (
            <a
                href={href}
                className={`group w-full sm:w-auto ${sizeClasses[size]} text-white/90 font-medium border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300 text-center relative overflow-hidden inline-flex items-center justify-center gap-3 ${className}`}
            >
                <span className="relative z-10">{children}</span>
            </a>
        );
    }

    if (variant === 'ghost') {
        return (
            <a
                href={href}
                className={`group ${sizeClasses[size]} bg-zinc-900 text-white font-semibold hover:bg-zinc-800 transition-all duration-300 inline-flex items-center justify-center gap-2 ${className}`}
            >
                {children}
                {showArrow && <ArrowRight className="w-4 h-4" />}
            </a>
        );
    }

    // Primary variant
    return (
        <a
            href={href}
            className={`group relative w-full sm:w-auto ${sizeClasses[size]} text-white font-semibold transition-all duration-300 inline-flex items-center justify-center gap-3 overflow-hidden ${className}`}
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500 to-orange-600 transition-all duration-300" />
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-b from-orange-400 to-orange-500" />
            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
            {/* Shadow */}
            <div className="absolute inset-0 rounded-[inherit] shadow-[0_8px_32px_rgba(249,115,22,0.25)] group-hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition-shadow duration-300" />
            <span className="relative z-10">{children}</span>
            {showArrow && <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />}
        </a>
    );
};

export default CTAButton;
