import { z } from "zod"

const vName = z.string().min(2, { message: "This name is too short" }).max(32, { message: "This name is too long" })
const vEmail = z.string().min(2, { message: "This email address is too short" }).max(64, { message: "This email address is too long" }).email("This email address is not valid")
const vPassword = z.string().min(8, { message: "This password is too short" }).max(64, { message: "This password is too long" })

const validators = {
    forms: {

        register: z.object({
            name: vName,
            password: vPassword,
            repeatPassword: vPassword
        }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: "The passwords do not match", path: ['repeatPassword'] }),

        login: z.object({
            email: vEmail,
            password: vPassword
        }),

        password: z.object({
            password: vPassword,
            repeatPassword: vPassword
        }).refine(({ password, repeatPassword }) => password == repeatPassword, { message: "The passwords do not match", path: ['repeatPassword'] })

    }
}

export default validators
