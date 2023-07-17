import Image from 'next/image'
import { getProviders } from 'next-auth/react'

import OAuth from '@/components/auth/OAuth'

import aLogo from '@/assets/logo.webp'
import Credentials from '@/components/auth/Credentials'

export default async function Page() {
    const { credentials, ...providers }: any = await getProviders()

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    className="mx-auto h-10 w-auto"
                    src={aLogo}
                    alt=""
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <Credentials />

                    {Object.keys(providers) && <OAuth providers={providers} />}
                </div>
            </div>
        </div>
    )
}
