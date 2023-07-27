import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

export async function GET(req: NextRequest) {

    if (!process.env.NEXTAUTH_SECRET) return NextResponse.json('An internal error occurred, try again later.', { status: 500 })

    const token = req.headers.get('authorization')?.split(' ')[1]

    if (!token) return NextResponse.json('An authorization bearer token is required.', { status: 400 })

    try {
        const session = jwt.verify(token, process.env.NEXTAUTH_SECRET)

        return NextResponse.json({
            userCount: await prisma.user.count()
        }, { status: 200 })
    }
    catch (_) { return NextResponse.json('The authorization bearer token provided is either invalid or has expired.', { status: 401 }) }
}
