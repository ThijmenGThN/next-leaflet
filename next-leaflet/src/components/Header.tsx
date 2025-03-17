"use client"

import Image from 'next/image'
import Logo from "@/assets/logo.svg"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
    { href: "/", label: "Statistics" },
    { href: "/jobs", label: "Jobs" }
];

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6 shadow-sm">
            <Link href="/">
                <Image src={Logo} alt="Logo" className="h-10 w-auto" />
            </Link>
            <nav className="flex gap-4">
                {NAV_ITEMS.map((item) => (
                    <Button 
                        key={item.href} 
                        asChild 
                        variant="outline" 
                        className={`rounded-md px-4 py-2 transition-colors ${
                            pathname === item.href ? "bg-zinc-900 text-white" : ""
                        }`}
                    >
                        <Link href={item.href}>{item.label}</Link>
                    </Button>
                ))}
            </nav>
        </header>
    )
}
