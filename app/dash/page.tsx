"use client"

import { useRouter } from 'next/navigation'

import pb from "@/helpers/pocketbase"

export default function Page() {
    const router = useRouter()

    async function signOut() {
        await pb.authStore.clear()
        router.push('/login')
    }

    return (
        <>
            <button className="bg-black text-white rounded px-4 py-2"
                onClick={signOut}
            >
                Sign out
            </button>
        </>
    )
}
