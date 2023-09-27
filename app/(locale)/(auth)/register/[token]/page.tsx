"use client"

import Link from 'next/link'
import Image from 'next/image'
import jwt from 'jsonwebtoken'
import { signIn } from 'next-auth/react'

import gravatar from '@/helpers/gravatar'
import validate from '@/helpers/validation'

import Form from '@/components/Form'

import aLogo from '@/assets/logo.webp'

const callbackUrl = '/dashboard'

export default function Page({ params: { token } }: { params: { token: string } }) {

    let { email }: any = jwt.decode(token)

    const onSubmit = async ({ name, password }: any) => {
        await fetch('/api/auth/register/create', { method: 'POST', body: JSON.stringify({ name, password, token }) })

        signIn('credentials', { email, password, callbackUrl })
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
                    Complete your registration
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="flex mb-8 flex-col items-center justify-center gap-y-4">
                        <Image
                            className="h-16 w-16 rounded-full bg-gray-50 border"
                            src={gravatar(email)}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <p className="text-sm font-medium text-gray-900">{email}</p>
                    </div>

                    <Form
                        onSubmit={onSubmit}
                        submit={{ label: "Sign up", position: 'full' }}
                        validator={validate.forms.register}
                        fields={[
                            { id: 'name', type: 'text', label: 'Name' },
                            { id: 'password', type: 'password', label: 'Password' },
                            { id: 'repeatPassword', type: 'password', label: 'Repeat password' }
                        ]}
                        options={[
                            "showPassword"
                        ]}
                    />
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← Sign in to a different account
                    </Link>
                </div>
            </div >
        </div >
    )
}
