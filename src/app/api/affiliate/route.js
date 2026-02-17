import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, website, audience, promotion, motivation } = body;

        if (!firstName || !lastName || !email) {
            return NextResponse.json(
                { error: 'Missing required fields: firstName, lastName, email' },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service not configured' },
                { status: 500 }
            );
        }

        // Send team notification email
        const teamEmailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Scaliente <noreply@scaliente.com>',
                to: ['contact@scaliente.com'],
                subject: `New Affiliate Application: ${firstName} ${lastName}`,
                html: `
                    <h2>New Affiliate Application</h2>
                    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Website</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${website || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Audience</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${audience || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Promotion Strategy</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${promotion || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold;">Motivation</td><td style="padding: 8px;">${motivation || 'N/A'}</td></tr>
                    </table>
                `,
            }),
        });

        if (!teamEmailRes.ok) {
            const err = await teamEmailRes.text();
            console.error('Failed to send team notification:', err);
            return NextResponse.json(
                { error: 'Failed to send notification' },
                { status: 500 }
            );
        }

        // Send confirmation email to applicant
        const confirmRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Scaliente <noreply@scaliente.com>',
                to: [email],
                subject: 'Scaliente Partner Program - Application Received',
                html: `
                    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                        <h2 style="color: #111;">Thank you for your application, ${firstName}!</h2>
                        <p style="color: #555; line-height: 1.6;">
                            We have received your application for the Scaliente Partner Program. Our team will review it and get back to you within 48 hours.
                        </p>
                        <p style="color: #555; line-height: 1.6;">
                            As a reminder, the Scaliente Partner Program offers:
                        </p>
                        <ul style="color: #555; line-height: 1.8;">
                            <li><strong>15% lifetime commission</strong> on all referral payments</li>
                            <li><strong>50% discount</strong> for your referrals on their first month</li>
                            <li><strong>Monthly PayPal payouts</strong> (minimum 50 euros)</li>
                        </ul>
                        <p style="color: #555; line-height: 1.6;">
                            If you have any questions, feel free to reply to this email.
                        </p>
                        <p style="color: #999; font-size: 12px; margin-top: 32px;">
                            &mdash; The Scaliente Team
                        </p>
                    </div>
                `,
            }),
        });

        if (!confirmRes.ok) {
            const err = await confirmRes.text();
            console.error('Failed to send confirmation email:', err);
            // Team was notified, so still return success
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Affiliate form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
