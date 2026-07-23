import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['fr', 'en', 'de'];
const defaultLocale = 'fr';

function getLocale(request) {
    const negotiatorHeaders = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    try {
        return match(languages, locales, defaultLocale);
    } catch {
        return defaultLocale;
    }
}

export function proxy(request) {
    const { pathname } = request.nextUrl;

    const isDevTool = pathname.includes('/record-animation') ||
        pathname === '/frame-picker.html' ||
        pathname.startsWith('/api/convert-video');

    if (isDevTool && process.env.NODE_ENV === 'production') {
        return new NextResponse(null, { status: 404 });
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|.*\\..*).*)',
        '/frame-picker.html',
        '/api/convert-video',
    ],
};
