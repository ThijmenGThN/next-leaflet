import bcrypt from 'bcrypt'

import Credentials from 'next-auth/providers/credentials'

import prisma from '@/prisma/client'
import { isErrored } from 'stream'

export default [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "E-mail", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            if (!credentials || !credentials.email) throw new Error('Invalid credentials.')

            const user = await prisma.user.findUnique({ where: { email: credentials.email } })

            if (!user || !user.password) throw new Error('Invalid credentials.')

            if (!await bcrypt.compare(credentials.password, user.password)) throw 'Invalid credentials.'

            return {
                ...user,
                name: user.first_name + " " + user.last_name
            }
        }
    })
]
