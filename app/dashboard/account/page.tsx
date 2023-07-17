import { getServerSession } from "next-auth"

import options from "@/auth/options"

export default async function Page() {
    const session = await getServerSession(options)

    return (
        <>
            Account
        </>
    )
}
