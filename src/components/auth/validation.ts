import { z } from 'zod'

export const registration = z.object({
    name: z.string()
        .min(2, { message: 'This name is too short.' })
        .max(32, { message: 'This name is too long.' }),
    email: z.string()
        .min(2, { message: 'This email address is too short.' })
        .max(64, { message: 'This email address is too long.' })
        .email('This email address is not valid.'),
    password: z.string()
        .min(8, { message: 'This password is too short.' })
        .max(32, { message: 'This password is too long.' }),
    repeatPassword: z.string()
        .min(8, { message: 'This password is too short.' })
        .max(32, { message: 'Password is too long.' })
})
    .refine(({ password, repeatPassword }) => password == repeatPassword, {
        message: 'The passwords do not match.',
        path: ['repeatPassword']
    })
