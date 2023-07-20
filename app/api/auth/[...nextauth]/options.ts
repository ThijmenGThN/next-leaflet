import providers from './providers'

import type { NextAuthOptions } from 'next-auth'

const options: NextAuthOptions = {
    providers,
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login'
    }
}

export default options