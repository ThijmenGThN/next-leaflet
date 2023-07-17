import { MD5 } from 'crypto-js'

type iTypes = 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash'

export default function gravatar(email: string, type?: iTypes) {

    const sanitizedEmail = email.trim().toLowerCase()

    const md5Hash = MD5(sanitizedEmail)

    return `https://www.gravatar.com/avatar/${md5Hash}?s=200&r=g&d=${type ?? 'identicon'}`
}
