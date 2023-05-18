import { Directus } from "@directus/sdk"

interface iOptions {
    useAdmin?: boolean
    auth?: {
        email: string
        password: string
    }
}

export default async function (options?: iOptions) {

    // -- BUILD: Construct Directus client
    const SDK = new Directus<any>(process.env.NEXT_PUBLIC_ENDPOINT ?? '')

    // -- SETTINGS: Will attempt login based on set option
    if (options?.useAdmin && process.env.STATIC_TOKEN) await SDK.auth.static(process.env.STATIC_TOKEN)
    else if (options?.auth) await SDK.auth.login(options.auth)

    return SDK
}
