import { useState, useEffect, createContext } from 'react';
import { handleGetUnsoldProducts } from '../db/queryHandlers';
import type { Product } from '../interfaces';

const ProductsContext = createContext<Product[]>([]);

type Props = {
  children: React.ReactNode;
};

const ProductsContextProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    handleGetUnsoldProducts()
      .then((products) => {
        if (products) {
          setProducts(products);
        } else {
          console.log(
            'whoops! handleGetUnsoldProducts promise resolved to type null'
          );
        }
      })
      .catch((e) => {
        console.error('error fetching products: ', e);
      });
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext, ProductsContextProvider };
