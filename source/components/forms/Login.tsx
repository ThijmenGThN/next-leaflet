'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import * as user from '@/resources/helpers/client/user'

import locale from '@/locale/globals.json'

export default function Component() {
	const router = useRouter()

	const [email, setEmail] = useState<string>()
	const [password, setPassword] = useState<string>()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | undefined>()

	async function login() {
		setIsLoading(true)

		try {
			await user.login({ email, password })
			router.push('/dash')
		} catch (error) {
			setErrorMessage('' + error)
		}

		setIsLoading(false)
	}

	return (
		<div className='space-y-6' onKeyDown={({ key }) => key == 'Enter' && login()}>
			<div className='flex flex-col gap-2'>
				<label className='block text-sm font-medium leading-6 text-gray-900'>{locale.form.email}</label>
				<input
					className='block w-full rounded-md p-2 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-theme-primary sm:text-sm sm:leading-6'
					autoFocus
					type='email'
					autoComplete='email'
					onChange={({ target: { value } }) => setEmail(value)}
				/>
			</div>

			<div className='flex flex-col gap-2'>
				<label className='block text-sm font-medium leading-6 text-gray-900'>{locale.form.password}</label>
				<input
					className='block w-full rounded-md p-2 shadow-sm border border-gray-300 placeholder:text-gray-400 focus:border-2 focus:border-theme-primary sm:text-sm sm:leading-6'
					type='password'
					autoComplete='current-password'
					onChange={({ target: { value } }) => setPassword(value)}
				/>
			</div>

			{errorMessage && <p className='mt-2 italic text-red-500 text-sm'>{errorMessage}</p>}

			<button
				className='flex gap-2 w-full items-center justify-center rounded-md bg-theme-primary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-theme-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary'
				onClick={login}
			>
				<svg
					className={'w-5 h-5 animate-spin ' + (!isLoading && 'hidden')}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z'
						clipRule='evenodd'
					/>
				</svg>
				<p>{locale.form.auth.login}</p>
			</button>
		</div>
	)
}
