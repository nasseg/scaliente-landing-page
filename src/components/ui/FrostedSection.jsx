'use client';

const FrostedSection = ({ children, className = '' }) => (
    <div className="relative py-3">
        {/* White frame edges */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
        {/* Frosted card wrapper with corner fills */}
        <div className="relative mx-3 md:mx-4">
            {/* White corner fills */}
            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 bg-[#fafafa]" />
            {/* Frosted card */}
            <div className={`relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5 ${className}`}>
                {children}
            </div>
        </div>
    </div>
);

export default FrostedSection;
