const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = 'Scaliente <noreply@scaliente.com>';
const CONTACT_EMAIL = 'contact@scaliente.com';

export async function sendEmail({ to, subject, html }) {
    if (!RESEND_API_KEY) {
        console.warn('[email] RESEND_API_KEY not configured, skipping email');
        return { success: false, error: 'Email not configured' };
    }

    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
        });

        if (!res.ok) {
            const error = await res.text();
            console.error('[email] Send failed:', error);
            return { success: false, error };
        }

        return { success: true };
    } catch (error) {
        console.error('[email] Error:', error);
        return { success: false, error: error.message };
    }
}

export async function sendLeadMagnet(email, pdfUrl) {
    return sendEmail({
        to: email,
        subject: 'Votre Checklist Profit Shopify - Scaliente',
        html: `
            <h2>Votre checklist est pr\u00eate !</h2>
            <p>Merci pour votre int\u00e9r\u00eat. T\u00e9l\u00e9chargez votre checklist ici :</p>
            <a href="${pdfUrl}" style="display:inline-block;padding:12px 24px;background:#f97316;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">T\u00e9l\u00e9charger la checklist</a>
            <p style="margin-top:24px;color:#666;">\u2014 L\u2019\u00e9quipe Scaliente</p>
        `,
    });
}

export async function sendAffiliateApplication(data) {
    const { name, email, website, audience, message } = data;

    // Notify Scaliente team
    await sendEmail({
        to: CONTACT_EMAIL,
        subject: `Nouvelle candidature affili\u00e9: ${name}`,
        html: `
            <h2>Nouvelle candidature affili\u00e9</h2>
            <ul>
                <li><strong>Nom:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Site:</strong> ${website || 'Non renseign\u00e9'}</li>
                <li><strong>Audience:</strong> ${audience || 'Non renseign\u00e9'}</li>
                <li><strong>Message:</strong> ${message || 'Aucun'}</li>
            </ul>
        `,
    });

    // Confirmation to applicant
    return sendEmail({
        to: email,
        subject: 'Candidature affili\u00e9 re\u00e7ue - Scaliente',
        html: `
            <h2>Merci ${name} !</h2>
            <p>Nous avons bien re\u00e7u votre candidature au programme d\u2019affiliation Scaliente.</p>
            <p>Notre \u00e9quipe reviendra vers vous sous 48h.</p>
            <p style="margin-top:24px;color:#666;">\u2014 L\u2019\u00e9quipe Scaliente</p>
        `,
    });
}
