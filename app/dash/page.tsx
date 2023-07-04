import { currentProfile } from '@/helpers/server/user'

import type { iUser } from '@/types/globals'

export default async function Page() {

	const user: iUser = await currentProfile()

	return (
		<div className='bg-gray-50 p-10 min-h-screen'>
			<div className='overflow-hidden rounded-lg bg-white shadow'>
				<div className='px-4 py-5 sm:p-6'>
					{user.email}
				</div>
			</div>
		</div>
	)
}
