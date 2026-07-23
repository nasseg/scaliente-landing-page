import { POST } from '@/app/api/affiliate/route';

jest.mock('next/server', () => ({
    NextResponse: {
        json: (body, options = {}) => ({ status: options.status || 200, json: async () => body }),
    },
}));

jest.mock('@/lib/rate-limit', () => ({
    affiliateLimiter: { check: jest.fn(() => true) },
}));

const application = {
    firstName: 'Nora',
    lastName: 'Seller',
    email: 'nora@example.com',
    website: 'https://example.com',
    promotion: 'Newsletter',
    lang: 'fr',
};

function request(body = application) {
    return {
        headers: { get: jest.fn(() => '127.0.0.1') },
        json: jest.fn(async () => body),
    };
}

beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key';
    global.fetch = jest.fn(async () => ({ ok: true, text: async () => '' }));
});

afterEach(() => {
    delete process.env.RESEND_API_KEY;
    jest.restoreAllMocks();
});

test('uses stable, role-specific idempotency keys for both side effects', async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    const teamKey = global.fetch.mock.calls[0][1].headers['Idempotency-Key'];
    const confirmationKey = global.fetch.mock.calls[1][1].headers['Idempotency-Key'];
    expect(teamKey).toMatch(/^affiliate-team-/);
    expect(confirmationKey).toMatch(/^affiliate-confirmation-/);
    expect(teamKey).not.toBe(confirmationKey);
});

test('returns a retryable failure when confirmation fails after team notification', async () => {
    global.fetch
        .mockResolvedValueOnce({ ok: true, text: async () => '' })
        .mockResolvedValueOnce({ ok: false, text: async () => 'temporary failure' });

    const first = await POST(request());
    expect(first.status).toBe(502);
    const firstKeys = global.fetch.mock.calls.map(([, options]) => options.headers['Idempotency-Key']);

    global.fetch.mockClear();
    global.fetch.mockResolvedValue({ ok: true, text: async () => '' });
    const retry = await POST(request());
    expect(retry.status).toBe(200);
    const retryKeys = global.fetch.mock.calls.map(([, options]) => options.headers['Idempotency-Key']);
    expect(retryKeys).toEqual(firstKeys);
});
