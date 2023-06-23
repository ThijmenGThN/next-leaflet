import bcrypt from 'bcrypt'

import prisma from "@/helpers/prisma"

interface iProfile {
    email: string
    first_name?: string
    last_name?: string
}

export async function login(email: string, password: string) {

    // -- FETCH: Get target from database.
    const user = await prisma.user.findFirst({ where: { email } })

    // -- CHECK: Does the user exist?
    if (!user) return 'Unable to find user.'

    // -- VALIDATE: Does the password hash from the database match with the plain text password?
    const valid = await bcrypt.compare(password, user.password)

    // -- RESOLVE: Passwords matched, return user profile.
    if (valid) return { email: user.email }

    // -- FALLBACK: Checks did not succeed.
    return 'Unable to authenticate.'
}

export async function register(profile: iProfile, password: string) {

    // -- ENCRYPT: Converts plain text password to a hash.
    const hash = bcrypt.hashSync(password, 12)

    // -- INJECT: Insert new user into database.
    try {
        const user = await prisma.user.create({
            data: {
                password: hash,
                ...profile
            }
        })

        return { email: user.email }
    }

    catch (error) {
        console.error(error)
        return 'Unable to register user due to an internal error.'
    }

}