"use client"

import Image from 'next/image'
import { useEffect, useState } from "react"
import { useTranslations } from 'next-intl'

import pb from '@/helpers/pocketbase'
import { classNames } from "@/helpers/tailwind"
import { Link, useRouter } from '@/helpers/navigation'

import type { FormEvent } from "react"

import assetLogo from '@/assets/logo.webp'


// -- AUTH REDIRECT URL --

const REDIRECT_URL = '/dash'


export default function Page() {
    const t = useTranslations('auth')
    const router = useRouter()

    const [authError, setAuthError] = useState<string | null>()
    const [authProviders, setAuthProviders] = useState<Array<any>>([])
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Attempt authentication via Oauth2.
    async function authWithOAuth2(provider: string) {
        try {
            await pb.collection('users').authWithOAuth2({ provider })
            router.push(REDIRECT_URL)
        }
        catch (e: any) {
            setAuthError(e.response.message ?? t('something-went-wrong-try-again-later'))
        }
    }

    // This gets triggered when the form is submitted.
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        // Extract data from the form.
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        if (!(email && password)) return setIsLoading(false)

        try {
            // Attempt authentication via email and password.
            await pb.collection('users').authWithPassword(email, password)
            router.push(REDIRECT_URL)
        }
        catch (e: any) {
            setAuthError(e.response.message ?? t('something-went-wrong-try-again-later'))
        }

        // Disable the loader, add a small delay for a better user experience.
        setTimeout(() => setIsLoading(false), 500)
    }

    // Fetch all Oauth2 methods once the page loads.
    useEffect(() => {
        pb.collection('users').listAuthMethods()
            .then(methods => setAuthProviders(methods.authProviders))
    }, [])

    return (
        <>
            <div className="absolute left-0 -top-36 w-full">
                <Link href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={assetLogo}
                        alt=""
                    />
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {t('sign-in-to-your-account')}
                </h2>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        {t('email-address')}
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
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
                        {t('password')}
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
                            {t('show-password')}
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
                    {t('sign-in')}
                </button>

                <div className="flex mt-5 items-center justify-between">
                    <div className="text-sm leading-6">
                        <Link href="/reset" className="font-semibold text-primary hover:text-primary-600">
                            {t('forgot-password')}
                        </Link>
                    </div>
                    <div className="text-sm leading-6">
                        <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                            {t('create-an-account')}
                        </Link>
                    </div>
                </div>
            </form>

            {authProviders.length > 0 && (
                <div className='flex flex-col gap-y-6 mt-8'>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-white px-6 text-gray-900">Or continue with</span>
                        </div>
                    </div>

                    <ul className={classNames(
                        authProviders.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
                        "grid gap-4"
                    )}>
                        {authProviders.map((provider, index) => (
                            <li key={index}>
                                <button className="text-sm bg-black hover:bg-zinc-800 text-white p-2 rounded-lg w-full"
                                    onClick={() => authWithOAuth2(provider.name)}
                                >
                                    {provider.displayName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
