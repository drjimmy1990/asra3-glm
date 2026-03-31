import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'ar'];
const DEFAULT_LOCALE = 'ar'; // Arabic is the default

/**
 * Detects whether the request is for a "public" page that needs locale handling.
 * Admin, API, and static file requests are ignored.
 */
function isPublicRoute(pathname: string): boolean {
  return (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/uploads') &&
    !pathname.includes('.')
  );
}

/**
 * Detects the preferred locale from:
 * 1. Cookie (returning user preference)
 * 2. Accept-Language browser header
 * 3. Fallback: English
 */
function detectLocale(request: NextRequest): string {
  // 1. Check cookie first (returning visitor)
  const cookieLocale = request.cookies.get('asra3-locale')?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header (first-time visitor)
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (preferredLang === 'en') {
    return 'en';
  }

  // 3. Default to Arabic for all other languages
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-public routes
  if (!isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check if the URL already starts with a valid locale
  const pathnameLocale = LOCALES.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameLocale) {
    // Already has a valid locale prefix — keep going, but store the preference in cookie
    const response = NextResponse.next();
    response.cookies.set('asra3-locale', pathnameLocale, {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      path: '/',
    });
    return response;
  }

  // No locale prefix found — detect and redirect
  const detectedLocale = detectLocale(request);
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(newUrl, 307);
  response.cookies.set('asra3-locale', detectedLocale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  });
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon|logo|robots.txt|sitemap.xml|uploads).*)',
  ],
};
