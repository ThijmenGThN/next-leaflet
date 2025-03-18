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

    const onSubmit = async ({ email }: FormData) => {
        setIsSubmitting(true)
        try {
            await forgotPassword(email)
        } catch (err) {
            console.error(err)
        } finally {
            setIsSubmitting(false)
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
