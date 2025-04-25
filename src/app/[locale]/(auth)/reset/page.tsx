"use client"

import { forgotPassword } from '@/functions/users'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
    email: string
}

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)
    
    const onSubmit = async ({ email }: FormData) => {
        try {
            await forgotPassword(email)
            setMessage({
                text: "If an account exists with this email, you will receive password reset instructions shortly.",
                type: 'success'
            })
        } catch (err) {
            console.error(err)
            setMessage({
                text: "Something went wrong. Please try again later.",
                type: 'error'
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    {...register('email', { required: "Email is required" })}
                    type="email"
                    placeholder="Email"
                />
                {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Reset Password"}
            </button>
        </form>
    )
}
