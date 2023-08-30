"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

import validate from '@/helpers/validation'

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component() {
    const router = useRouter()

    const onSubmit = ({ email, password }: any) => new Promise(async (_, throwError) => {
        const { error }: any = await signIn('credentials', { email, password, redirect: false })
        if (error) return throwError("Invalid credentials, try again or reset your password")

        router.refresh()
        router.push(callbackUrl)
    })

    useEffect(() => { router.prefetch(callbackUrl) }, [router])

    return (
        <>
            <Form
                onSubmit={onSubmit}
                submitLabel="Sign in"
                validator={validate.forms.login}
                fields={[
                    { type: 'email' },
                    { type: 'password' }
                ]}
                options={[
                    'showPassword'
                ]}
            />

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <Link href="/forgot" className="font-semibold text-primary hover:text-primary-600">
                        Forgot password?
                    </Link>
                </div>
                <div className="text-sm leading-6">
                    <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                        Create an account
                    </Link>
                </div>
            </div>
        </>
    )
}
