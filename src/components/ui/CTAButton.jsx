import { ArrowUpRight } from 'lucide-react';

const CTAButton = ({
    href = 'https://apps.shopify.com/scaliente',
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    showArrow = true,
    analytics = 'primary_cta_click',
    analyticsLocation = 'unknown',
}) => {
    const sizes = {
        sm: 'min-h-11 px-5 py-2.5 text-sm',
        md: 'min-h-12 px-6 py-3 text-base',
        lg: 'min-h-14 px-7 py-4 text-base',
    };
    const variants = {
        primary: 'bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600 shadow-[0_14px_35px_-18px_rgba(249,115,22,0.9)] hover:-translate-y-0.5',
        secondary: 'border border-white/20 bg-black/20 text-white hover:border-white/45 hover:bg-white/[0.06]',
        ghost: 'border border-zinc-300 text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white',
    };

    return (
        <a
            href={href}
            data-analytics={analytics}
            data-analytics-location={analyticsLocation}
            className={`group inline-flex w-full items-center justify-center gap-2 rounded-[10px] font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 sm:w-auto ${sizes[size]} ${variants[variant]} ${className}`}
        >
            <span className="whitespace-nowrap">{children}</span>
            {showArrow && <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />}
        </a>
    );
};

export default CTAButton;
