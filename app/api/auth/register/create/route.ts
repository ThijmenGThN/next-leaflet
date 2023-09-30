import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

export async function POST(req: NextRequest) {

    if (!(
        process.env.NEXTAUTH_URL &&
        process.env.NEXTAUTH_SECRET
    )) return NextResponse.json('Internal server error.', { status: 500 })

    try {
        const { name, password, token } = await req.json()

        if (!(
            z.object({
                name: z.string()
                    .min(2, { message: "This name is too short" })
                    .max(32, { message: "This name is too long" })
            }).safeParse({ name }).success &&
            z.object({
                password: z.string()
                    .min(8, { message: "This password is too short" })
                    .max(64, { message: "This password is too long" })
            }).safeParse({ password }).success
        )) return NextResponse.json('The provided user details do not meet the criteria.', { status: 400 })

        let email
        jwt.verify(token, process.env.NEXTAUTH_SECRET, (err: any, decoded: any) => {
            if (err) return NextResponse.json('The provided token has expired.', { status: 401 })
            email = decoded.email
        })

        if (!email) return NextResponse.json('The provided token has expired.', { status: 401 })

        await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 12)
            }
        })

        return NextResponse.json('A new account has succesfully been registered.', { status: 200 })
    }

    catch {
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }

}
