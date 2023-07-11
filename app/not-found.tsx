import Link from 'next/link'
import Image from 'next/image'

import aLogo from '@/assets/logo.webp'

export default function Page() {
	return (
		<div className='flex flex-col gap-y-8'>
			<div className='flex flex-col gap-y-4'>
				<Link href='/'><Image priority className='h-10 w-auto' src={aLogo} alt='Logo' /></Link>

				<p className='font-semibold text-theme-primary'>404</p>
				<div>
					<p className='text-4xl font-bold text-gray-900'>Page not found</p>
					<p className='mt-2 text-gray-600'>Sorry, we couldn't find the page you're looking for.</p>
				</div>
			</div>

			<div className='flex justify-between'>
				<Link
					href='/'
					className='text-sm font-semibold text-theme-primary hover:text-theme-primary-dark'
				>
					<span aria-hidden='true'>&larr;</span> Back to home
				</Link>

				<Link
					href='/login'
					className='text-sm font-semibold text-theme-primary hover:text-theme-primary-dark'
				>
					Login
				</Link>
			</div>
		</div>
	)
}
