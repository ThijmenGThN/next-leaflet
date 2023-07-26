"use server"

import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import options from "@/auth/options"

export async function account({ name }: { name: string }) {
    const session = await getServerSession(options)

    const email = session?.user.email

    if (!email) throw new Error('Invalid session.')

    await prisma.user.update({
        where: { email },
        data: {
            name
        }
    })
}
