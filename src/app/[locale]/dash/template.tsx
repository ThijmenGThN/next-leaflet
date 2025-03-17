
import { redirect } from "next/navigation"

import { isLoggedIn } from "@/functions/users"

import type { ReactNode } from "react"

export default async function Template({ children }: { children: ReactNode }) {

    console.log(await isLoggedIn())

    // if (!await isLoggedIn()) redirect("/login")

    return (
        <>
            {children}
        </>
    )

}
