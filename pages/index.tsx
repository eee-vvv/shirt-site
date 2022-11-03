import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Client } from 'pg';
import { handleGetUnsoldProducts } from '../db/queryHandlers';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

import styles from '../styles/Home.module.css'

import type { Product } from '../interfaces';

import { allProducts } from '../lib/db';

type Props = {
  data: Product[];
};

const Home: NextPage<Props> = ({ data }: Props) => {
  const products = data
  const isAdmin = true;
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductFormToggle = () => {
    setShowProductForm((prev) => !prev);
  };

  // TODO:
  //  1) Make delete button into its own module so it can be reused
  //  2) Client-side handling of multiple clicks
  const handleDeleteSingleProduct = async (id:number) => {
    const response = await fetch(`/api/product/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify('product deleted'),
    });
    const result = await response.json();
    return result.data;
  }

  return (
    <div>
      <Head>
        <title>shirts</title>
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
                  <button onClick={handleProductFormToggle}>
                    Hide New Product Form
                  </button>
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
                <ProductCard
                  product={product}
                />
                {isAdmin && 
                <button onClick={() => handleDeleteSingleProduct(product.id)}>delete</button>}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await handleGetUnsoldProducts()
  return { props: { data: products }}
};

export default Home;
