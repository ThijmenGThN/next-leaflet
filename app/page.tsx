import Link from 'next/link'
import Image from 'next/image'

import aLogo from '@/assets/logo.webp'

export default function Page() {
	return (
		<div className='m-auto flex flex-col gap-2 items-center'>

			<div className='flex gap-x-6 items-center'>
				<Image className='h-8 w-auto' src={aLogo} alt='Logo' />
				<p className='font-bold text-gray-900 text-5xl'>
					next-leaflet
				</p>
			</div>

			<p className='text-lg text-gray-600'>
				An optimized tech stack for efficiency.
			</p>

			<div className='flex mt-6 gap-x-6 items-center'>
				<Link className='rounded-md bg-theme-primary hover:bg-theme-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-theme-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary'
					href='/login'
				>
					Sign in
				</Link>

				<a className='text-sm font-semibold leading-6 text-gray-900'
					href='https://github.com/ThijmenGThN/next-leaflet'
					target='_blank'
				>
					Learn more <span aria-hidden='true'>→</span>
				</a>
			</div>

		</div>
	)
}
