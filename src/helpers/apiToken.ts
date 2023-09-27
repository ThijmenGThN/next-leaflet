
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextRequest } from "next/server"

import prisma from '@/prisma/client'

export async function getApiToken({ req }: { req: NextRequest }) {

    if (!process.env.NEXTAUTH_SECRET) return

    const bearerToken = req.headers.get('authorization')?.split(' ')[1]
    if (!bearerToken) return

    const { name, owner, token } = jwt.verify(bearerToken, process.env.NEXTAUTH_SECRET) as { name: string, owner: string, token: string }

    const { token: hashToken } = await prisma.apiToken.findFirstOrThrow({ where: { name, owner } })

    if (!await bcrypt.compare(token, hashToken)) return

    return { name, owner, token }

}
