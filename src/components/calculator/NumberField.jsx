export default function NumberField({ label, ariaLabel, hint, symbol, value, onChange, placeholder, max, step = '0.01' }) {
    return (
        <label className="block">
            {label && <span className="flex items-baseline justify-between gap-4 text-sm font-medium text-zinc-800">
                {label}{symbol && <span className="font-mono text-xs text-zinc-500">{symbol}</span>}
            </span>}
            {hint && <span className="mt-1 block text-xs leading-5 text-zinc-500">{hint}</span>}
            <input
                type="number"
                aria-label={ariaLabel}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                min="0"
                max={max}
                step={step}
                className={`${label ? 'mt-2' : ''} min-h-12 w-full rounded-[10px] border border-zinc-200 bg-white px-4 text-base text-zinc-950 outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10`}
            />
        </label>
    );
}
