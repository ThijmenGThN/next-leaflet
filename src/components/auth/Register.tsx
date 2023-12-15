"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, type FormEvent, useEffect } from "react"

import { classNames } from "@/helpers/tailwind"
import pb from '@/helpers/pocketbase'

export default function Register({ redirectUrl }: { redirectUrl?: string }) {
    const router = useRouter()

    const [authError, setAuthError] = useState<string | null>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string,
            email = formData.get('email') as string,
            password = formData.get('password') as string,
            passwordConfirm = formData.get('passwordConfirm') as string

        try {
            if (!email || !password || !passwordConfirm) throw "Some required fields have not been filled in."
            if (password.length < 8) throw "Password must be at least 8 characters"
            if (password.length > 72) throw "Password cannot exceed 72 characters."
            if (password != passwordConfirm) throw "Passwords must both match."
        }
        catch (message: any) {
            setIsLoading(false)
            return setAuthError(message)
        }

        try {
            await pb.collection('users').create({
                "name": name ?? null,
                "email": email,
                "password": password,
                "passwordConfirm": passwordConfirm
            })

            await pb.collection('users').requestVerification(email)

            await pb.collection('users').authWithPassword(email, password)
            document.cookie = pb.authStore.exportToCookie({ httpOnly: false })

            router.push(redirectUrl ?? '/dash')
        }
        catch (e: any) {
            setAuthError("Email address already taken, reset or try a different one.")
        }

        setIsLoading(false)
    }

    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

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
            </div>

            <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                </label>
                <div className="mt-2">
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
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

            <button className="flex w-full items-center gap-x-2 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="submit"
            >
                {isLoading &&
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                    </svg>
                }

                Sign up
            </button>

            <div className="flex mt-5 items-center justify-center">
                <div className="text-sm leading-6">
                    <Link href="/login" className="font-semibold text-primary hover:text-primary-600">
                        Sign in to your account
                    </Link>
                </div>
            </div>
        </form>
    )
}
