import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

import type { NextRequest } from 'next/server'

const locales = ['en', 'nl']
const publicPages = [
    '/',
    '/login',
    '/register',
    '/forgot'
]

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'en'
})

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req)
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null
        },
        pages: {
            signIn: '/login'
        }
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    )
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

    return isPublicPage ? intlMiddleware(req) : (authMiddleware as any)(req)
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}
