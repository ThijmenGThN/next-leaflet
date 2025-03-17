import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookieStore = await cookies()
    cookieStore.delete("payload-token")
    cookieStore.delete("project")
    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/login')
}
