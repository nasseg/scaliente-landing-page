'use client';

const FrostedSection = ({ children, className = '' }) => (
    <div className="relative py-3">
        {/* White frame edges */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 left-0 w-3 md:w-4 bg-[#fafafa]" />
        <div className="absolute top-0 bottom-0 right-0 w-3 md:w-4 bg-[#fafafa]" />
        {/* Frosted card wrapper */}
        <div className="relative mx-3 md:mx-4">
            {/* Frosted card — box-shadow fills rounded corners with #fafafa */}
            <div className={`relative bg-[#09090b]/50 backdrop-blur-xl backdrop-saturate-150 rounded-[1.25rem] md:rounded-[1.5rem] text-white overflow-hidden border border-white/5 shadow-[0_0_0_1.25rem_#fafafa] md:shadow-[0_0_0_1.5rem_#fafafa] ${className}`}>
                {children}
            </div>
        </div>
    </div>
);

export default FrostedSection;
