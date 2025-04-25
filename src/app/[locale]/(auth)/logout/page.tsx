"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        })
    }, [router])

    return (
        <>

        </>
    )
}
