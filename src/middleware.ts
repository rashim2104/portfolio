import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of static assets that should be cached
const STATIC_ASSETS = [
  '/images/',
  '/favicon_io/',
  '/fonts/',
  '.css',
  '.js',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
]

// Cache duration in seconds
const CACHE_DURATION = {
  STATIC: 60 * 60 * 24 * 7, // 1 week
  HTML: 60 * 60, // 1 hour at the CDN
  HTML_STALE: 60 * 60 * 24, // served stale for a day while revalidating
  API: 60 * 5, // 5 minutes
}

// Security headers are set once in next.config.mjs for /:path*, so this
// middleware only owns caching.
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Set caching headers based on the type of content
  if (STATIC_ASSETS.some(asset => pathname.includes(asset))) {
    // Static assets - long cache
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION.STATIC}, immutable`
    )
  } else if (pathname.startsWith('/api/')) {
    // API routes - short cache
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION.API}, must-revalidate`
    )
  } else {
    // HTML pages - cached at the CDN, never in the browser. max-age=0 keeps a
    // repeat visitor from sitting on an hour-old copy of a page that has since
    // been republished; s-maxage keeps the CDN hit rate unchanged.
    response.headers.set(
      'Cache-Control',
      `public, max-age=0, s-maxage=${CACHE_DURATION.HTML}, stale-while-revalidate=${CACHE_DURATION.HTML_STALE}`
    )
  }

  return response
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
