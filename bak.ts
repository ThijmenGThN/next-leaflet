import { NextResponse as res } from "next/server"

import pb from "@/helpers/pocketbase"

import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {

    try {
        const authCookie = { pb_auth: req.cookies.get("pb_auth")?.value || '' }

        let cookie = ''
        for (const [key, value] of Object.entries(authCookie)) {
            cookie += `${encodeURIComponent(key)}=${encodeURIComponent(value)}; `
        }

        pb.authStore.loadFromCookie(cookie.trimEnd())

        console.log(await pb.collection('users').authRefresh())
        console.log(await pb.authStore.isValid)
    }
    catch (e) {
        pb.authStore.clear()

        return res.redirect(new URL('/login', req.url))
    }

    return res.next()

    if (authCookie) {
        try {
            console.log('Loadinng cookie:', request_cookie)

            const cookie = { pb_auth: request_cookie?.value || '' }
            let encodedCookie = ''
            for (const [key, value] of Object.entries(cookie)) {
                encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(
                    value,
                )}; `
            }
            console.log('Encoded Cookie: ', encodedCookie)
            pb.authStore.loadFromCookie(encodedCookie.trimEnd())
            // console.log('Model: ', pb.authStore)
        } catch (error) {
            console.log('Error Loading from cookie: ', error)
            pb.authStore.clear()
            res.headers.set(
                'set-cookie',
                pb.authStore.exportToCookie({ httpOnly: false }),
            )
        }
    }

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && (await pb.collection('users').authRefresh())
        console.log('authstore is valid')
        // console.log('authstore:', pb.authStore)
    } catch (err) {
        console.log('Invalid authstore: ', err)
        // clear the auth store on failed refresh
        pb.authStore.clear()
        res.headers.set(
            'set-cookie',
            pb.authStore.exportToCookie({ httpOnly: false }),
        )
    }

    // console.log('Model: ', pb.authStore)
    if (!pb.authStore.model && !req.nextUrl.pathname.startsWith('/login')) {
        const redirect_to = new URL('/login', req.url)
        if (req.nextUrl.pathname) {
            redirect_to.search = new URLSearchParams({
                next: req.nextUrl.pathname,
            }).toString()
        } else {
            redirect_to.search = new URLSearchParams({
                next: '/',
            }).toString()
        }
        console.log('No Model and not on login. Redirectinng to: ', redirect_to)
        return NextResponse.redirect(redirect_to)
    }

    if (pb.authStore.model && req.nextUrl.pathname.startsWith('/login')) {
        const next_url = req.headers.get('next-url') as string
        if (next_url) {
            const redirect_to = new URL(next_url, req.url)
            return NextResponse.redirect(redirect_to)
        }
        const redirect_to = new URL(`/`, req.url)
        return NextResponse.redirect(redirect_to)
    }

    return response
}

export const config = {
    matcher: ["/dash/:path*"]
}
