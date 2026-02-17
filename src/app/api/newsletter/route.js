import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, source } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json({ error: 'Service not configured' }, { status: 500 });
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Scaliente <noreply@scaliente.com>',
                to: ['contact@scaliente.com'],
                subject: `New Newsletter Subscriber: ${email}`,
                html: `
                    <h2>New Newsletter Subscriber</h2>
                    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                        <tr>
                            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Source</td>
                            <td style="padding: 8px; border-bottom: 1px solid #eee;">${source || 'unknown'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; font-weight: bold;">Date</td>
                            <td style="padding: 8px;">${new Date().toISOString()}</td>
                        </tr>
                    </table>
                `,
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('Resend error:', err);
            return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Newsletter error:', error);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
