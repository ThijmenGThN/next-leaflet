"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import pb from "@/helpers/pocketbase"

import type { FormEvent } from 'react'

export default function Page() {
    const t = useTranslations('dash')

    const [users, setUsers] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<Boolean>(false)

    // This gets triggered when the form is submitted.
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        // Extract data from the form.
        const formData = new FormData(event.currentTarget)
        const recipient = formData.get('recipient') as string
        const title = formData.get('title') as string
        const message = formData.get('message') as string

        // If data has not been provided.
        if (!(
            recipient &&
            title &&
            message
        )) return setIsLoading(false)

        await pb.collection('notifications').create({
            user: recipient,
            title,
            message
        })

        // Disable the loader, add a small delay for a better user experience.
        setTimeout(() => setIsLoading(false), 500)
    }

    // Fetch all users from Pocketbase once the website loads.
    useEffect(() => {
        pb.collection('users').getFullList()
            .then(records => setUsers(records))
    }, [])

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
                <form onSubmit={onSubmit}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Notification Sender
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                This is an example on how to utilize Pocketbase
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-4">
                                    <label htmlFor="recipient" className="block text-sm font-medium leading-6 text-gray-900">
                                        Recipient
                                    </label>
                                    <select className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="recipient"
                                        name="recipient"
                                        defaultValue="placeholder"
                                    >
                                        <option value="placeholder" disabled>- Select a user -</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            placeholder="e.g. Planned maintenance"
                                            id="title"
                                            name="title"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                        Message
                                    </label>
                                    <div className="mt-2">
                                        <textarea className="block w-full min-h-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            placeholder="e.g. The website is expected to be down for an hour or two."
                                            name="message"
                                            id="message"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="flex items-center gap-x-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            {isLoading &&
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                                    <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                                </svg>
                            }
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
