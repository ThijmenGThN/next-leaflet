"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import Directus from "@/libs/directus"

import aLogo from '@/assets/branding/logo.webp'
import aSplash from "@/assets/splash.webp"

export default function Page() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isInvalid, setIsInvalid] = useState<boolean>(false)

    async function login(event: any) {
        event.preventDefault()
        setIsLoading(true)

        const SDK = await Directus()

        try {
            await SDK.auth.login({
                email: event.target[0].value,
                password: event.target[1].value
            })
            router.push('/dash')
        } catch (err) {
            setIsLoading(false)
            setIsInvalid(true)
        }
    }

    return (
        <main className="flex min-h-screen flex-1">
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <Image
                            priority
                            className="h-10 w-auto"
                            src={aLogo}
                            alt="Logo"
                        />
                        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10">
                        <div>
                            <form onSubmit={login} className="space-y-6">
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
                                            className={"block w-full rounded-md p-2 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-primary sm:text-sm sm:leading-6 " + (isInvalid && 'border-2 border-red-500')}
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
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className={"block w-full rounded-md p-2 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-primary sm:text-sm sm:leading-6 " + (isInvalid && 'border-2 border-red-500')}
                                        />
                                    </div>

                                    <p className={'mt-2 italic text-red-500 text-sm ' + (!isInvalid && 'hidden')}>Login unsuccessful. Please check your credentials and try again.</p>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="flex gap-2 w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={"w-5 h-5 animate-spin " + (isLoading ? '' : 'hidden')}>
                                            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                        </svg>

                                        <p>Sign in</p>
                                    </button>
                                </div>
                            </form>

                            <div className='mt-5'>
                                <Link href="/" className="text-sm font-semibold leading-7 text-primary">
                                    <span aria-hidden="true">&larr;</span> Back to home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden w-0 flex-1 lg:block">
                <Image
                    priority
                    className="absolute inset-0 h-full w-full object-cover"
                    src={aSplash}
                    alt=""
                />
            </div>
        </main>
    )
}