"use client"

import { z } from 'zod'
import { useTransition } from "react"
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

import gravatar from '@/helpers/gravatar'

import Loading from '@/components/interface/Loading'

const vForm = z.object({
    name: z.string().min(2, { message: 'This name is too short.' }).max(32, { message: 'This name is too long.' })
})

export default function Account() {

    const { data: session, status } = useSession()
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(vForm) })

    const onSubmit = ({ }: any) =>
        startTransition(async () => {

        })

    return (
        <form className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Information related to your account.
                </p>
            </div>
            <div className="space-y-6 px-4 py-5 sm:p-6">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        {
                            status == 'loading'
                                ? <Loading type="input" />
                                : (
                                    <input className={
                                        errors.name?.message
                                            ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                            : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                    }
                                        {...register("name", { required: true })}
                                        defaultValue={session?.user.name}
                                        type='text'
                                    />
                                )
                        }

                        {
                            errors.name?.message && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Avatar
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                        {
                            status == 'loading'
                                ? <Loading type="avatar" override='h-12 w-12' />
                                : (
                                    <img
                                        className="h-12 w-12 rounded-full bg-gray-50"
                                        src={gravatar(session?.user?.email ?? '')}
                                        alt=""
                                    />
                                )
                        }
                        <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
            <div className="px-4 py-4 sm:px-6">
                <div className='flex justify-end'>
                    <button className="flex rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        type="submit"
                    >
                        {
                            isPending && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                </svg>
                            )
                        }

                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
