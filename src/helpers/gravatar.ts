import { MD5 } from 'crypto-js'

type iTypes = 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash'

export default (email: string, type?: iTypes) => `https://www.gravatar.com/avatar/${MD5(email.trim().toLowerCase())}?s=200&r=g&d=${type ?? 'identicon'}`
