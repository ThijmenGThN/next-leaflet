import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'

import prisma from '@/prisma/client'
import gravatar from '@/helpers/gravatar'

import Reset from '@/components/auth/Reset'

import aLogo from '@/assets/logo.webp'

export default async function Page({ params: { token } }: { params: { token: string } }) {

    if (!process.env.NEXTAUTH_SECRET) throw new Error('Missing NEXTAUTH environment variables.')

    let { email }: any = jwt.decode(token)

    jwt.verify(token, process.env.NEXTAUTH_SECRET)

    const { passwordResetToken }: any = await prisma.user.findUnique({ where: { email } })

    if (token != passwordResetToken) throw new Error('The provided token has expired.')

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
                    Update your password
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 flex flex-col gap-y-4">
                    <div className="flex flex-col items-center justify-center gap-y-4">
                        <Image
                            className="h-16 w-16 rounded-full bg-gray-50 border"
                            src={gravatar(email)}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <p className="text-sm font-medium text-gray-900">{email}</p>
                    </div>

                    <div className="mt-8">
                        <Reset token={token} />
                    </div>
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
