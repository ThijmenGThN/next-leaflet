import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getUserFromCookies } from "@/helpers/pocketbase"

import type { ReactNode } from "react"

export default async function RestrictiveTemplate({ children }: { children: ReactNode }) {

    // If user is not authenticated redirect to the login page.
    if (!await getUserFromCookies(cookies())) return redirect('/login')

    return (
        <>
            {children}
        </>
    )

}
