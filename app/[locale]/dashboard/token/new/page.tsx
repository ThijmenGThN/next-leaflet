"use client"

import { z } from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from "react"
import { zodResolver } from '@hookform/resolvers/zod'

import * as actions from "@/server/dashboard"

import { DocumentDuplicateIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"

export default function Page() {
    const intl = useTranslations()
    const [isPending, startTransition] = useTransition()

    const vForm = z.object({
        name: z.string().min(2, { message: intl('form.validation.name.short') }).max(32, { message: intl('form.validation.name.long') }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vForm) })

    const [token, setToken] = useState<string>()

    const onSubmit = ({ name }: any) => startTransition(async () => setToken(await actions.createToken({ name })))

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {intl('page.dashboard.token.title')}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    {intl('page.dashboard.token.description')}
                </p>
            </div>

            {
                token
                    ? (
                        <div className="px-4 py-5 sm:px-6">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                {intl('page.dashboard.token.newToken')}
                            </label>
                            <div className="mt-2 flex rounded-md shadow-sm">
                                <p className="block w-full rounded-none truncate rounded-l-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 bg-gray-50 sm:text-sm sm:leading-6">
                                    {token}
                                </p>
                                <button className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 group hover:bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-primary focus:text-primary"
                                    onClick={() => navigator.clipboard.writeText(token)}
                                >
                                    <DocumentDuplicateIcon className="-ml-0.5 h-5 w-5 text-gray-400 group-focus:text-primary" />
                                    {intl('form.actions.copy')}
                                </button>
                            </div>

                            <p className="mt-3 text-xs leading-6 text-gray-600">
                                {intl('page.dashboard.token.keepSecure')}
                            </p>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    href="/dashboard/token"
                                    prefetch={false}
                                >
                                    {intl('page.dashboard.token.returnToOverview')}
                                </Link>
                            </div>
                        </div>
                    )
                    : (
                        <form className="px-4 py-5 space-y-6 sm:px-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    {intl('form.fields.tokenName')}
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <input className={
                                        errors.name?.message
                                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    }
                                        {...register("name", { required: true })}
                                        type='text'
                                        autoFocus
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

                                <p className="mt-3 text-xs leading-6 text-gray-600">
                                    {intl('page.dashboard.token.creationNotice')}
                                </p>
                            </div>

                            {/* --- END OF FIELDS --- */}

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <Link className="text-sm font-semibold leading-6 text-gray-900"
                                    href="/dashboard/token"
                                >
                                    {intl('form.actions.cancel')}
                                </Link>

                                <button className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    type="submit"
                                >
                                    {
                                        isPending && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                            </svg>
                                        )
                                    }

                                    {intl('page.dashboard.token.generateToken')}
                                </button>
                            </div>
                        </form>
                    )
            }
        </div>
    )
}
