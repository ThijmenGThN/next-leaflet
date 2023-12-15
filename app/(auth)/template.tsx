"use client"

import { redirect } from 'next/navigation'

import pb from "@/helpers/pocketbase"

import type { ReactNode } from "react"

export default function RestrictiveTemplate({ children }: { children: ReactNode }) {

    if (pb.authStore.isValid) return redirect('/dash')

    return (
        <>
            {children}
        </>
    )
}
