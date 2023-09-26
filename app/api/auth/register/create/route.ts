import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

import validate from '@/helpers/validation'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    const { name, email, password, token } = await req.json()

    if (!validate.objects.user.safeParse({ name, email, password }).success) return NextResponse.json('The provided user details do not meet the criteria.', { status: 400 })
    jwt.verify(token, process.env.NEXTAUTH_SECRET, (err: any) => {
        if (err) return NextResponse.json('The provided token has expired.', { status: 401 })
    })

    await prisma.user.create({
        data: {
            name, email,
            password: await bcrypt.hash(password, 12)
        }
    })

    return NextResponse.json('A new account has succesfully been registered.', { status: 200 })

}
