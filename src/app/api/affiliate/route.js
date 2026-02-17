import { NextResponse } from 'next/server';

const CONFIRMATION_COPY = {
    fr: {
        subject: 'Programme Partenaire Scaliente - Candidature re\u00e7ue',
        greeting: (name) => `Merci pour votre candidature, ${name}\u00a0!`,
        body: 'Nous avons bien re\u00e7u votre candidature pour le Programme Partenaire Scaliente. Notre \u00e9quipe l\u2019examinera et vous recontactera sous 48 heures.',
        reminder: 'Pour rappel, le Programme Partenaire Scaliente offre\u00a0:',
        benefits: [
            '<strong>15% de commission \u00e0 vie</strong> sur tous les paiements de vos filleuls',
            '<strong>50% de r\u00e9duction</strong> pour vos filleuls sur leur premier mois',
            '<strong>Cookie de 90 jours</strong> pour le suivi des conversions',
            '<strong>Paiements mensuels PayPal</strong> (minimum 50\u00a0\u20ac)',
        ],
        questions: 'Si vous avez des questions, n\u2019h\u00e9sitez pas \u00e0 r\u00e9pondre \u00e0 cet email.',
        sign: 'L\u2019\u00e9quipe Scaliente',
    },
    en: {
        subject: 'Scaliente Partner Program - Application Received',
        greeting: (name) => `Thank you for your application, ${name}!`,
        body: 'We have received your application for the Scaliente Partner Program. Our team will review it and get back to you within 48 hours.',
        reminder: 'As a reminder, the Scaliente Partner Program offers:',
        benefits: [
            '<strong>15% lifetime commission</strong> on all referral payments',
            '<strong>50% discount</strong> for your referrals on their first month',
            '<strong>90-day cookie</strong> tracking window',
            '<strong>Monthly PayPal payouts</strong> (minimum \u20ac50)',
        ],
        questions: 'If you have any questions, feel free to reply to this email.',
        sign: 'The Scaliente Team',
    },
    de: {
        subject: 'Scaliente Partnerprogramm - Bewerbung eingegangen',
        greeting: (name) => `Vielen Dank f\u00fcr Ihre Bewerbung, ${name}!`,
        body: 'Wir haben Ihre Bewerbung f\u00fcr das Scaliente Partnerprogramm erhalten. Unser Team wird sie pr\u00fcfen und sich innerhalb von 48 Stunden bei Ihnen melden.',
        reminder: 'Zur Erinnerung \u2013 das Scaliente Partnerprogramm bietet:',
        benefits: [
            '<strong>15% lebenslange Provision</strong> auf alle Zahlungen Ihrer Empfehlungen',
            '<strong>50% Rabatt</strong> f\u00fcr Ihre Empfehlungen im ersten Monat',
            '<strong>90-Tage-Cookie</strong> f\u00fcr die Conversion-Verfolgung',
            '<strong>Monatliche PayPal-Auszahlungen</strong> (Minimum 50\u00a0\u20ac)',
        ],
        questions: 'Bei Fragen antworten Sie einfach auf diese E-Mail.',
        sign: 'Das Scaliente Team',
    },
};

function buildConfirmationHtml(lang, firstName) {
    const copy = CONFIRMATION_COPY[lang] || CONFIRMATION_COPY.en;
    const benefitsHtml = copy.benefits.map((b) => `<li style="padding:4px 0;">${b}</li>`).join('');

    return `
<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f7f7f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f7f8;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">

<!-- Header with gradient -->
<tr><td style="background:linear-gradient(135deg,#f97316,#f59e0b);padding:32px 40px;text-align:center;">
    <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Scaliente</h1>
    <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.85);letter-spacing:0.5px;">Partner Program</p>
</td></tr>

<!-- Body -->
<tr><td style="padding:40px;">
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111;">${copy.greeting(firstName)}</h2>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#555;">${copy.body}</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#555;">${copy.reminder}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;background-color:#fff8f1;border-radius:8px;border:1px solid #fed7aa;">
    <tr><td style="padding:16px 20px;">
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:2;color:#444;">${benefitsHtml}</ul>
    </td></tr>
    </table>

    <p style="margin:0;font-size:15px;line-height:1.7;color:#555;">${copy.questions}</p>
</td></tr>

<!-- Footer -->
<tr><td style="padding:24px 40px;border-top:1px solid #eee;text-align:center;">
    <p style="margin:0;font-size:13px;color:#999;">&mdash; ${copy.sign}</p>
    <p style="margin:8px 0 0;font-size:12px;color:#bbb;">scaliente.com</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, website, promotion, lang } = body;

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

        const safeLang = ['fr', 'en', 'de'].includes(lang) ? lang : 'en';

        // Send team notification email
        const teamEmailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Scaliente <noreply@scaliente.com>',
                to: ['contact@scaliente.com', 'scalientesolutions@gmail.com'],
                subject: `New Affiliate Application: ${firstName} ${lastName}`,
                html: `
                    <h2>New Affiliate Application</h2>
                    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Website / Channel</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${website || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Promotion Strategy</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${promotion || 'N/A'}</td></tr>
                        <tr><td style="padding: 8px; font-weight: bold;">Language</td><td style="padding: 8px;">${safeLang.toUpperCase()}</td></tr>
                    </table>
                    <p style="color: #999; font-size: 12px; margin-top: 16px;">Sent from scaliente.com affiliate form</p>
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

        // Send branded confirmation email to applicant in their language
        const copy = CONFIRMATION_COPY[safeLang] || CONFIRMATION_COPY.en;
        const confirmRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Scaliente <noreply@scaliente.com>',
                to: [email],
                subject: copy.subject,
                html: buildConfirmationHtml(safeLang, firstName),
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
