"use client"

import EmailClient from '@/emails/client'
import TestEmail from '@/emails/Test'

import { useSession } from 'next-auth/react'

export default function Page() {
    const { data: session, status } = useSession()

    return (
        <>
            Client-side
        </>
    )
}
