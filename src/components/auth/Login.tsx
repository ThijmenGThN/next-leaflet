"use client"

import { useState } from 'react'
import PocketBase from 'pocketbase'

export default function Login() {

    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const pb = new PocketBase('http://10.0.0.112:8090')

    async function login() {

        if (!email || !password) return alert('All fields must be filled in.')

        try {
            const authData = await pb.collection('users').authWithPassword(email, password)

            console.log(authData)
        }

        catch (error) {
            console.log(error)
            alert('Invalid credentials!')
        }

    }

    return (
        <div className="flex flex-col gap-y-4">
            <input className="rounded border px-4 py-2"
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="mail@leaflet.app"
                type="email"
            />
            <input className="rounded border px-4 py-2"
                onChange={({ target: { value } }) => setPassword(value)}
                placeholder="Password"
                type="password"
            />
            <button className="mr-auto bg-black text-white px-4 py-2 rounded"
                onClick={login}
            >
                Login
            </button>
        </div>
    )
}
