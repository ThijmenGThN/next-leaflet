import Client from './Client'

export default async function Page({
    params,
}: {
    params: { token: string }
}) {
    const { token } = await params
    return <Client token={token} />
}
