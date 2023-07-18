import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import aLogo from '@/assets/logo.webp'
import gravatar from '@/helpers/gravatar'

export default function Exists({ searchParams }: { searchParams: { email: string } }) {

    if (!searchParams?.email) return redirect('/register')

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
                    An account already exists.
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white flex flex-col items-center justify-center gap-y-4 px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <img
                        className="h-16 w-16 rounded-full bg-gray-50 border"
                        src={gravatar(searchParams?.email)}
                        alt=""
                    />
                    <p className="truncate text-sm font-medium text-gray-900">{searchParams?.email}</p>

                    <Link href="/login/reset" className="mt-5 flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        Reset your password
                    </Link>

                    <Link href='/register' className="flex items-center justify-center w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Sign up for a new account
                    </Link>
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Sign in with a different account
                    </Link>
                </div>
            </div>
        </div>
    )
}
