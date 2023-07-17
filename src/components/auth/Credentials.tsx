"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

const callbackUrl = '/dashboard'

export default function Credentials() {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <>
            <div className="space-y-6"
                onKeyDown={({ key }) => key == 'Enter' && signIn('credentials', { email, password, callbackUrl })}
            >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            type="email"
                            onChange={({ target: { value } }) => setEmail(value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            type={showPassword ? "text" : "password"}
                            onChange={({ target: { value } }) => setPassword(value)}
                        />
                    </div>

                    <div className="flex items-center mt-5">
                        <input onClick={() => setShowPassword(!showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            id="showPassword"
                            type="checkbox"
                        />
                        <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900">
                            Show password
                        </label>
                    </div>
                </div>

                <div>
                    <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        onClick={() => signIn('credentials', { email, password, callbackUrl })}
                    >
                        Sign in
                    </button>
                </div>
            </div>

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-primary hover:text-primary-dark">
                        Forgot password?
                    </a>
                </div>
                <div className="text-sm leading-6">
                    <a href="#" className="font-semibold text-primary hover:text-primary-dark">
                        Create account
                    </a>
                </div>
            </div>
        </>
    )
}
