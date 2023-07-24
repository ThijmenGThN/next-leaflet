import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'
import Reset from '@/components/auth/Reset'

import aLogo from '@/assets/logo.webp'
import gravatar from '@/helpers/gravatar'

export default async function ResetToken({ params: { token } }: { params: { token: string } }) {

    let invalidToken, email = 'Unknown User'

    if (!process.env.NEXTAUTH_SECRET) invalidToken = true
    else {
        const payload: any = jwt.verify(token, process.env.NEXTAUTH_SECRET)
        email = payload.email
        const { passwordResetToken }: any = await prisma.user.findUnique({ where: { email } })
        if (token != passwordResetToken) invalidToken = true
    }

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
                    {
                        invalidToken
                            ? "Expired request to reset"
                            : "Update your password"
                    }
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        <img
                            className="h-16 w-16 rounded-full bg-gray-50 border"
                            src={gravatar(email)}
                            alt=""
                        />
                        <p className="truncate text-sm font-medium text-gray-900">{email}</p>
                    </div>

                    {
                        invalidToken
                            ? (
                                <div className='flex flex-col gap-y-4'>
                                    <p className="truncate text-sm mt-4 text-center font-medium text-gray-900">The request to update your password has expired.</p>

                                    <Link href="/login/reset" className="mt-5 flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                        Reset your password
                                    </Link>

                                    <Link href='/register' className="flex items-center justify-center w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Sign up for a new account
                                    </Link>
                                </div>
                            )
                            : <Reset token={token} />
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Sign in to a different account
                    </Link>
                </div>
            </div>
        </div>
    )
}
