
import Pocketbase from 'pocketbase'

var pb: Pocketbase

// -- Server
if (typeof window === 'undefined') {
    if (process.env.COMPOSE_PROFILES?.toLocaleLowerCase() != 'prod') pb = new Pocketbase('http://0.0.0.0:8090')
    else pb = new Pocketbase('http://pocketbase:' + process.env.POCKETBASE_PORT)
}

// -- Client
else {
    pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)

    pb.authStore.loadFromCookie(document.cookie)

    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
    })

    // Prevents exceptions, nextjs in dev-mode executes effects twice.
    if (process && process.env.NODE_ENV === 'development') pb.autoCancellation(false)
}

export default pb
