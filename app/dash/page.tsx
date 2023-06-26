"use client"

import * as user from '@/helpers/user'

import type { iUser } from '@/types/globals'
import { useEffect, useState } from 'react'

export default function Page() {
    const [me, setMe] = useState<iUser>()

    useEffect(() => {

        user.me()
            .then(data => setMe(data))
            .catch(error => console.error(error))

    }, [me])

    return (
        <div className='bg-gray-50 p-10 min-h-screen'>
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    <pre>
                        {JSON.stringify(me)}
                    </pre>
                </div>
            </div>
        </div>
    )
}
