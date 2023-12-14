"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import pb from "@/helpers/pocketbase"

export default function Page() {
    const router = useRouter()

    const [user, setUser] = useState<Object | null>()

    async function signOut() {
        await pb.authStore.clear()
        router.push('/login')
    }

    useEffect(() => {
        setUser(pb.authStore.model)
    }, [])

    return (
        <div className="container mx-auto mt-24 flex flex-col gap-y-4 items-center">
            <p>
                Welcome to the dash!
            </p>

            {JSON.stringify(user)}

            <button className="text-white px-4 py-2 rounded bg-black"
                onClick={signOut}
            >
                Sign out
            </button>
        </div>
    )
}
