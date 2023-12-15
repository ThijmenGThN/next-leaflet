import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import pb from "@/helpers/pocketbase"

import type { ReactNode } from "react"

export default function RestrictiveLayout({ children }: { children: ReactNode }) {

    const authCookie = cookies().get("pb_auth")

    if (!authCookie) return redirect('/login')

    pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`)

    if (!pb.authStore.isValid) return redirect('/login')

    return (
        <>
            {children}
        </>
    )
}
