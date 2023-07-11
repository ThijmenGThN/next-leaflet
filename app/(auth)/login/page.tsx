import Link from 'next/link'
import Image from 'next/image'

import Login from '@/components/Login'

import aLogo from '@/assets/logo.webp'

export default function Page() {
	return (
		<div className='m-auto flex flex-col gap-8'>
			<div className='flex flex-col gap-y-4'>
				<Link href='/'><Image priority className='h-10 w-auto' src={aLogo} alt='Logo' /></Link>

				<p className='text-2xl font-bold text-gray-900'>
					Sign in to your account
				</p>
			</div>

			<Login />

			<div className='flex justify-between'>
				<Link
					href='/'
					className='text-sm font-semibold text-theme-primary hover:text-theme-primary-dark'
				>
					<span aria-hidden='true'>&larr;</span> Back to home
				</Link>

				<Link
					href='/register'
					className='text-sm font-semibold text-theme-primary hover:text-theme-primary-dark'
				>
					Register
				</Link>
			</div>
		</div>
	)
}
