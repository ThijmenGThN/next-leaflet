
export { default } from 'next-auth/middleware'

// -- FIREWALL: The below matcher ensures the provided routes are protected.
export const config = {
    matcher: [
        '/examples/:path*'
    ]
}
