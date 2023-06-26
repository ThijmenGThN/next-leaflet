import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import { setTimeout } from "timers/promises"

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

    const response = NextResponse.next()
    const match = (url: string) => req.nextUrl.pathname.startsWith(url)

    try {

        if (match('/login') || match('/register')) response.cookies.delete('sessionToken')

        if (match('/dash')) {
            const { value: sessionToken } = req.cookies.get('sessionToken') ?? { value: '' }

            if (!await verifySession(sessionToken)) throw 'Session has expired, authentication required.'
        }

    }

    catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return response
}

async function verifySession(token: string) {

    try {
        if (!process.env.JWT_SECRET) throw 'Something went wrong, try again later.'

        const secret = new TextEncoder()
            .encode(process.env.JWT_SECRET)

        return await jwtVerify(token, secret)
    }

    catch (error) { throw 'Unable to validate session.' }
}