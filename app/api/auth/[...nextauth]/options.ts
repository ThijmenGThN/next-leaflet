import providers from './providers'

import type { NextAuthOptions } from 'next-auth'

const options: NextAuthOptions = {
    providers,
    pages: {
        signIn: '/login'
    }
}

export default options