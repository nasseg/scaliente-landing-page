const REFERENCE_SLOT_COUNT = 7;
const REFERENCE_PROGRESS_PER_MS = 0.000045;
const REFERENCE_ACTIVE_ARC = 0.72;
const REFERENCE_VISIBLE_SLOTS = REFERENCE_SLOT_COUNT * REFERENCE_ACTIVE_ARC;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export function buildCarouselSlots(items, minimumSlots = REFERENCE_SLOT_COUNT) {
    if (!Array.isArray(items) || items.length === 0) return [];

    const slotCount = Math.max(minimumSlots, items.length);
    return Array.from({ length: slotCount }, (_, slotIndex) => ({
        ...items[slotIndex % items.length],
        sourceIndex: slotIndex % items.length,
        slotIndex,
    }));
}

export function getCarouselSpeed(count) {
    if (!count) return 0;
    return (REFERENCE_PROGRESS_PER_MS * REFERENCE_SLOT_COUNT) / count;
}

export function getCarouselFrame(index, progress, count = REFERENCE_SLOT_COUNT, reducedMotion = false) {
    if (reducedMotion) {
        const center = Math.floor(count / 2);
        const offset = index - center;
        const distance = Math.abs(offset);
        const visible = distance <= 1;

        return {
            visible,
            x: offset * 18,
            y: offset * 24,
            z: -80 * distance,
            scale: 1 - (distance * 0.08),
            opacity: visible ? 1 - (distance * 0.18) : 0,
            rotateX: 2,
            rotateY: offset * 1.5,
            depth: visible ? 1 - (distance * 0.12) : 0,
        };
    }

    const activeArc = Math.min(REFERENCE_ACTIVE_ARC, REFERENCE_VISIBLE_SLOTS / count);
    const phase = ((index / count) + progress + 1) % 1;
    const visible = phase > 0 && phase < activeArc;
    const local = visible ? phase / activeArc : 0;
    const fade = Math.min(clamp(local / 0.06), clamp((1 - local) / 0.08));

    // Keep roughly five cards on the path. The timing and density therefore stay
    // stable when a new product screenshot is appended to the source array.
    const bendLength = (Math.PI / 2) * 90;
    const descentLength = 280;
    const exitLength = 240;
    const pathLength = descentLength + bendLength + exitLength;
    const bendStart = descentLength / pathLength;
    const bendEnd = (descentLength + bendLength) / pathLength;

    let x;
    let y;
    if (local < bendStart) {
        x = -10;
        y = -300 + ((local / bendStart) * descentLength);
    } else if (local < bendEnd) {
        const bendProgress = (local - bendStart) / (bendEnd - bendStart);
        const angle = (180 + (bendProgress * 90)) * (Math.PI / 180);
        x = 80 + (90 * Math.cos(angle));
        y = -20 - (90 * Math.sin(angle));
    } else {
        const exitProgress = (local - bendEnd) / (1 - bendEnd);
        x = 80 + (exitProgress * exitLength);
        y = 70;
    }

    const pathProgress = local < bendStart
        ? local / (2 * bendStart)
        : 0.5 + ((local - bendStart) / (2 * (1 - bendStart)));
    const depth = visible ? Math.sin(pathProgress * Math.PI) : 0;

    return {
        visible,
        x,
        y,
        z: -1000 + (1280 * depth),
        scale: 0.44 + (0.74 * depth),
        opacity: visible ? fade * (0.4 + (0.6 * depth)) : 0,
        rotateX: 4 - (2 * depth),
        rotateY: -3 + (6 * local),
        depth,
    };
}

export function frameToStyle(frame) {
    return {
        zIndex: Math.round(20 + (frame.depth * 80)),
        opacity: frame.opacity,
        transform: `translate3d(calc(-50% + ${frame.x}%), calc(-50% + ${frame.y}%), ${frame.z}px) rotateX(${frame.rotateX}deg) rotateY(${frame.rotateY}deg) scale(${frame.scale})`,
        pointerEvents: frame.visible && frame.depth > 0.72 ? 'auto' : 'none',
    };
}
