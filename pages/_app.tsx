import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ProductsContextProvider } from '../lib/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ProductsContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ProductsContextProvider>
  )
}

export default MyApp
