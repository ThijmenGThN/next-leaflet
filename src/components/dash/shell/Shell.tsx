'use client'

import React, { useState } from 'react'

import { Bars3Icon } from '@heroicons/react/24/outline'

import { MobileSidebar, DesktopSidebar } from './Sidebar'

interface iNavigation {
    name: string
    href: string
    icon: any
    current: boolean
}

export default function Shell({ children, navigation }: { children: React.ReactNode, navigation: iNavigation[] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-gray-50 min-h-screen">
            <MobileSidebar navigation={navigation} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <DesktopSidebar navigation={navigation} />

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                <div className="flex-1 text-sm/6 font-semibold text-gray-900">
                    Dashboard
                </div>
                <a href="#">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full bg-gray-50"
                    />
                </a>
            </div>

            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

