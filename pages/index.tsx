import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { Client } from 'pg';
import { handleGetUnsoldProducts } from '../db/queryHandlers';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

import styles from '../styles/Home.module.css';

import type { Product } from '../interfaces';

import { allProducts } from '../lib/db';
import DeleteButton from '../components/DeleteButton';
import { CartContext, ProductsContext } from '../lib/context';


const Home: NextPage = () => {
  const products = useContext(ProductsContext)
  const [cartProducts, setCartProducts] = useContext(CartContext)
  //console.log(cartProducts)
  const isAdmin = true;
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductFormToggle = () => {
    setShowProductForm((prev) => !prev);
  };

  return (
    <div>
      <Head>
        <title>mary cave</title>
        <meta name="description" content="A site to buy shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="page-container">
          <h1>Shirts</h1>

          {
            // if user is admin, render add product button or
            // new product form depending on toggle status
            isAdmin &&
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
              <div key={product.id}>
                <ProductCard product={product} />
                {isAdmin && (
                  <DeleteButton id={product.id} buttonContent="Delete" />
                )}
                {
                <button
                key={product.id}
                onClick={() => setCartProducts([...cartProducts, product.id])}>
                add to cart
                </button>
                }
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
