import { redirect } from "next/navigation"
import { getUser } from "@/functions/users"
import DashboardLayout from "./DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Page() {
    const user = await getUser()
    if (!user) return redirect("/login")

    return (
        <DashboardLayout user={user}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.firstname || 'User'}!</p>
                </div>
            </div>
        </DashboardLayout>
    )
}