import Link from "next/link"
import Image from 'next/image'

import aLogo from '@/assets/branding/logo.webp'
import aNotFound from "@/assets/pages/not-found.webp"

export default function Page() {
    return (
        <Container>
            <Link href='/'>
                <Image
                    priority
                    className="h-10 w-auto"
                    src={aLogo}
                    alt="Logo"
                />
            </Link>

            <div className="mt-20">
                <p className="text-base font-semibold leading-8 text-theme-primary">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>

                <div className='mt-10 flex justify-between'>
                    <Link href="/" className="text-sm font-semibold leading-7 text-theme-primary hover:text-theme-primary-dark">
                        <span aria-hidden="true">&larr;</span> Back to home
                    </Link>

                    <Link href="/login" className="text-sm font-semibold leading-7 text-theme-primary hover:text-theme-primary-dark">
                        Login
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
                src={aNotFound}
                alt=""
            />
        </div>
    </div>
}
