import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eRegister from '@/emails/Register'

import { vTypes } from '@/helpers/validation'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    const { email } = await req.json()

    if (!vTypes.email.safeParse(email).success) return NextResponse.json('The provided email does not meet the criteria of an email address.', { status: 400 })
    if (await prisma.user.findUnique({ where: { email } })) return NextResponse.json('The provided email address is already taken.', { status: 403 })

    const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })

    Email(
        eRegister({
            email,
            link: process.env.NEXTAUTH_URL + '/register/' + token,
            assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
        }),
        {
            to: email,
            subject: 'Complete your registration'
        }
    )

    return NextResponse.json('We have sent you an email to complete your registration.', { status: 200 })

}
