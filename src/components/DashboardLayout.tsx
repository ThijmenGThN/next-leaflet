"use client"

import { Home, User, LogOut } from 'lucide-react'
import { Link, usePathname } from "@/locales/navigation"
import { Button } from '@/components/ui/button'
import { cn } from '@/helpers/utils'
import { Card, CardContent } from '@/components/ui/card'
import { User as UserType } from '@/types/payload-types'
import gravatar from '@/helpers/gravatar'
import { ThemeSwitcher } from '@/components/ui/theme-switcher'
import Image from 'next/image'

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dash",
        icon: Home
    },
    {
        title: "Profile",
        href: "/dash/profile",
        icon: User
    }
]

export default function DashboardLayout({
    children,
    user
}: {
    children: React.ReactNode
    user?: Partial<UserType> | null
}) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-card">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64">
                <div className="flex h-full flex-col px-4 space-y-4">
                    {/* Logo */}
                    <div className="flex items-start justify-center pt-6">
                        <h2 className="font-semibold text-foreground">next-leaflet</h2>
                    </div>

                    {/* Divider */}
                    <div className="border-t"></div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Button
                                    key={item.href}
                                    asChild
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start",
                                        isActive && "bg-secondary"
                                    )}
                                >
                                    <Link href={item.href}>
                                        <Icon className="mr-2 h-4 w-4" />
                                        {item.title}
                                    </Link>
                                </Button>
                            )
                        })}
                    </nav>

                    {/* User Card */}
                    {user && (
                        <Card className='py-4'>
                            <CardContent className="flex items-center space-x-3 px-3">
                                <Image
                                    src={gravatar(user.email)}
                                    alt="User avatar"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {user.firstname} {user.lastname}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/logout">
                            <Button
                                type="submit"
                                variant="ghost"
                                className="justify-start text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </Link>
                        <ThemeSwitcher />
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="pl-64 p-3 min-h-screen">
                <div className="bg-background border rounded-lg h-full min-h-[calc(100vh-1.5rem)] p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}