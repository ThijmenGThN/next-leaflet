import { redirect } from 'next/navigation'
import { headers as getHeaders } from 'next/headers'

import { getPayload } from '@/functions/connector'
import DashboardLayout from '@/components/DashboardLayout'

import type { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {

    const headers = await getHeaders()
    const payload = await getPayload()
    const { user } = await payload.auth({ headers })

    if (!user) redirect("/login")

    return (
        <DashboardLayout user={user}>
            {children}
        </DashboardLayout>
    )

}