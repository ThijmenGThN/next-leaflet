"use client"

import { useTranslations } from 'next-intl'
import { useSession } from 'next-auth/react'

export default function Page() {
    const intl = useTranslations()

    const { data: session, status } = useSession()

    return (
        <div className="overflow-hidden rounded-md bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                    <p className="font-semibold">Session data fetched via a client component</p>
                    <p className="m-2">Hi {session?.user.name}</p>
                </li>
            </ul>
        </div>
    )
}
