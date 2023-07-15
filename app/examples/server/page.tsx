import { getServerSession } from "next-auth"

import options from "@/auth/options"

export default async function Page() {
  const session = await getServerSession(options)

  return (
    <>
      <p>Server-side example</p>

      <p>{JSON.stringify(session)}</p>
    </>
  )
}
