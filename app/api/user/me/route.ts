import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prisma'

export async function GET(req: Request) {

    try {

        const { value: sessionToken } = cookies().get('sessionToken') ?? { value: '' }

        const payload: any = jwt.decode(sessionToken)

        if (!payload?.email) throw { xerr: 'Session has expired, authentication required.', status: 401 }

        const user = await prisma.user.findFirst({ where: { email: payload.email } })
        if (!user) throw { xerr: 'A user with this email address does not exist.', status: 404 }

        return NextResponse.json(
            {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            { status: 200 }
        )
    }

    catch (error: any) {
        !error.xerr && console.error(error)
        return NextResponse.json(
            error.xerr
                ? error.xerr
                : 'Something went wrong, try again later.',
            { status: error.status ?? 500 }
        )
    }
}
