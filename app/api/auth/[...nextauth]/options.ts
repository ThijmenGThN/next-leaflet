import prisma from '@/prisma/client'

import providers from './providers'

import type { Roles } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'

declare module 'next-auth/jwt' {
    interface JWT {
        name: string
        email: string
        role: Roles
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            name: string
            email: string
            role: Roles
        }
    }
}

const options: NextAuthOptions = {
    providers,
    callbacks: {
        async jwt({ token }) {
            if (!token.email) return token

            const dbUser = await prisma.user.findUnique({ where: { email: token.email } })
            if (!dbUser) return token

            return {
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role
            }
        },
        async session({ session, token }) {
            if (!token) return session

            session.user.role = token.role

            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login'
    }
}

export default options