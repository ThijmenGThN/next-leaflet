import type { iUser } from '@/types/globals'

export async function currentProfile() {
	try {
		return (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/profile`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json()
	} catch (error: any) {
		throw error
	}
}

export async function login(user: iUser) {
	try {
		const { email: username, password } = user

		return (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${btoa(`${username ?? ''}:${password ?? ''}`)}`,
				'Content-Type': 'application/json'
			}
		})).json()
	} catch ({ response: { data: error } }: any) {
		throw error
	}
}

export async function register(user: iUser) {
	try {
		const { email: username, password, ...details } = user

		return (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${btoa(`${username ?? ''}:${password ?? ''}`)}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(details)
		})).json()
	} catch ({ response: { data: error } }: any) {
		throw error
	}
}
