"use client"

import { useTranslations } from "next-intl"
import { User, Home, Bell, Settings, LogOut } from 'lucide-react'

import { Link } from "@/locales/navigation"

export default function Page() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 bg-white w-64 border-r border-gray-200 hidden md:block">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-800">
                        {t('dash.dashboard')}
                    </h1>
                </div>
                <nav className="p-4 space-y-1">
                    <Link href="/dash" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">
                        <Home className="h-5 w-5 mr-3 text-primary-600" />
                        {t('dash.dashboard')}
                    </Link>
                    <Link href="/dash/profile" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <User className="h-5 w-5 mr-3 text-gray-500" />
                        {t('dash.profile')}
                    </Link>
                    <Link href="/logout" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                        {t('logout')}
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <div className="md:pl-64">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
                    <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
                            <Settings className="h-5 w-5" />
                        </button>
                        <Link href="/dash/profile" className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <User className="h-5 w-5" />
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Dashboard content */}
                <main className="p-4 md:p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {t('dash.welcome-to-your-dashboard')}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-primary-100 rounded-full mr-4">
                                    <Home className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {t('dash.dashboard')}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {t('dash.overview')}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full mr-4">
                                    <User className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {t('dash.user')}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {t('dash.profile')}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-purple-100 rounded-full mr-4">
                                    <Settings className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {t('dash.system')}
                                    </p>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {t('dash.settings')}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            {t('dash.quick-links')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/dash/profile" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <User className="h-5 w-5 text-primary-600 mr-3" />
                                <span className="text-gray-700">
                                    {t('dash.edit-profile')}
                                </span>
                            </Link>
                            <Link href="/logout" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <LogOut className="h-5 w-5 text-red-600 mr-3" />
                                <span className="text-gray-700">
                                    {t('logout')}
                                </span>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}