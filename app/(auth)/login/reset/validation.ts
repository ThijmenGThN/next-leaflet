import { z } from 'zod'

export const email = z.object({
    email: z.string()
        .min(2, { message: 'This email address is too short.' })
        .max(64, { message: 'This email address is too long.' })
        .email('This email address is not valid.')
})