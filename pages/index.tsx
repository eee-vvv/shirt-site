import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { Client } from 'pg';
import { handleGetUnsoldProducts } from '../db/queryHandlers';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import AddToCartButton from '../components/AddToCartButton';

import styles from '../styles/Home.module.css';

import type { Product } from '../interfaces';

import { allProducts } from '../lib/db';
import DeleteButton from '../components/DeleteButton';
import { CartContext, ProductsContext } from '../lib/context';

import { useAuth0 } from '@auth0/auth0-react';

const Home: NextPage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const products = useContext(ProductsContext);
  const [cartProducts, setCartProducts] = useContext(CartContext);
  //console.log(cartProducts)
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductFormToggle = () => {
    setShowProductForm((prev) => !prev);
  };

  const sortedProducts = products.sort((one, two) =>
    one.updated_at > two.updated_at ? -1 : 1
  );

  return (
    <div>
      <Head>
        <title>mary cave</title>
        <meta name="description" content="A site to buy shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="page-container">
          {
            // if user is admin, render add product button or
            // new product form depending on toggle status
            isAuthenticated &&
              (showProductForm ? (
                <div>
                  <AddProductForm />
                  <button onClick={handleProductFormToggle}>Cancel</button>
                </div>
              ) : (
                <button onClick={handleProductFormToggle}>
                  Add New Product
                </button>
              ))
          }
          <div className={styles.productCardsContainer}>
            {products.map((product: Product) => (
              <div className={styles.cardContainer} key={product.id}>
                <ProductCard product={product} />
                <div className={styles.cardButtons}>
                  {isAuthenticated && (
                    <DeleteButton id={product.id} buttonContent="Delete" />
                  )}
                  {
                    <AddToCartButton
                      id={product.id}
                      buttonContent="Add to cart"
                    />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const products = await handleGetUnsoldProducts();
//   return { props: { data: products } };
// };

export default Home;
