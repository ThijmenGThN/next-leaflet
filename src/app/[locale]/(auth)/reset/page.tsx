"use client"

import { forgotPassword } from '@/functions/users'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type FormData = {
    email: string
}

export default function Page() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

    const onSubmit = async ({ email }: FormData) => {
        setIsSubmitting(true)
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
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Reset Your Password</h1>
            <p className="text-gray-600 mb-6">Enter your email address to receive password reset instructions.</p>

            {message && (
                <div className={`mb-4 p-3 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border rounded-lg text-sm`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        id="email"
                        {...register('email', { required: "Email is required" })}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-150"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>
                            <Mail className="h-5 w-5 mr-2" />
                            Send Reset Instructions
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 text-center">
                <Link href="/login" className="text-sm flex items-center justify-center text-primary-600 hover:text-primary-800">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to login
                </Link>
            </div>
        </div>
    )
}