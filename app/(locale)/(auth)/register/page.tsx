"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import gravatar from '@/helpers/gravatar'

import OAuth from '../OAuth'

import aLogo from '@/assets/logo.webp'

import validate from '@/helpers/validation'
import Form from '@/components/Form'

export default function Page() {
    const [formEmail, setFormEmail] = useState<string>()
    const [hasBeenSent, setHasBeenSent] = useState<boolean>(false)

    const onSubmit = async ({ email }: any) => {
        if (!email) return

        const { ok } = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ email }) })

        if (!ok) throw new Error('Registration attempt has failed.')

        setFormEmail(email)
        setHasBeenSent(true)
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
                    Sign up for an account
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {hasBeenSent
                        ? <div className="flex flex-col items-center justify-center gap-y-4">
                            <Image
                                className="h-16 w-16 rounded-full bg-gray-50 border"
                                src={gravatar(formEmail ?? '')}
                                width={80}
                                height={80}
                                alt=""
                            />
                            <p className="text-sm font-medium text-gray-900">
                                {formEmail}
                            </p>

                            <p className="text-sm mt-4 text-center font-medium text-gray-900">
                                We have sent you an email to create an account
                            </p>
                        </div>
                        : <>
                            <Form
                                onSubmit={onSubmit}
                                validator={validate.objects.email}
                                submit={{ label: 'Continue', position: 'full' }}
                                fields={[
                                    { id: 'email', type: 'email', label: 'Email address' }
                                ]}
                            />

                            <OAuth />
                        </>}
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
