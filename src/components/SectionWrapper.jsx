'use client';

/**
 * SectionWrapper - Creates alternating dark/light sections with rounded corner transitions
 * Similar to Trendtrack's design pattern
 *
 * @param {string} theme - 'dark' or 'light'
 * @param {boolean} roundedTop - Whether to have rounded top corners
 * @param {boolean} roundedBottom - Whether to have rounded bottom corners
 * @param {string} className - Additional classes
 */
const SectionWrapper = ({
    children,
    theme = 'dark',
    roundedTop = false,
    roundedBottom = false,
    className = '',
    id = ''
}) => {
    const isDark = theme === 'dark';

    return (
        <div
            id={id}
            className={`
                relative
                ${isDark
                    ? 'bg-[#09090b]'
                    : 'bg-[#fafafa]'
                }
                ${roundedTop ? 'rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-8' : ''}
                ${roundedBottom ? 'rounded-b-[2.5rem] md:rounded-b-[3rem]' : ''}
                ${className}
            `}
            style={{
                position: 'relative',
                zIndex: roundedTop ? 10 : 1,
            }}
        >
            {/* Grain texture overlay for dark sections */}
            {isDark && (
                <div className="absolute inset-0 grain pointer-events-none rounded-[inherit]" />
            )}

            {/* Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

export default SectionWrapper;
