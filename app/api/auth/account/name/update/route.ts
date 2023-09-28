import prisma from '@/prisma/client'
import { getToken } from "next-auth/jwt"
import { vTypes } from "@/helpers/validation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

    try {
        const session = await getToken({ req })

        if (!session) return NextResponse.json('You are not authorized to perform this action.', { status: 401 })

        const { name } = await req.json()

        if (!vTypes.name.safeParse(name).success) return NextResponse.json('The provided name does not meet the criteria.', { status: 400 })

        await prisma.user.update({
            where: { email: session.email },
            data: { name }
        })

        return NextResponse.json('Name of the user has succesfully been updated.', { status: 200 })
    }

    catch {
        return NextResponse.json('Internal server error, try again later.', { status: 500 })
    }

}
