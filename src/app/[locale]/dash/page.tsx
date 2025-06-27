import { redirect } from "next/navigation"
import { getUser } from "@/functions/users"
import DashboardLayout from "./DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Page() {
    const user = await getUser()
    if (!user) return redirect("/login")

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.firstname || 'User'}!</p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Manage your account settings</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Update your personal information and preferences.</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity</CardTitle>
                            <CardDescription>Your recent activity</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">No recent activity to display.</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Access frequently used features here.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}