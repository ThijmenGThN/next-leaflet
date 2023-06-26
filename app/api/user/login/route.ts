import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { setTimeout } from "timers/promises"

import prisma from '@/libs/prisma'

import locale from '@/locale/globals.json'

export async function POST(req: Request) {

    await setTimeout(500)

    try {
        const encoded = req.headers.get('Authorization')?.replace(/^Basic\s+/i, '') ?? ''
        const decoded = Buffer.from(encoded, 'base64').toString()
        const [email, password] = decoded.split(':')

        if (!email || email == '') throw { xerr: locale.auth.exceptions.missingEmail, status: 400 }
        if (!password || password == '') throw { xerr: locale.auth.exceptions.missingPassword, status: 400 }

        const user = await prisma.user.findFirst({ where: { email } })
        if (!user) throw { xerr: locale.auth.exceptions.unknownUser, status: 404 }

        if (!bcrypt.compareSync(password, user.password)) throw { xerr: locale.auth.exceptions.invalidCredentials, status: 403 }

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
                : locale.exceptions.system,
            { status: error.status ?? 500 }
        )
    }
}