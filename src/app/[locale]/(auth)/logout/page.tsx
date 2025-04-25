"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

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
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
            <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Logging out</h1>
            <p className="text-gray-600">You will be redirected shortly...</p>
        </div>
    )
}