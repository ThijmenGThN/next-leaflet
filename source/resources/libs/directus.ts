import { Directus } from "@directus/sdk"

let { CORS_ENDPOINT, STATIC_TOKEN } = process.env

interface iOptions {
    useAdmin?: boolean
    auth?: {
        email: string
        password: string
    }
}

export default async function (options?: iOptions) {

    // -- VALIDATE: If unset, override with the default
    CORS_ENDPOINT = CORS_ENDPOINT ? CORS_ENDPOINT : 'http://localhost:8055'
    STATIC_TOKEN = STATIC_TOKEN ? STATIC_TOKEN : ''

    // -- BUILD: Construct Directus client
    const SDK = new Directus<any>(CORS_ENDPOINT)

    // -- SETTINGS: Will attempt login based on set option
    if (options?.useAdmin) await SDK.auth.static(STATIC_TOKEN)
    else if (options?.auth) await SDK.auth.login(options.auth)

    return SDK
}
