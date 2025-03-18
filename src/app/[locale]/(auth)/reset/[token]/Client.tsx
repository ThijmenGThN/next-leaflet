"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/functions/users'

type FormData = {
    password: string
    confirmPassword: string
}

export default function Page({ token }: { token: string }) {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const onSubmit = async ({ password, confirmPassword }: FormData) => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return
        }

        try {
            const successful = await resetPassword({
                token,
                password
            })

            setMessage(successful
                ? "Password reset successful"
                : "Password reset failed"
            )
        } catch (err) {
            console.error(err)
            setMessage("Password reset failed")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        {...register('password', { required: "Password is required" })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="New Password"
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <div>
                    <input
                        {...register('confirmPassword', { required: "Confirm Password is required" })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                    />
                    {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
                </div>
                <div>
                    <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label>Show Password</label>
                </div>
                <button type="submit">Reset Password</button>
            </form>

            {message && <p style={{ color: message.includes("successful") ? 'green' : 'red' }}>{message}</p>}
        </>
    )
}
