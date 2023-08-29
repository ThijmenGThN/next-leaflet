"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

type iAcceptedFields = 'name' | 'email' | 'password' | 'repeatPassword'
type iAcceptedOptions = 'showPassword'

interface iProps {
    onSubmit: any
    validator: any
    submitLabel: string
    fields: Array<iAcceptedFields>
    options?: Array<iAcceptedOptions>
}

interface iFields {
    type: iAcceptedFields
    errorMessage: string | undefined
    register: any
    errors: any
    showPassword: any
}

interface iOptions {
    type: iAcceptedOptions
    showPassword: any
    setShowPassword: any
}

export default function Form(props: iProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(props.validator) })

    const [isPending, setIsPending] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    async function onSubmit(data: any) {
        setIsPending(true)
        await props.onSubmit(data).catch((message: string) => setErrorMessage(message))
        setIsPending(false)
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {
                props.fields.map((field, index) => (
                    <Fields
                        key={index}
                        type={field}
                        errorMessage={errorMessage}
                        register={register}
                        errors={errors}
                        showPassword={showPassword}
                    />
                ))
            }

            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

            {
                props.options && props.options.map((option, index) => (
                    <Options
                        key={index}
                        type={option}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                ))
            }

            <button className="flex w-full gap-x-2 items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                type="submit"
            >
                {
                    isPending && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 animate-spin">
                            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                        </svg>
                    )
                }

                {props.submitLabel}
            </button>
        </form>
    )
}

function Fields(props: iFields) {
    switch (props.type) {

        case 'name':
            return (
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input className={
                            props.errors.name?.message
                                ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        }
                            {...props.register("name", { required: true })}
                            type='text'
                            autoComplete="name"
                        />

                        {
                            props.errors.name?.message && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>
                            )
                        }
                    </div>

                    {
                        props.errors.name?.message && (
                            <p className="mt-2 text-sm text-red-600" id="email-error">
                                {props.errors.name?.message.toString()}
                            </p>
                        )
                    }
                </div>
            )

        case 'email':
            return (
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input className={
                                (props.errorMessage || props.errors.email?.message)
                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            }
                                {...props.register("email", { required: true })}
                                type="email"
                                autoComplete="email"
                            />

                            {
                                props.errors.email?.message && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    </div>
                                )
                            }
                        </div>

                        {
                            props.errors.email?.message && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {props.errors.email?.message.toString()}
                                </p>
                            )
                        }
                    </div>
                </div>
            )

        case 'password':
            return (
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input className={
                                (props.errorMessage || props.errors.password?.message)
                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            }
                                {...props.register("password", { required: true })}
                                type={props.showPassword ? "text" : "password"}
                                autoComplete="current-password"
                            />

                            {
                                props.errors.password?.message && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    </div>
                                )
                            }
                        </div>

                        {
                            props.errors.password?.message && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {props.errors.password?.message.toString()}
                                </p>
                            )
                        }
                    </div>
                </div>
            )

        case 'repeatPassword':
            return (
                <div>
                    <label htmlFor="repeatPassword" className="block text-sm font-medium leading-6 text-gray-900">
                        Repeat Password
                    </label>
                    <div className="mt-2">
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <input className={
                                (props.errorMessage || props.errors.repeatPassword?.message)
                                    ? "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                                    : "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                            }
                                {...props.register("repeatPassword", { required: true })}
                                type={props.showPassword ? "text" : "password"}
                                autoComplete="new-password"
                            />

                            {
                                props.errors.repeatPassword?.message && (
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    </div>
                                )
                            }
                        </div>

                        {
                            props.errors.repeatPassword?.message && (
                                <p className="mt-2 text-sm text-red-600" id="email-error">
                                    {props.errors.repeatPassword?.message.toString()}
                                </p>
                            )
                        }
                    </div>
                </div>
            )
    }
}

function Options(props: iOptions) {
    switch (props.type) {

        case 'showPassword':
            return (
                <div className="flex items-center mt-5">
                    <input onClick={() => props.setShowPassword(!props.showPassword)} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                        id="showPassword"
                        type="checkbox"
                    />
                    <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900 hover:cursor-pointer">
                        Show password
                    </label>
                </div>
            )

    }
}