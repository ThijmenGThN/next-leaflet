import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    try {
        // -- OBTAIN: Converts base64 auth string to email and password.
        const encoded = req.headers.get('Authorization')?.replace(/^Basic\s+/i, '') ?? ''
        const decoded = Buffer.from(encoded, 'base64').toString()
        const [email, password] = decoded.split(':')
    }

    catch (error) {
        console.error(error)
        return NextResponse.json({ message: `Error: ${error}`, status: 500 })
    }
}
