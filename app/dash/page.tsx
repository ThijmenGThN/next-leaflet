'use client'

import { profile } from '@/helpers/user'

import type { iUser } from '@/types/globals'
import { useEffect, useState } from 'react'

export default function Page() {
	const [user, setUser] = useState<iUser>()

	useEffect(() => {
		profile()
			.then(data => setUser(data))
	}, [user])

	return (
		<div className='bg-gray-50 p-10 min-h-screen'>
			<div className='overflow-hidden rounded-lg bg-white shadow'>
				<div className='px-4 py-5 sm:p-6'>
					<pre>{JSON.stringify(user)}</pre>
				</div>
			</div>
		</div>
	)
}
