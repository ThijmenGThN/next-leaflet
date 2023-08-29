"use client"

import jwt from 'jsonwebtoken'
import { signIn } from "next-auth/react"
import { useTransition } from "react"

import * as actions from "@/server/auth/forgot"

import validate from '@/helpers/validation'

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component({ token }: { token: string }) {
    const [isPending, startTransition] = useTransition()

    const onSubmit = ({ password }: any) => new Promise(async (_, reject) => {
        startTransition(async () => {
            await actions.update({ password, token })
            const { email }: any = jwt.decode(token)
            signIn('credentials', { email, password, callbackUrl })
        })
    })

    return (
        <Form
            onSubmit={onSubmit}
            validator={validate.forms.password}
            submitLabel="Confirm"
            fields={[
                'password',
                'repeatPassword'
            ]}
            options={[
                'showPassword'
            ]}
        />
    )
}
