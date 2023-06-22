import { Strategy } from "passport-local"
import passport from "passport"

import prisma from '@/libs/prisma'

const validatePassword = (inputPassword: string, userPassword: string) => inputPassword == userPassword ? true : false

passport.use(new Strategy(
    async function (email, password, done) {
        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) return done('Unable to find user.')

        if (!validatePassword(password, user.password)) return done('Invalid user credentials.')

        return done('Unable to authenticate.')
    }
))