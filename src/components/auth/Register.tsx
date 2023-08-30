"use client"

import { signIn } from "next-auth/react"
import { useTransition } from "react"

import validate from '@/helpers/validation'

import * as actions from "@/server/auth/register"

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component({ email }: { email: string }) {
    const [isPending, startTransition] = useTransition()

    const onSubmit = ({ name, password }: any) => new Promise<void>(async (resolve, throwError) => {
        startTransition(async () => {
            await actions.create({ name, email, password })
            signIn('credentials', { email, password, callbackUrl })
        })
    })

    return (
        <Form
            onSubmit={onSubmit}
            submit={{ label: "Sign up" }}
            validator={validate.forms.register}
            fields={[
                { type: 'name', label: 'Name' },
                { type: 'password', label: 'Password' },
                { type: 'repeatPassword', label: 'Repeat password' }
            ]}
            options={[
                "showPassword"
            ]}
        />
    )
}
