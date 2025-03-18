
import { routing } from '@/locales/routing'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware(routing)

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)'
}
