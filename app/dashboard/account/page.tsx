import { getServerSession } from "next-auth"

import options from "@/auth/options"

export default async function Page() {
    const session = await getServerSession(options)

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
                Account
            </div>
        </div>
    )
}
