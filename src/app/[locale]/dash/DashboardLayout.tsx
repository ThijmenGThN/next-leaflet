"use client"

import { Home, User, LogOut } from 'lucide-react'
import { Link, usePathname } from "@/locales/navigation"
import { Button } from '@/components/ui/button'
import { cn } from '@/libs/cn'

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen mx-auto container bg-background">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r">
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-14 items-center border-b px-6">
                        <h2 className="font-semibold">next-leaflet</h2>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
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

                    {/* Logout */}
                    <div className="border-t p-4">
                        <Link href="/logout">
                            <Button
                                type="submit"
                                variant="ghost"
                                className="w-full justify-start text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="pl-64">
                <main className="container py-6">
                    {children}
                </main>
            </div>
        </div>
    )
}