"use server"

import { z } from 'zod'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

import prisma from '@/prisma/client'
import Email from '@/emails/client'

import type { iUser } from "@/types/globals"

const vUser = z.object({
    name: z.string()
        .min(2, { message: 'This name is too short.' })
        .max(32, { message: 'This name is too long.' }),
    email: z.string()
        .min(2, { message: 'This email address is too short.' })
        .max(64, { message: 'This email address is too long.' })
        .email('This email address is not valid.'),
    password: z.string()
        .min(8, { message: 'This password is too short.' })
        .max(128, { message: 'This password is too long.' })
})

import TestEmail from '@/emails/Test'

export async function reset(email: string) {
    try {
        Email(
            TestEmail(),
            {
                to: email,
                subject: 'Reset your password'
            }
        )
    }
    catch (error) { }
}

export async function register(user: iUser) {
    try {
        user = vUser.parse(user)

        user.password = await bcrypt.hash(user.password, 12)

        await prisma.user.create({ data: { ...user } })
    }
    catch (error) { console.log(error); redirect('/register/exists?email=' + encodeURI(user.email)) }
}