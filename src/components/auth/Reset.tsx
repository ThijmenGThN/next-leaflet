"use client"

import jwt from 'jsonwebtoken'
import { signIn } from "next-auth/react"

import validate from '@/helpers/validation'

import Form from '@/components/Form'

const callbackUrl = '/dashboard'

export default function Component({ token }: { token: string }) {

    const onSubmit = async ({ password }: any) => {
        if (!password) return

        fetch('/api/auth/forgot/update', { method: 'POST', body: JSON.stringify({ token, password }) })

        const { email }: any = jwt.decode(token)
        signIn('credentials', { email, password, callbackUrl })
    }

    return (
        <Form
            onSubmit={onSubmit}
            validator={validate.forms.password}
            submit={{ label: "Confirm", position: 'full' }}
            fields={[
                { id: 'password', type: 'password', label: 'Password' },
                { id: 'repeatPassword', type: 'password', label: 'Repeat password' }
            ]}
            options={[
                'showPassword'
            ]}
        />
    )
}
