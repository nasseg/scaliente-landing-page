import { resolvePublicLaunchContent } from '@/lib/public-launch-content';

describe('public launch content overlays', () => {
    test('deep-merges partial array entries instead of replacing the full nested array', () => {
        const content = {
            faq: {
                items: [
                    { question: 'Question 1', answer: 'Base answer 1' },
                    { question: 'Question 2', answer: 'Base answer 2' },
                ],
            },
            publicLaunch: {
                faq: {
                    items: [
                        {},
                        { answer: 'Launch answer 2' },
                    ],
                },
            },
        };

        expect(resolvePublicLaunchContent(content)).toEqual({
            faq: {
                items: [
                    { question: 'Question 1', answer: 'Base answer 1' },
                    { question: 'Question 2', answer: 'Launch answer 2' },
                ],
            },
        });
    });
});
