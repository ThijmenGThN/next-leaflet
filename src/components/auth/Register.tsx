"use client"

import { signIn } from "next-auth/react"
import { useState, useTransition } from "react"

import * as validate from './validation'
import * as actions from "./actions"

const callbackUrl = '/dashboard'

export default function Register() {
    const [isPending, startTransition] = useTransition()

    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [passwordValidation, setPasswordValidation] = useState<string>()

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    function submit() {
        if (!name || !email || !password || !passwordValidation) return setError('All fields are required.')
        if (password != passwordValidation) return setError('Passwords do not match')

        const { success, ...data } = validate.register.safeParse({ name, email, password })

        startTransition(async () => {
            await actions.register({ name, email, password })

            signIn('credentials', { email, password, callbackUrl })
        })
    }

    return (
        <div className="space-y-6" onKeyDown={({ key }) => key == 'Enter' && submit()}>
            <InputField name="Name" type="text" setState={setName} />
            <InputField name="Email address" type="text" setState={setEmail} />
            <InputField name="Password" type="password" showPassword={showPassword} setState={setPassword} />
            <InputField name="Repeat password" type="password" showPassword={showPassword} setState={setPasswordValidation} />

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <div className="flex items-center mt-5">
                <input onClick={() => setShowPassword(!showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                    id="showPassword"
                    type="checkbox"
                />
                <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                    Show password
                </label>
            </div>

            <div>
                <button className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    onClick={() => submit()}
                >
                    Sign up
                </button>
            </div>
        </div>
    )
}

interface iInputField {
    name: string
    error?: string
    setState: Function
    type: 'text' | 'password',
    showPassword?: boolean
}

function InputField(props: iInputField) {

    return (
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {props.name}
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <input className={
                    props.error
                        ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                        : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                }
                    type={props.type == 'password' ? props.showPassword ? 'text' : props.type : props.type}
                    onChange={({ target: { value } }) => props.setState(value)}
                />
            </div>
        </div>
    )
}