"use client"

import Image from 'next/image'

import Login from '@/components/auth/Login'

import assetLogo from '@/assets/logo.webp'

export default function Page() {

    return (
        <>
            <div className="absolute left-0 -top-36 w-full">
                <a href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={assetLogo}
                        alt=""
                    />
                </a>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <Login />
        </>
    )
}
