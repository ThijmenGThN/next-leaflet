"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent } from "react"

import { classNames } from "@/helpers/tailwind"
import pb from '@/helpers/pocketbase'

export default function Login() {
    const router = useRouter()

    const [authError, setAuthError] = useState<string | null>()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string,
            password = formData.get('password') as string

        if (!email || !password) return

        try {
            await pb.collection('users').authWithPassword(email, password)
            document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
        }
        catch (e: any) {
            setAuthError(e.response.message ?? "An unexpected has occoured.")
        }
        finally {
            router.push('/dash')
        }
    }

    async function signOut() {
        await pb.authStore.clear()
        router.push('/login')
    }

    return (
        <>
            <button className="text-white px-4 py-2 rounded bg-black"
                onClick={signOut}
            >
                Sign out
            </button>


            <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className={classNames(
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6",
                                authError && 'text-red-500 ring-red-400 placeholder:text-gray-400 focus:ring-red-500'
                            )}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : "password"}
                            autoComplete="current-password"
                            required
                            className={classNames(
                                "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6",
                                authError && 'text-red-500 ring-red-400 placeholder:text-gray-400 focus:ring-red-500'
                            )}
                        />
                    </div>

                    {authError && (
                        <p className="mt-2 text-sm text-red-500">
                            {authError}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            onChange={() => setShowPassword(!showPassword)}
                            checked={showPassword}
                            id="show-password"
                            name="show-password"
                            type="checkbox"
                        />
                        <label htmlFor="show-password" className="ml-3 block text-sm leading-6 text-gray-900">
                            Show password
                        </label>
                    </div>
                </div>

                <div>
                    <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        type="submit"
                    >
                        Sign in
                    </button>
                </div>

                <div className="flex mt-5 items-center justify-between">
                    <div className="text-sm leading-6">
                        <Link href="/forgot" className="font-semibold text-primary hover:text-primary-600">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="text-sm leading-6">
                        <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                            Create an account
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}
