import Link from "next/link"
import Image from 'next/image'

import Register from "@/components/user/Register"

import aLogo from '@/assets/branding/logo.webp'
import aSplash from "@/assets/pages/auth/splash.webp"

import locale from '@/locale/globals.json'

export default function Page() {
    return (
        <Container>
            <FormHead />

            <div className="mt-10">
                <Register />

                <div className='mt-5 flex justify-between'>
                    <Link href="/" className="text-sm font-semibold leading-7 text-theme-primary hover:text-theme-primary-dark">
                        <span aria-hidden="true">&larr;</span> {locale.backHome}
                    </Link>

                    <Link href="/login" className="text-sm font-semibold leading-7 text-theme-primary hover:text-theme-primary-dark">
                        {locale.auth.login}
                    </Link>
                </div>
            </div>
        </Container>
    )
}

function Container({ children }: { children: React.ReactNode }) {
    return <div className="flex min-h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                {children}
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
    </div>
}

function FormHead() {
    return (
        <div>
            <Link href='/'>
                <Image
                    priority
                    className="h-10 w-auto"
                    src={aLogo}
                    alt="Logo"
                />
            </Link>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {locale.auth.accountRegister}
            </h2>
        </div>
    )
}
