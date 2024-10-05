import Pocketbase from 'pocketbase'

var pb: Pocketbase

// -- Server
if (typeof window === 'undefined') {
    pb = new Pocketbase('http://pocketbase:8090')
}

// -- Client
else {
    pb = new Pocketbase(window.location.protocol + '//' + window.location.host + '/pb')

    // Cookie handler, loads and updates the pb_auth cookie.
    pb.authStore.loadFromCookie(document.cookie)
    pb.authStore.onChange(() => document.cookie = pb.authStore.exportToCookie({ httpOnly: false }))

    // Prevents exceptions, nextjs in dev-mode executes useEffects twice whilst react-strict mode is on.
    if (process && process.env.NODE_ENV === 'development') pb.autoCancellation(false)
}

// -- Server: Elevates permissions to Administrator rights.
async function elevateToAdmin() {
    try {
        if (typeof window !== 'undefined') throw new Error("This function is only available on the server.")

        if (!process.env.PBA_USER || !process.env.PBA_PASS) return false
        if (pb.authStore.isAdmin) return true

        await pb.admins.authWithPassword(process.env.PBA_USER, process.env.PBA_PASS, {
            autoRefreshThreshold: 30 * 60
        })
        return true
    } catch (e) {
        return false
    }
}

// -- Server: Ensure that the session is valid.
async function getUserFromCookies(cookies: any) {
    if (typeof window !== 'undefined') throw new Error("This function is only available on the server.")

    try {
        const authCookie = await cookies.get('pb_auth')
        pb.authStore.loadFromCookie('pb_auth=' + authCookie?.value)
        await pb.collection('users').authRefresh()
        return pb.authStore.isValid ? pb.authStore.model : false
    } catch (error) {
        return false
    }
}

export default pb
export { elevateToAdmin, getUserFromCookies }