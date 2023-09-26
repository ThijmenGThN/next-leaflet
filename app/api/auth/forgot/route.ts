import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import { vTypes } from '@/helpers/validation'

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eReset from '@/emails/Reset'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    const { email } = await req.json()

    if (!vTypes.email.safeParse(email).success) return NextResponse.json('The provided email does not meet the criteria of an email address.', { status: 400 })

    const passwordResetToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '45m' })

    await prisma.user.update({ where: { email }, data: { passwordResetToken } })

    Email(
        eReset({
            email,
            link: process.env.NEXTAUTH_URL + '/forgot/' + passwordResetToken,
            assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
        }),
        {
            to: email,
            subject: 'Reset your password'
        }
    )

    return NextResponse.json('We have sent you an email to reset your password.', { status: 200 })

}
