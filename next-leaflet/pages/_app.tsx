import Head from 'next/head'
import getConfig from 'next/config'
import { Directus } from '@directus/sdk'

import '@/styles/globals.css'

import type { AppProps } from 'next/app'

const { publicRuntimeConfig: config } = getConfig()

export default function App({ Component, pageProps }: AppProps) {

  pageProps.API = new Directus(config.CORS_ENDPOINT ? config.CORS_ENDPOINT : 'http://localhost:8055')

  return (
    <>
      <Head>
        <title>Leaflet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
