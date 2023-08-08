"use client"

import { z } from "zod"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

const callbackUrl = '/dashboard'

export default function Component() {
    const intl = useTranslations()
    const router = useRouter()

    const vForm = z.object({
        email: z.string().min(2, { message: intl('form.validation.email.short') }).max(64, { message: intl('form.validation.email.long') }).email(intl("form.validation.email.invalid")),
        password: z.string().min(8, { message: intl('form.validation.password.short') }).max(64, { message: intl('form.validation.password.long') })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vForm) })

    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    async function onSubmit({ email, password }: any) {
        setIsPending(true)

        const { error }: any = await signIn('credentials', { email, password, redirect: false })

        if (error) setErrorMessage(intl('component.auth.signInFailed'))
        else {
            setErrorMessage(undefined)
            router.refresh()
            router.push(callbackUrl)
        }

        setIsPending(false)
    }

    useEffect(() => {
        router.prefetch(callbackUrl)
    }, [router])

    return (
        <>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        {intl('form.fields.email')}
                    </label>
                    <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input className={
                                (errorMessage || errors.email?.message)
                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            }
                                {...register("email", { required: true })}
                                type="email"
                            />

                            {
                                (errorMessage || errors.email?.message) && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    </div>
                                )
                            }
                        </div>

                        {
                            errors.email?.message && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {errors.email?.message.toString()}
                                </p>
                            )
                        }
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        {intl('form.fields.password')}
                    </label>
                    <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input className={
                                (errorMessage || errors.password?.message)
                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            }
                                {...register("password", { required: true })}
                                type={showPassword ? "text" : "password"}
                            />

                            {
                                (errorMessage || errors.password?.message) && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    </div>
                                )
                            }
                        </div>

                        {
                            errorMessage
                                ? <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                                : errors.password?.message && (
                                    <p className="mt-2 text-sm text-red-600" id="email-error">
                                        {errors.password?.message.toString()}
                                    </p>
                                )
                        }
                    </div>

                    <div className="flex items-center mt-5">
                        <input onClick={() => setShowPassword(!showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                            id="showPassword"
                            type="checkbox"
                        />
                        <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                            {intl('component.auth.showPassword')}
                        </label>
                    </div>
                </div>

                <button className="flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    type="submit"
                >
                    {
                        isPending && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                            </svg>
                        )
                    }

                    {intl('component.auth.signIn')}
                </button>
            </form>

            <div className="flex mt-5 items-center justify-between">
                <div className="text-sm leading-6">
                    <Link href="/forgot" className="font-semibold text-primary hover:text-primary-600">
                        {intl('component.auth.forgotPassword')}
                    </Link>
                </div>
                <div className="text-sm leading-6">
                    <Link href="/register" className="font-semibold text-primary hover:text-primary-600">
                        {intl('component.auth.createAccount')}
                    </Link>
                </div>
            </div>
        </>
    )
}
