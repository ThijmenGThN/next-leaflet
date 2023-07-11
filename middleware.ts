import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

// ----- JWT Validator -----
async function verifySession(token: string) {
	try {
		if (!process.env.JWT_SECRET) throw 'Something went wrong, try again later.'

		const secret = new TextEncoder().encode(process.env.JWT_SECRET)

		return await jwtVerify(token, secret)
	} catch (error) {
		throw 'Unable to validate session.'
	}
}

// ----- Route Middleware -----
export async function middleware(req: NextRequest) {
	const response = NextResponse.next()
	const match = (url: string) => req.nextUrl.pathname.startsWith(url)

	try {

		if (match('/logout')) {
			response.cookies.delete('sessionToken')
			return NextResponse.redirect(new URL('/login', req.url))
		}

		// User is already logged in.
		if (match('/login') || match('/register')) return NextResponse.redirect(new URL('/dash', req.url))

		// Protected route.
		if (match('/dash')) {
			const { value: sessionToken } = req.cookies.get('sessionToken') ?? { value: '' }

			if (!(await verifySession(sessionToken))) throw 'Session has expired, authentication required.'
		}

	} catch (error) {
		console.error(error)
		return NextResponse.redirect(new URL('/login', req.url))
	}

	return response
}
