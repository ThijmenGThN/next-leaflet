"use client"

import Shell from "@/components/dash/shell/Shell"

import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Shell navigation={[
            { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
        ]} >
            {children}
        </Shell>
    )
}
