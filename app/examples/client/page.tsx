"use client"

import { signOut, useSession } from 'next-auth/react'

export default function Page() {
  const { data: session, status } = useSession()

  return (
    <>
      <p>Client-side example</p>

      <p>{JSON.stringify(session)}</p>
      <p>{status}</p>

      <button onClick={() => signOut()}>Logout</button>
    </>
  )
}
