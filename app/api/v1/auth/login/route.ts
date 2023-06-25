import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { setTimeout } from "timers/promises"

import prisma from '@/libs/prisma'

export async function POST(req: Request) {

    await setTimeout(500)

    try {
        const encoded = req.headers.get('Authorization')?.replace(/^Basic\s+/i, '') ?? ''
        const decoded = Buffer.from(encoded, 'base64').toString()
        const [email, password] = decoded.split(':')

        if (!email || email == '') throw { xerr: 'An email address must be provided.', status: 400 }
        if (!password || password == '') throw { xerr: 'A password must be provided.', status: 400 }

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) throw { xerr: 'Unable to login, try again later.', status: 400 }

        return NextResponse.json(
            {
                profile: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                },
                session: {
                    token: jwt.sign({
                        email: user.email,
                        hashPass: user.password,
                        expiresIn: process.env.JWT_EXPIRY ?? '45m'
                    }, process.env.JWT_SECRET ?? '7200')
                }
            },
            { status: 200 })
    }

    catch (error: any) {
        console.error(error)
        return NextResponse.json(
            error.xerr
                ? error.xerr
                : 'Something went wrong, try again later.',
            { status: error.status ?? 500 }
        )
    }
}
