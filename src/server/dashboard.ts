"use server"

import z from 'zod'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"

import prisma from '@/prisma/client'
import options from "@/auth/options"

const vName = z.string().min(2, { message: 'This name is too short.' }).max(32, { message: 'This name is too long.' })

export async function updateAccount({ name }: { name: string }) {
    const session = await getServerSession(options)

    if (!session || !session?.user.email) throw new Error('Invalid session.')

    await prisma.user.update({
        where: { email: session?.user.email },
        data: { name }
    })
}

export async function createToken({ name }: { name: string }) {
    const session = await getServerSession(options)

    if (!vName.safeParse(name).success) throw new Error('The "name" attribute does not meet the requirements.')
    if (!session) throw new Error('This session is invalid, it might have expired.')
    if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

    if (await prisma.apiToken.findFirst({ where: { name, owner: session.user.email } })) throw new Error('An API token with the same name has already been generated.')
    if (await prisma.apiToken.count({ where: { owner: session.user.email } }) >= 25) throw new Error('You have reached the maximum limit for API tokens.')

    const token = crypto.randomBytes(20).toString()

    await prisma.apiToken.create({
        data: {
            name,
            token: await bcrypt.hash(token, 12),
            owner: session.user.email
        }
    })

    return jwt.sign({ name, owner: session.user.email, token }, process.env.NEXTAUTH_SECRET)
}

export async function deleteToken({ id }: { id: string }) {
    const session = await getServerSession(options)

    if (!session) throw new Error('This session is invalid, it might have expired.')
    if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

    await prisma.apiToken.delete({ where: { id, owner: session.user.email } })
}
