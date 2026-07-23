const inboxPublicValue = process.env.NEXT_PUBLIC_INBOX_PUBLIC;

/**
 * The new landing page and AI Inbox are scheduled to launch together, so the
 * public state is the safe default. Set the flag to "false" only on a preview
 * deployment that must keep the pre-launch beta presentation.
 */
export const INBOX_PUBLIC = inboxPublicValue !== 'false';
