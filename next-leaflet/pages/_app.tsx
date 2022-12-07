import Head from 'next/head'
import getConfig from 'next/config'
import { Directus } from '@directus/sdk'

import type { AppProps } from 'next/app'

import '/source/styles/globals.css'

const { publicRuntimeConfig: config } = getConfig()

export default function App({ Component, pageProps }: AppProps) {

  pageProps.API = new Directus(config.API_URL ? config.API_URL : 'http://localhost:8055')

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
