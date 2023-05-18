"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Directus from '@/resources/libs/directus'

import Sidebar from '@/components/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const { users } = await Directus()

            try { await users.me.read() }
            catch (err) { router.push('/login') }
        })()
    }, [router])

    return (
        <Sidebar>
            {children}
        </Sidebar>
    )
}
