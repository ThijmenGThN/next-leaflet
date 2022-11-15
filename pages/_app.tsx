import Head from 'next/head'
import { Directus } from '@directus/sdk'

import type { AppProps } from 'next/app'

import '/source/styles/globals.css'

export default function ({ Component, pageProps }: AppProps) {

  pageProps.API = new Directus(process.env.DIRECTUS_ENDPOINT || "http://127.0.0.1:8055")

  return (
    <>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
