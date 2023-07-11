import Link from 'next/link'
import Image from 'next/image'

import { profile } from '@/helpers/server/user'

import aLogo from '@/assets/logo.webp'

import type { iUser } from "@/types/globals"

export default async function Page() {

	const user: iUser = await profile()

	return (
		<div className='m-auto flex flex-col gap-8 min-w-[256px]'>
			<div className='flex flex-col gap-y-4'>
				<Link href='/dash'><Image priority className='h-10 w-auto' src={aLogo} alt='Logo' /></Link>

				<div>
					<p>Welcome back,</p>
					<p className='text-2xl font-bold text-gray-900'>
						{user.first_name ?? user.email}
					</p>
				</div>
			</div>

			<Link
				href='/logout'
				className='text-sm font-semibold text-theme-primary hover:text-theme-primary-dark'
			>
				Logout
			</Link>
		</div>
	)
}
