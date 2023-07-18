"use server"

import bcrypt from 'bcrypt'

import { iUser } from "@/types/globals"
import prisma from '@/prisma/client'

export async function create(user: iUser) {

    user.password = await bcrypt.hash(user.password, 12)

    await prisma.user.create({ data: { ...user } })
}