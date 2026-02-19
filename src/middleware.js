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
    } catch (e) {
        return defaultLocale;
    }
}

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // Block dev-only tools in production (record-animation, frame-picker, convert-video)
    const isDevTool = pathname.includes('/record-animation') ||
        pathname === '/frame-picker.html' ||
        pathname.startsWith('/api/convert-video');

    if (isDevTool && process.env.NODE_ENV === 'production') {
        return new NextResponse(null, { status: 404 });
    }

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /fr/products
    return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|favicon.ico|.*\\..*).*)',
        // Dev tools — matched so middleware can block in production
        '/frame-picker.html',
        '/api/convert-video',
    ],
};
