"use client"

import { useState, useTransition } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

import { isEmail } from '@/helpers/validation'
import { signIn } from "next-auth/react"
import * as actions from "./actions"

const callbackUrl = '/dashboard'

export default function Register() {
    const [isPending, startTransition] = useTransition()

    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [passwordValidation, setPasswordValidation] = useState<string>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [authError, setAuthError] = useState<string>()

    function submit() {

        if (!name || !email || !password || !passwordValidation) return setAuthError('All fields are required and must be filled in.')

        if (name.length < 2) return setAuthError('The provided name should be atleast 2 characters long.')
        if (name.length > 32) return setAuthError('The provided name can only have up-to 32 characters.')

        if (!isEmail(email)) return setAuthError('The provided email is not considered to be valid.')
        if (email.length > 128) return setAuthError('The provided email can only have up-to 128 characters.')

        if (password.length < 8) return setAuthError('The provided password should be atleast 8 characters long.')
        if (password.length > 128) return setAuthError('The provided password can only have up-to 128 characters.')

        startTransition(async () => {
            await actions.register({ name, email, password })

            signIn('credentials', { email, password, callbackUrl })
        })
    }

    return (
        <div className="space-y-6"
            onKeyDown={({ key }) => key == 'Enter' && submit()}
        >
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        authError
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        type="text"
                        onChange={({ target: { value } }) => setName(value)}
                    />
                    {authError && (<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><ExclamationCircleIcon className="h-5 w-5 text-red-500" /></div>)}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        authError
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        type="email"
                        onChange={({ target: { value } }) => setEmail(value)}
                    />
                    {authError && (<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><ExclamationCircleIcon className="h-5 w-5 text-red-500" /></div>)}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        authError
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        type={showPassword ? 'text' : "password"}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                    {authError && (<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><ExclamationCircleIcon className="h-5 w-5 text-red-500" /></div>)}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password (again)
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        authError
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        type={showPassword ? 'text' : "password"}
                        onChange={({ target: { value } }) => setPasswordValidation(value)}
                    />
                    {authError && (<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><ExclamationCircleIcon className="h-5 w-5 text-red-500" /></div>)}
                </div>

                {authError && <p className="mt-2 text-sm text-red-600">{authError}</p>}
            </div>

            <div className="flex items-center mt-5">
                <input onClick={() => setShowPassword(!showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                    id="showPassword"
                    type="checkbox"
                />
                <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                    Show password
                </label>
            </div>

            <div>
                <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => submit()}
                >
                    Sign up
                </button>
            </div>
        </div>
    )
}
