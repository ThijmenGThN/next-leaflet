"use client"

import { z } from 'zod'
import Link from "next/link"
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod'

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

import gravatar from "@/helpers/gravatar"
import * as actions from "@/server/auth"

import aLogo from '@/assets/logo.webp'

export default function Page() {
    const intl = useTranslations()
    const [isPending, startTransition] = useTransition()

    const vForm = z.object({
        email: z.string().min(2, { message: intl('form.validation.email.short') }).max(64, { message: intl('form.validation.email.long') }).email(intl("form.validation.email.invalid"))
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vForm) })

    const [formEmail, setFormEmail] = useState<string>()
    const [hasBeenSent, setHasBeenSent] = useState<boolean>(false)

    const onSubmit = ({ email }: any) =>
        startTransition(async () => {
            if (!email) return

            await actions.reset(email)

            setFormEmail(email)
            setHasBeenSent(true)
        })

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <Image
                        className="mx-auto h-10 w-auto"
                        src={aLogo}
                        alt=""
                    />
                </Link>
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {intl('page.auth.resetPassword')}
                </h2>
            </div>

            <div className="relative my-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    {
                        hasBeenSent
                            ? (
                                <div className="flex flex-col items-center justify-center gap-y-4">
                                    <Image
                                        className="h-16 w-16 rounded-full bg-gray-50 border"
                                        src={gravatar(formEmail ?? '')}
                                        width={80}
                                        height={80}
                                        alt=""
                                    />
                                    <p className="truncate text-sm font-medium text-gray-900">{formEmail}</p>

                                    <p className="truncate text-sm mt-4 text-center font-medium text-gray-900">
                                        {intl("page.auth.emailResetAccount")}
                                    </p>
                                </div>
                            )
                            : (
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-gray-900">
                                            {intl("form.fields.email")}
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <input className={
                                                errors.email?.message
                                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            }
                                                {...register("email", { required: true })}
                                                type='email'
                                            />

                                            {
                                                errors.email?.message && (
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
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

                                        {intl('keyword.continue')}
                                    </button>
                                </form>
                            )
                    }
                </div>

                <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                    <Link href="/login">
                        ← {intl('page.auth.signInYourAccount')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
