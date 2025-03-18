"use server"

import { headers as nextHeaders } from 'next/headers'

import { User } from '@/types/payload-types'

import { getPayload } from './connector'

export async function getUser(): Promise<Partial<User> | null> {
    const payload = await getPayload()
    const headers = await nextHeaders()
    const { user } = await payload.auth({ headers })
    return user
}

export async function isLoggedIn(): Promise<boolean> {
    const user = await getUser()
    return !!user
}
