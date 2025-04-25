"use client"

import { useState } from "react"
import { updateUser } from "@/functions/users"
import { User } from "@/types/payload-types"
import { UserCircle, Save, ArrowLeft } from 'lucide-react'
import { Link } from "@/locales/navigation"

export default function Client({ user }: { user: User }) {
    const [firstName, setFirstName] = useState(user.firstname)
    const [lastName, setLastName] = useState(user.lastname)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            await updateUser({ firstname: firstName, lastname: lastName })
            setMessage({
                text: "Profile updated successfully",
                type: 'success'
            })
        } catch (error) {
            console.error(error)
            setMessage({
                text: "Failed to update profile",
                type: 'error'
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main content */}
            <div>
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center">
                        <Link href="/dash" className="mr-4 p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
                    </div>
                </header>

                {/* Profile content */}
                <main className="max-w-3xl mx-auto p-4 md:p-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-4">
                                <UserCircle className="h-10 w-10" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{firstName} {lastName}</h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        {message && (
                            <div className={`mb-6 p-3 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border rounded-lg text-sm`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-150"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-5 w-5 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    )
}