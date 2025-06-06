"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createUser } from '@/functions/users'
import { useRouter } from '@/locales/navigation'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'

type FormData = {
    email: string
    password: string
    confirmPassword: string
    firstname: string
    lastname: string
}

export default function Page() {
    const t = useTranslations()
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const onSubmit = async ({ email, password, firstname, lastname }: FormData) => {
        try {
            const user = await createUser({
                email, password,
                firstname,
                lastname
            })

            if (!user) {
                setErrorMessage(t('failed-to-create-user-please-try-again'))
                return
            }

            const req = await fetch(`/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            if (req.ok) router.push("/dash")
            else router.push("/login")
        } catch (err) {
            console.error(err)
            setErrorMessage(t('an-unexpected-error-occurred-please-try-again'))
        }
    }

    const password = watch('password')

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('create-an-account')}</h1>

            {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('first-name')}
                        </label>
                        <input
                            id="firstname"
                            {...register('firstname', { required: t('first-name-is-required') })}
                            type="text"
                            placeholder={t('john')}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('last-name')}
                        </label>
                        <input
                            id="lastname"
                            {...register('lastname', { required: t('last-name-is-required') })}
                            type="text"
                            placeholder={t('doe')}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('email')}
                    </label>
                    <input
                        id="email"
                        {...register('email', { required: t('email-is-required') })}
                        type="email"
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('password')}
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            {...register('password', { required: t('password-is-required') })}
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
                        {t('confirm-password')}
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: t('please-confirm-your-password'),
                                validate: value => value === password || t('passwords-do-not-match')
                            })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
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
                        {t('show-password')}
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors duration-150"
                >
                    <UserPlus className="h-5 w-5 mr-2" />
                    {t('create-account')}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {t('already-have-an-account')}{' '}
                    <Link href="/login" className="font-medium text-primary-600 hover:text-primary-800">
                        {t('login')}
                    </Link>
                </p>
            </div>
        </div>
    )
}