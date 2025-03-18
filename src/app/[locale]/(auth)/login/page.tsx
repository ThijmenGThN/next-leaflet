"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link, useRouter } from '@/locales/navigation'

type FormData = {
    email: string
    password: string
}

export default function Page() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async ({ email, password }: FormData) => {
        try {
            const req = await fetch(`/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await req.json()

            if (!req.ok) {
                throw new Error(data.message || "Login failed")
            }

            const user = data.user
            if (user) router.push("/dash")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register('email', { required: "Email is required" })}
                        type="email"
                        placeholder="Email"
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register('password', { required: "Password is required" })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label>Show Password</label>
                </div>
                <button type="submit">Submit</button>
            </form>

            <Link href="/register">
                Register
            </Link>

            <Link href="/reset">
                Reset
            </Link>
        </>
    )
}
