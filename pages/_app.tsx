import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import {
  ProductsContextProvider,
  CartContext,
  StorageContext,
} from '../lib/context';
import { useState, useEffect } from 'react';
import { StorageClient } from '@supabase/storage-js';

function getInitialCartState(): number[] {
  const cartProducts =
    typeof window !== 'undefined' ? localStorage.getItem('cartProducts') : null;
  return cartProducts ? JSON.parse(cartProducts) : [];
}

function MyApp({ Component, pageProps }: AppProps) {
  const [cartProducts, setCartProducts] = useState(getInitialCartState());

  const STORAGE_URL = `${process.env.SUPABASE_URL}/storage/v1`;
  let SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SERVICE_KEY) {
    SERVICE_KEY = 'nokey';
  }

  const storageClient = new StorageClient(STORAGE_URL, {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  });

  useEffect(() => {
    console.log('cart context:', cartProducts);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

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

export default MyApp;
