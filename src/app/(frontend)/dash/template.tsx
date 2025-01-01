
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import type { ReactNode } from "react"

export default async function RestrictiveTemplate({ children }: { children: ReactNode }) {

    // Redirect if user authenticated.
    if (!(await cookies()).get('payload-token')) {
        redirect('/login')
    }

    return (
        <>
            {children}
        </>
    )

}
