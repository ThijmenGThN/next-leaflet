"use server"

import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'

import prisma from '@/prisma/client'
import { iUser } from "@/types/globals"

export async function register(user: iUser) {
    try {
        user.password = await bcrypt.hash(user.password, 12)

        await prisma.user.create({ data: { ...user } })
    }
    catch (error) { redirect('/register/exists?email=' + encodeURI(user.email)) }
}