import { cookies } from 'next/headers'

export async function profile() {
    try {
        const { value: sessionToken } = cookies().get('sessionToken') ?? { value: null }

        return (
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/profile`,
                {
                    headers: { Cookie: `sessionToken=${sessionToken}` }
                }
            )
        ).json()
    } catch (error: any) {
        throw error
    }
}
