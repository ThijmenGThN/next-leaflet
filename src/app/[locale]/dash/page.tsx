"use client"

import { Link } from "@/locales/navigation"

export default function Page() {

    return (
        <>
            Dashboard

            <Link href="/dash/profile">
                Profile
            </Link>

            <Link href="/logout">
                Logout
            </Link>
        </>
    )
}
