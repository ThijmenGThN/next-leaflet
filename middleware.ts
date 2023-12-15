
// -- internationalization --

import createMiddleware from 'next-intl/middleware'

export const locales = ['en', 'nl']

export default createMiddleware({ locales, defaultLocale: 'en', localePrefix: 'as-needed' })

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
