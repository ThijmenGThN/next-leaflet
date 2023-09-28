"use client"

import { useTranslations } from 'next-intl'

import validate from '@/helpers/validation'

import Form from '@/components/Form'

export default function Component({ name }: { name: string }) {
    const t = useTranslations('dashboard')

    const onSubmit = async ({ name }: any) => {
        await fetch('/api/auth/account/name/update', { method: 'POST', body: JSON.stringify({ name }) })
    }

    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                    {t('profile')}
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    {t('information-related-to-your-account')}
                </p>
            </div>

            <div className='px-4 py-5 sm:px-6'>
                <Form
                    onSubmit={onSubmit}
                    validator={validate.objects.name}
                    submit={{ label: 'Save', position: 'right' }}
                    fields={[
                        { id: 'name', type: 'text', label: t('name'), value: name }
                    ]}
                />
            </div>
        </div>
    )
}
