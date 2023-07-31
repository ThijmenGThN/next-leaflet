"use client"

import { useEffect, useState } from 'react'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {

    const [errorMessage, setErrorMessage] = useState<string>()

    useEffect(() => {
        setErrorMessage(error.message)
    }, [error])

    return (
        <div className="divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">API Tokens</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Private authorization tokens to request data from our endpoint.
                </p>
            </div>

            <div className="px-4 py-5 sm:px-6">
                <p className="flex px-4 sm:px-6 items-center justify-center gap-x-6 py-10">
                    {errorMessage}
                </p>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    )
}
