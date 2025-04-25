
import { redirect } from "next/navigation"

import { isLoggedIn } from "@/functions/users"

import type { ReactNode } from "react"

export default async function Template({ children }: { children: ReactNode }) {

    if (await isLoggedIn()) redirect("/")

    return (
        <>
            {children}
        </>
    )

}
