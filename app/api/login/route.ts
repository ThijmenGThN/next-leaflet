import Prisma from '@/libs/prisma'
import * as bcrypt from 'bcrypt'

interface iRequest {
    email: string
    password: string
}

export async function POST(req: Request) {
    const body: iRequest = await req.json()

    const user = await Prisma.user.findFirst({ where: { email: body.email } })

    if (!user) return new Response('Unable to find user.')
    if (!await bcrypt.compare(body.password, user.password)) return new Response('Unable to authenticate, incorrect user credentials.')

    const { id, password, ...profile } = user

    return new Response(JSON.stringify(profile))
}