"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useRouter } from '@/locales/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

type FormData = {
    email: string
    password: string
}

export default function Page() {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
                setErrorMessage(data.message || "Login failed")
                return
            }

            const user = data.user
            if (user) {
                setErrorMessage(null) // Clear any previous error
                router.push("/dash")
            }
        } catch (err) {
            setErrorMessage("An unexpected error occurred. Please try again.")
            console.error(err)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Login to your account</h1>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
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

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            {...register('password', { required: "Password is required" })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <Link href="/reset" className="text-sm font-medium text-primary-600 hover:text-primary-800">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-150"
                >
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign in
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-primary-600 hover:text-primary-800">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}