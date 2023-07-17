import Link from 'next/link'
import Image from 'next/image'
import { getProviders } from 'next-auth/react'

import OAuth from '@/components/auth/OAuth'

import aLogo from '@/assets/logo.webp'
import Register from '@/components/auth/credentials/Register'

export default async function Page() {
    const { credentials, ...providers }: any = await getProviders()

    const hasOAuth = Object.keys(providers).length > 0

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={aLogo}
                        alt=""
                    />
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up for an account
                </h2>
            </div>

            <div className="relative mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <Register />

                    {hasOAuth && <OAuth providers={providers} />}
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Already have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}
