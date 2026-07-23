import {
    buildCarouselSlots,
    getCarouselFrame,
    getCarouselSpeed,
} from '@/lib/heroCarousel';

describe('hero carousel geometry', () => {
    test('keeps a dense seven-slot loop when only a few screenshots exist', () => {
        const sources = [{ src: 'one' }, { src: 'two' }, { src: 'three' }];
        const slots = buildCarouselSlots(sources);

        expect(slots).toHaveLength(7);
        expect(slots.map((slot) => slot.src)).toEqual([
            'one', 'two', 'three', 'one', 'two', 'three', 'one',
        ]);
    });

    test('keeps every screenshot when more than seven are supplied', () => {
        const sources = Array.from({ length: 9 }, (_, index) => ({ src: String(index) }));
        expect(buildCarouselSlots(sources)).toHaveLength(9);
    });

    test('keeps the interval between cards stable as screenshots are added', () => {
        expect(getCarouselSpeed(14)).toBeCloseTo(getCarouselSpeed(7) / 2);
    });

    test('moves cards down, rounds the corner, then exits to the right', () => {
        const entry = getCarouselFrame(0, 0.08, 7);
        const bend = getCarouselFrame(0, 0.36, 7);
        const exit = getCarouselFrame(0, 0.62, 7);

        expect(bend.y).toBeGreaterThan(entry.y);
        expect(exit.x).toBeGreaterThan(bend.x);
        expect(bend.opacity).toBeGreaterThan(0.5);
    });

    test('never reverses direction while a card is visible', () => {
        const frames = Array.from({ length: 70 }, (_, index) => (
            getCarouselFrame(0, 0.01 + (index * 0.01), 7)
        )).filter((frame) => frame.visible);

        frames.slice(1).forEach((frame, index) => {
            expect(frame.x).toBeGreaterThanOrEqual(frames[index].x - 0.001);
            expect(frame.y).toBeGreaterThanOrEqual(frames[index].y - 0.001);
        });
    });

    test('never leaves the desktop path sparsely populated at the loop seam', () => {
        const samplePoints = Array.from({ length: 101 }, (_, index) => index / 100);
        const visibleCounts = samplePoints.map((progress) => (
            Array.from({ length: 7 }, (_, index) => getCarouselFrame(index, progress, 7))
                .filter((frame) => frame.visible).length
        ));

        expect(Math.min(...visibleCounts)).toBeGreaterThanOrEqual(5);
        expect(Math.max(...visibleCounts)).toBeLessThanOrEqual(6);
    });

    test('returns a stable static composition for reduced motion', () => {
        expect(getCarouselFrame(3, 0.4, 7, true)).toMatchObject({
            visible: true,
            opacity: 1,
        });
        expect(getCarouselFrame(4, 0.9, 7, true).x).toBeGreaterThan(0);
        expect(getCarouselFrame(0, 0.2, 7, true).visible).toBe(false);
    });
});
