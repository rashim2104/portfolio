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
  HTML: 60 * 60, // 1 hour
  API: 60 * 5, // 5 minutes
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Set security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')

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
    // HTML pages - medium cache
    response.headers.set(
      'Cache-Control',
      `public, max-age=${CACHE_DURATION.HTML}, must-revalidate`
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