"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

type FormData = {
    email: string
    password: string
}

export default function Page() {

    const { register, handleSubmit } = useForm<FormData>()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (data: FormData) => {
        try {
            setIsLoading(true)
            const req = await fetch('/api/users/login', {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const body = await req.json()

            if (req.ok) return location.reload()

            setError((body?.errors && body?.errors[0]?.message) || "An error occurred.")
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2 relative">
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        autoFocus
                        required
                        aria-invalid={error ? "true" : "false"}
                        aria-describedby={error ? "email-error" : undefined}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${error ? 'ring-2 ring-inset ring-red-400 pr-10' : 'ring-1 ring-inset ring-gray-300'
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
                    />
                </div>
            </div>

            <div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2 relative">
                        <input
                            id="password"
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            aria-invalid={error ? "true" : "false"}
                            aria-describedby={error ? "password-error" : undefined}
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${error ? 'ring-2 ring-inset ring-red-400 pr-10' : 'ring-1 ring-inset ring-gray-300'
                                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6`}
                        />
                        {error && (
                            <ExclamationCircleIcon
                                aria-hidden="true"
                                className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-500"
                            />
                        )}
                    </div>
                </div>
                {error && <p id="password-error" className="mt-2 text-sm text-red-600">
                    {error}
                </p>}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        id="show-password"
                        name="show-password"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
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
                Sign in
            </button>

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <a href="/reset" className="font-semibold text-primary hover:text-primary-600">
                        Forgot password
                    </a>
                </div>
                <div className="text-sm leading-6">
                    <a href="/register" className="font-semibold text-primary hover:text-primary-600">
                        Create an account
                    </a>
                </div>
            </div>
        </form>
    )
}
