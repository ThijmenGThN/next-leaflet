import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from "@/resources/libs/prisma"

interface iUser {
    email: string
    password: string
    first_name?: string
    last_name?: string
}

const createToken = (email: string, hash: string) => {

    try {
        if (
            !process.env.JWT_SECRET ||
            !process.env.JWT_EXPIRY
        ) throw new Error('An error has occurred: JWT env variables have not been set.')

        return jwt.sign({
            email, hash,
            exp: Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRY, 12)
        }, process.env.JWT_SECRET)
    }

    catch (error) {
        console.error(error)
        throw new Error(`An error has occurred: ${error}.`)
    }
}

export async function login(email: string, password: string) {

    try {

        // -- FETCH: Obtain user by email from database.
        const user = await prisma.user.findFirst({ where: { email } })
        if (!user) throw new Error('Unable to find user.')

        const { password: hash, ...profile } = user

        if (await bcrypt.compare(password, hash)) return {
            profile,
            jwt: createToken(email, hash)
        }

    }

    catch (error) {
        console.error(error)
        throw new Error(`An error has occurred: ${error}.`)
    }
}

export async function register(user: iUser) {

    try {
        // -- CREATE: Insert new user into database.
        const { password, ...profile } = await prisma.user.create({
            data: {
                ...user,
                password: bcrypt.hashSync(user.password, 12)
            }
        })

        return { profile, jwt: createToken(user.email, password) }
    }

    catch (error) {
        console.error(error)
        throw new Error(`An error has occurred: ${error}.`)
    }
}

export async function profile() {

    try {
        // -- FETCH: Obtain user by email from database.
        const user = await prisma.user.findFirst({ where: { email: 'thijmen@heuve.link' } })
        if (!user) throw new Error('Unable to find user.')

        return user
    }

    catch (error) {
        console.error(error)
        throw new Error(`An error has occurred: ${error}.`)
    }
}