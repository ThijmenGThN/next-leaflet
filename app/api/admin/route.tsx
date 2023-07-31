import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server"

import prisma from '@/prisma/client'

export async function GET(req: NextRequest) {
    try {
        if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

        const bearerToken = req.headers.get('authorization')?.split(' ')[1]
        if (!bearerToken) return NextResponse.json('An authorization bearer token is required.', { status: 400 })

        const { name, owner }: any = jwt.verify(bearerToken, process.env.NEXTAUTH_SECRET)

        const { token: apiToken } = await prisma.apiToken.findUniqueOrThrow({ where: { name, owner } })

        if (!await bcrypt.compare(bearerToken, apiToken)) throw new Error("The provided API token does not match with our records.")
    }
    catch (_) { return NextResponse.json('The authorization bearer token provided has expired.', { status: 401 }) }

    return NextResponse.json({
        userCount: await prisma.user.count()
    }, { status: 200 })
}
