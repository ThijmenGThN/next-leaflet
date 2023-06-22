import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request) {

    try {
        const auth = request.headers.get('Authorization')?.split(' ')[1]

        const [email, password] = atob(auth?.replace() ?? "")

        return new NextResponse(`Email: ${email}\nPassword: ${password}`, { status: 200 })
    }
    catch (error) {
        return new NextResponse(`Error: ${error}`, { status: 500 })
    }

}
