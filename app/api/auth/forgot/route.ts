import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eReset from '@/emails/Reset'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const { email } = await req.json()

        if (!z.string()
            .min(2, { message: "This email address is too short" })
            .max(64, { message: "This email address is too long" })
            .email("This email address is not valid")
            .safeParse(email).success
        ) return NextResponse.json('The provided email does not meet the criteria of an email address.', { status: 400 })

        const passwordResetToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '45m' })

        await prisma.user.update({ where: { email }, data: { passwordResetToken } })

        Email(
            eReset({
                email,
                link: process.env.NEXTAUTH_URL + '/en/forgot/' + passwordResetToken,
                assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
            }),
            {
                to: email,
                subject: 'Reset your password'
            }
        )

        return NextResponse.json('We have sent you an email to reset your password.', { status: 200 })
    }

    catch {
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }

}
