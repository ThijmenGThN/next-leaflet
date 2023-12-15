import Image from 'next/image'
import Link from 'next/link'

import Register from '@/components/auth/Register'

import assetLogo from '@/assets/logo.webp'

export default function Page() {

    return (
        <div className='h-screen'>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={assetLogo}
                        alt=""
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <Register />
                    </div>

                    <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                        <Link href="/">
                            ← Back to homepage
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}