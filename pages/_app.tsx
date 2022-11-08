import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { ProductsContextProvider, CartContext } from '../lib/context'
import { useState, useEffect } from 'react'

function getInitialCartState(): number[] {
  const cartProducts = typeof window !== 'undefined'? localStorage.getItem('cartProducts'): null
  return cartProducts ? JSON.parse(cartProducts) : []
}


function MyApp({ Component, pageProps }: AppProps) {
  const [cartProducts, setCartProducts] = useState(getInitialCartState())

  useEffect(() => {
    console.log('context:', cartProducts)
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])

  return (
  <ProductsContextProvider>
    <CartContext.Provider value={[cartProducts, setCartProducts]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  </ProductsContextProvider>
  )
}

export default MyApp
