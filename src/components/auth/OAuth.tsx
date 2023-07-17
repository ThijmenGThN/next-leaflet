"use client"

import { signIn } from "next-auth/react"

export default function OAuth({ providers }: any) {

    return (
        <div>
            <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">Or continue with</span>
                </div>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-4">
                {
                    Object.keys(providers).map((key: string, index: number) => (
                        <li key={index}>
                            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-black px-3 py-1.5 text-white"
                                onClick={() => signIn(providers[key].id)}
                            >
                                <span className="text-sm font-semibold leading-6">{providers[key].name}</span>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}