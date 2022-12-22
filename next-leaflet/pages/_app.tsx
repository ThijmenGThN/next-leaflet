import Head from 'next/head'
import getConfig from 'next/config'
import { Directus } from '@directus/sdk'

import '/source/styles/globals.css'

import type { AppProps } from 'next/app'

const { publicRuntimeConfig: config } = getConfig()

export default function App({ Component, pageProps }: AppProps) {

  pageProps.API = new Directus(config.CORS_ENDPOINT)

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
