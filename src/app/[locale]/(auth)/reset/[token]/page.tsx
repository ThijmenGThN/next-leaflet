import Client from './Client'

export default async function Page({
    params,
}: {
    params: Promise<{ token: string }>
}) {
    const { token } = await params
    return <Client token={token} />
}
