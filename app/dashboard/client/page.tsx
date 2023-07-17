"use client"

import { useSession } from 'next-auth/react'

export default function Page() {
    const { data: session, status } = useSession()

    return (
        <>
            Client-side
        </>
    )
}
