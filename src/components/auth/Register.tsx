"use client"

import { z } from 'zod'
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod'

import * as actions from "@/server/auth"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

const callbackUrl = '/dashboard'

export default function Component({ email }: { email: string }) {
    const intl = useTranslations()
    const [isPending, startTransition] = useTransition()

    const vForm = z.object({
        name: z.string().min(2, { message: intl('form.validation.name.short') }).max(32, { message: intl('form.validation.name.long') }),
        password: z.string().min(8, { message: intl('form.validation.password.short') }).max(64, { message: intl('form.validation.password.long') }),
        repeatPassword: z.string().min(8, { message: intl('form.validation.password.short') }).max(64, { message: intl('form.validation.password.long') })
    }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: intl('form.validation.password.repeatNoMatch'), path: ['repeatPassword'] })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vForm) })

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const onSubmit = ({ name, password }: any) =>
        startTransition(async () => {
            await actions.createAccount({ name, email, password })

            signIn('credentials', { email, password, callbackUrl })
        })

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {intl('form.fields.name')}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        errors.name?.message
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        {...register("name", { required: true })}
                        type='text'
                    />

                    {
                        errors.name?.message && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                        )
                    }
                </div>

                {
                    errors.name?.message && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.name?.message.toString()}
                        </p>
                    )
                }
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {intl('form.fields.email')}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                        value={email}
                        disabled
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {intl('form.fields.password')}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        errors.password?.message
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        {...register("password", { required: true })}
                        type={showPassword ? 'text' : 'password'}
                    />

                    {
                        errors.password?.message && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                        )
                    }
                </div>

                {
                    errors.password?.message && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.password?.message.toString()}
                        </p>
                    )
                }
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    {intl('form.fields.repeatPassword')}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <input className={
                        errors.repeatPassword?.message
                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    }
                        {...register("repeatPassword", { required: true })}
                        type={showPassword ? 'text' : 'password'}
                    />

                    {
                        errors.repeatPassword?.message && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                            </div>
                        )
                    }
                </div>

                {
                    errors.repeatPassword?.message && (
                        <p className="mt-2 text-sm text-red-600" id="email-error">
                            {errors.repeatPassword?.message.toString()}
                        </p>
                    )
                }
            </div>

            {/* --- END OF FIELDS --- */}

            <div className="flex items-center mt-5">
                <input onClick={() => setShowPassword(!showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                    id="showPassword"
                    type="checkbox"
                />
                <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                    {intl('component.auth.showPassword')}
                </label>
            </div>

            <button className="flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="submit"
            >
                {
                    isPending && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                        </svg>
                    )
                }

                {intl('component.auth.signUp')}
            </button>
        </form>
    )
}
