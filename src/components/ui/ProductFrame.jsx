import Image from 'next/image';

export default function ProductFrame({
    image,
    alt,
    priority = false,
    className = '',
    sizes = '(min-width: 1024px) 46vw, 92vw',
}) {
    return (
        <figure className={`overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#121216] p-1.5 shadow-[0_30px_90px_rgba(0,0,0,0.42)] ${className}`}>
            <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.08] px-2" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            </div>
            <Image
                src={image.src}
                alt={alt}
                width={2048}
                height={1152}
                priority={priority}
                sizes={sizes}
                className="h-auto w-full rounded-[11px] bg-white object-cover"
            />
        </figure>
    );
}
