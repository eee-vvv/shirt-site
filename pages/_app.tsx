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

  useEffect(() => {
    const localCartProducts = localStorage.getItem('cartProducts');
    setCartProducts(localCartProducts ? JSON.parse(localCartProducts) : []);
  }, []);

  useEffect(() => {
    if (cartProducts !== initialState) {
      localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  }, [cartProducts, initialState]);

  return (
    <Auth0Provider
      domain={'dev-q3oslrvzaqqu40xb.us.auth0.com'}
      clientId={'2OFZQbMbk8IfppliTNNxTq79IxlIIVKn'}
      redirectUri={'https://google.com/'}
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

export default MyApp;
