import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { sessionIsValid } from "@/helpers/pocketbase"

import type { ReactNode } from "react"

export default async function RestrictiveTemplate({ children }: { children: ReactNode }) {

    // If user is not authenticated redirect to the login page.
    if (!await sessionIsValid(cookies())) return redirect('/login')

    return (
        <>
            {children}
        </>
    )

}
