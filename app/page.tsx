import Link from 'next/link'
import Image from 'next/image'

import aLogo from '@/assets/logo.webp'

export default function Page() {
	return (
		<div className='bg-white min-h-screen overflow-hidden'>
			<Header />

			<Container>
				<div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
					<div className='text-center'>
						<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>next-leaflet</h1>
						<p className='mt-6 text-lg leading-8 text-gray-600'>An optimized tech stack for efficiency.</p>
						<div className='mt-10 flex items-center justify-center gap-x-6'>
							<Link
								href='/login'
								className='rounded-md bg-theme-primary hover:bg-theme-primary-dark px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-theme-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary'
							>
								Dashboard
							</Link>
							<a
								href='https://github.com/ThijmenGThN/next-leaflet'
								target='_blank'
								className='text-sm font-semibold leading-6 text-gray-900'
							>
								Learn more <span aria-hidden='true'>→</span>
							</a>
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}

function Header() {
	return (
		<div className='absolute inset-x-0 top-0 z-50'>
			<div className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
				<div className='flex lg:flex-1'>
					<Link href='/' className='-m-1.5 p-1.5'>
						<Image className='h-8 w-auto' src={aLogo} alt='Logo' />
					</Link>
				</div>
				<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
					<Link href='/login' className='text-sm font-semibold leading-6 text-gray-900'>
					Sign in <span aria-hidden='true'>&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	)
}

function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className='relative isolate px-6 pt-14 lg:px-8'>
			<div
				className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
				aria-hidden='true'
			>
				<div
					className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-theme-primary to-theme-primary-darker opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
			</div>

			<div className='relative isolate px-6 pt-14 lg:px-8'>
				<div
					className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
					aria-hidden='true'
				>
					<div
						className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-theme-primary to-theme-primary-darker opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
						}}
					/>
				</div>

				{children}
			</div>

			<div
				className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
				aria-hidden='true'
			>
				<div
					className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-theme-primary to-theme-primary-darker opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
					}}
				/>
			</div>
		</div>
	)
}
