import { GetServerSideProps } from 'next/types';
import { useState, useEffect, createContext } from 'react';
import { handleGetUnsoldProducts } from '../db/queryHandlers';
import type { Product } from '../interfaces';

const ProductsContext = createContext<Product[]>([]);

type Props = {
  children: React.ReactNode;
};

const ProductsContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect( () => {
    handleLoad().then( (products) => {
      if (products){
        setProducts(products)
      }
      else {
        console.log("no prodcuts loaded")
      }
    })
  }, [])

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const products = await handleGetUnsoldProducts();
//   return { props: { data: products } };
// };

const handleLoad = async () => {
  const response = await fetch(`/api/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const result = await response.json();
  return result
};


export { ProductsContext, ProductsContextProvider };
