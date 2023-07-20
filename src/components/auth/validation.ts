import { z } from 'zod'

export const registration = z.object({
    name: z.string()
        .min(2, { message: 'Name is too short.' })
        .max(32, { message: 'Name is too long.' }),
    email: z.string()
        .min(2, { message: 'Email is too short.' })
        .max(32, { message: 'Email is too long.' })
        .email('Invalid email address.'),
    password: z.string()
        .min(8, { message: 'Password is too short.' })
        .max(32, { message: 'Password is too long.' }),
    repeatPassword: z.string()
        .min(8, { message: 'Password is too short.' })
        .max(32, { message: 'Password is too long.' })
})
