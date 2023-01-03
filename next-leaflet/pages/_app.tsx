import Head from 'next/head'
import getConfig from 'next/config'
import { Directus } from '@directus/sdk'

import type { AppProps } from 'next/app'

import '@/styles/globals.css'

const { publicRuntimeConfig: config } = getConfig()

export default function App({ Component, pageProps }: { Component: any, pageProps: AppProps }) {

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
