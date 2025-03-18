import { cookies as useCookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    const cookies = await useCookies()
    cookies.delete("project")
    cookies.delete("payload-token")
    
    return NextResponse.redirect(process.env.NEXT_PUBLIC_DOMAIN + '/login')
}
