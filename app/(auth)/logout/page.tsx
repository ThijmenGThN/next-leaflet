"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Directus from "@/libs/directus"

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const {auth} = await Directus()

            try { await auth.logout() }
            finally { router.push('/login') }
        })()
    }, [router])
}