import { redirect } from "next/navigation"
import { getUser } from "@/functions/users"
import Client from "./Client"
import { User } from "@/types/payload-types"

export default async function Page() {
    const user = await getUser()

    if (!user) return redirect("/login")

    return <Client user={user as User} />
}