"use client"

import { useTranslations } from "next-intl"

export default function TokenError({ reset }: { reset: () => void }) {
    const intl = useTranslations()

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

            <div className="px-4 py-5 sm:px-6">
                <p className="flex px-4 sm:px-6 items-center justify-center gap-x-6 py-3">
                    {intl('page.dashboard.token.error')}
                </p>

                <div className="mt-3 flex items-center justify-end gap-x-6">
                    <button className="flex gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        onClick={() => reset()}
                    >
                        {intl('form.actions.tryAgain')}
                    </button>
                </div>
            </div>
        </div>
    )
}
