"use client"

import { testEmail } from "@/functions/email"
import { Link } from "@/locales/navigation"

export default function Page() {

    return (
        <>
            Dashboard

            <Link href="/logout">
                Logout
            </Link>
        </>
    )
}
