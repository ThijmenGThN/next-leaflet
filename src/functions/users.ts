"use server"

import { headers as nextHeaders } from 'next/headers'

import { User } from '@/types/payload-types'

import { getPayload } from './connector'

export async function login(email: string, password: string): Promise<Partial<User> | null> {
    const payload = await getPayload()
    const { user } = await payload.login({
        collection: "users",
        data: {
            email,
            password
        },
        overrideAccess: false
    })
    return user
}

export async function isLoggedIn(): Promise<boolean> {
    const user = await getUser()
    return !!user
}

export async function getUser(): Promise<Partial<User> | null> {
    const payload = await getPayload()
    const headers = await nextHeaders()
    const { user } = await payload.auth({ headers })
    return user
}
