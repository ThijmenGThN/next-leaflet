import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookie = await cookies()
    cookie.delete("project")
    cookie.delete("payload-token")

    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/login')
}
