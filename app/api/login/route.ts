import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { login } from '@/helpers/auth'

export async function POST(req: Request) {

    try {

        // -- OBTAIN: Converts base64 auth string to email and password.
        const encoded = req.headers.get('Authorization')?.replace(/^Basic\s+/i, '') ?? ''
        const decoded = Buffer.from(encoded, 'base64').toString()
        const [email, password] = decoded.split(':')

        // -- AUTH: Attempt to authenticate with supplied email and password.
        const user = await login(email, password)

        if (!user) throw new Error("Unable to find user.")

        cookies().set({
            name: 'accessToken',
            value: user.jwt,
        })

        return NextResponse.json(user, { status: 200 })
    }

    catch (error) {
        console.error(error)
        return NextResponse.json('Unable to authenticate due to an internal error.', { status: 500 })
    }
}
