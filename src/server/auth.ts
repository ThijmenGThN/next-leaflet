"use server"

import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import eReset from '@/emails/Reset'
import eRegister from '@/emails/Register'

interface iUser {
    name: string
    email: string
    password: string
}

const vPassword = z.string().min(8, { message: 'This password is too short.' }).max(128, { message: 'This password is too long.' })

const vUser = z.object({
    name: z.string().min(2, { message: 'This name is too short.' }).max(32, { message: 'This name is too long.' }),
    email: z.string().min(2, { message: 'This email address is too short.' }).max(64, { message: 'This email address is too long.' }).email('This email address is not valid.'),
    password: vPassword
})

export async function reset(email: string) {
    try {
        if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) throw new Error('Missing NEXTAUTH environment variables.')

        const passwordResetToken = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '45m' })

        await prisma.user.update({
            where: { email },
            data: { passwordResetToken }
        })

        await Email(
            eReset({
                email,
                link: process.env.NEXTAUTH_URL + '/forgot/' + passwordResetToken,
                assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
            }),
            {
                to: email,
                subject: 'Reset your password'
            }
        )
    }
    catch (_) { redirect('/login') }
}

export async function updatePassword({ password, token }: { password: string, token: string }) {
    try {
        if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

        vPassword.parse(password)

        const { email }: string | any = jwt.verify(token, process.env.NEXTAUTH_SECRET)

        const { passwordResetToken }: string | any = await prisma.user.findUnique({ where: { email } })

        if (token != passwordResetToken) throw new Error('The provided token is not valid.')

        await prisma.user.update({
            where: { email },
            data: {
                password: await bcrypt.hash(password, 12),
                passwordResetToken: null
            }
        })
    }
    catch (_) { redirect('/login') }
}

export async function register(email: string) {
    if (
        !process.env.NEXTAUTH_URL ||
        !process.env.NEXTAUTH_SECRET
    ) throw new Error('Missing NEXTAUTH environment variables.')

    if (await prisma.user.findUnique({ where: { email } })) return redirect('/register?occupied=' + email)

    const token = jwt.sign({ email }, process.env.NEXTAUTH_SECRET, { expiresIn: '1d' })

    await Email(
        eRegister({
            email,
            link: process.env.NEXTAUTH_URL + '/register/' + token,
            assets: { logoUrl: process.env.NEXTAUTH_URL + '/logo.webp' }
        }),
        {
            to: email,
            subject: 'Complete your registration'
        }
    )
}

export async function createAccount({ name, email, password }: iUser) {
    if (
        !process.env.NEXTAUTH_URL ||
        !process.env.NEXTAUTH_SECRET
    ) throw new Error('Missing NEXTAUTH environment variables.')

    vUser.parse({ name, email, password })

    await prisma.user.create({
        data: {
            name, email,
            password: await bcrypt.hash(password, 12)
        }
    })
}
