"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { resetPassword } from '@/functions/users'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'

type FormData = {
    password: string
    confirmPassword: string
}

export default function Page({ token }: { token: string }) {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async ({ password, confirmPassword }: FormData) => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            setIsSuccess(false)
            return
        }

        try {
            const successful = await resetPassword({
                token,
                password
            })

            if (successful) {
                setMessage("Password reset successful. Redirecting to login...")
                setIsSuccess(true)
                setTimeout(() => router.push("/login"), 2000)
                return
            }

            setMessage("Password reset failed")
            setIsSuccess(false)
        } catch (err) {
            console.error(err)
            setMessage("Password reset failed")
            setIsSuccess(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Reset Password</h1>

            {message && (
                <div className={`mb-4 p-3 ${isSuccess ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} border rounded-lg text-sm`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        {...register('confirmPassword', { required: "Confirm Password is required" })}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <div className="flex items-center">
                    <input
                        id="show-password"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="show-password" className="ml-2 block text-sm text-gray-700">
                        Show Password
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-150"
                    disabled={isSuccess}
                >
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Reset Password
                </button>
            </form>
        </div>
    )
}