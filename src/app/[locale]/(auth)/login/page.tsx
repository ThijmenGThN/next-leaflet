"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { login } from '@/functions/users'
import { useRouter } from '@/locales/navigation'

type FormData = {
    email: string
    password: string
}

export default function Page() {
    const router = useRouter()

    const { register, handleSubmit } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async ({ email, password }: FormData) => {
        const user = await login(email, password)
        console.log(user)
        if (user) router.push("/dash")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('email')}
                type="email"
                required
                placeholder="Email"
            />
            <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
            />
            <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
            />
            <button type="submit">Submit</button>
        </form>
    )
}
