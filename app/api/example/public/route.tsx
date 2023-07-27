import { NextResponse } from "next/server"

import prisma from '@/prisma/client'

import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    return NextResponse.json({
        userCount: await prisma.user.count()
    })
}
