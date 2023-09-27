"use client"

import { useSession } from 'next-auth/react'

import validate from '@/helpers/validation'
import Form from '@/components/Form'

export default function Page() {
    const { data: session, update } = useSession()

    const onSubmit = async ({ name }: any) => {
        await fetch('/api/dashboard/account', { method: 'POST', body: JSON.stringify({ name, email: 'harold@mail.com' }) })
        update()
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Information related to your account
                </p>
            </div>

            <div className='px-4 py-5 sm:px-6'>
                <Form
                    onSubmit={onSubmit}
                    validator={validate.objects.name}
                    submit={{ label: 'Save', position: 'right' }}
                    fields={[
                        { id: 'name', type: 'text', label: 'Name', value: session?.user.name }
                    ]}
                />
            </div>
        </div>
    )
}
