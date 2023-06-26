import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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

        if (await prisma.user.findFirst({ where: { email } })) throw { xerr: 'A user with this email address already exists.', status: 403 }

        const { first_name, last_name } = await req.json()

        const user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 12),
                first_name,
                last_name
            }
        })

        const response = NextResponse.json(
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            { status: 200 }
        )

        response.cookies.set('sessionToken', jwt.sign({
            email: user.email,
            hashPass: user.password,
            expiresIn: process.env.JWT_EXPIRY ?? '45m'
        }, process.env.JWT_SECRET ?? '7200'))

        return response
    }

    catch (error: any) {
        !error.xerr && console.error(error)
        return NextResponse.json(
            error.xerr
                ? error.xerr
                : 'Something went wrong, try again later.',
            { status: error.status ?? 500 }
        )
    }
}
