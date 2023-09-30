"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from 'next-intl/client'

import type { ChangeEvent } from "react"

export default function Component({ locales }: { locales: Array<string> }) {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        router.replace(pathname, { locale: event.target.value })
    }

    return (
        <select onChange={onSelectChange} className="border-0 rounded bg-white" defaultValue={locale}>
            {
                locales.map((lang, index) =>
                    <option key={index} value={lang} >
                        {lang.toUpperCase()}
                    </option>
                )
            }
        </select>
    )
}
