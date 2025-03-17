"use server"

import { headers as nextHeaders } from 'next/headers'
import { getPayload } from '@/helpers/payload'

import { User } from '@/types/payload-types'

export async function getUser(): Promise<Partial<User> | null> {
    const payload = await getPayload()
    const headers = await nextHeaders()
    const { user } = await payload.auth({ headers })
    return user
}
