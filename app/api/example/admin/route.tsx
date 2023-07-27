import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import options from "@/auth/options"

import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {

    const session = await getServerSession(options)

    return NextResponse.json({
        user: session
    })
}
