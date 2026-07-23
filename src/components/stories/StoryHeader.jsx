export default function StoryHeader({ content, index, align = 'left' }) {
    return (
        <div className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
            <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
                <span className="font-mono text-xs text-orange-500">0{index}</span>
                <span className="h-px w-10 bg-orange-500/55" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{content?.eyebrow}</p>
            </div>
            <h2 className="mt-7 max-w-[15ch] text-balance font-brand text-[clamp(2.65rem,5.4vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                {content?.title?.main} <span className="text-orange-500">{content?.title?.highlight}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-secondary)]">{content?.description}</p>
        </div>
    );
}
