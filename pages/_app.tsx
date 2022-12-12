import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import {
  ProductsContextProvider,
  CartContext,
  StorageContext,
} from '../lib/context';
import { useState, useEffect, useMemo } from 'react';
import { StorageClient } from '@supabase/storage-js';
import type { Product } from '../interfaces';
import { Auth0Provider } from '@auth0/auth0-react';

function MyApp({ Component, pageProps }: AppProps) {
  const initialState: number[] = useMemo(() => [], []);
  const [cartProducts, setCartProducts] = useState(initialState);

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;

  useEffect(() => {
    const localCartProducts = localStorage.getItem('cartProducts');
    setCartProducts(localCartProducts ? JSON.parse(localCartProducts) : []);
  }, []);

  useEffect(() => {
    if (cartProducts !== initialState) {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }, [cartProducts, initialState]);

  if (!domain || !clientId) {
    return (
      <ProductsContextProvider>
        <CartContext.Provider value={[cartProducts, setCartProducts]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContext.Provider>
      </ProductsContextProvider>
    );
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <ProductsContextProvider>
        <CartContext.Provider value={[cartProducts, setCartProducts]}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContext.Provider>
      </ProductsContextProvider>
    </Auth0Provider>
  );
}

export { reportWebVitals } from 'next-axiom'
export default MyApp;
