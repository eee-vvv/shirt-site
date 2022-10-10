import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

import { allProducts } from '../lib/db';

const Home: NextPage = () => {
  const isAdmin = true;
  const [showProductForm, setShowProductForm] = useState(false);

  const handleProductFormToggle = () => {
    setShowProductForm((prev) => !prev)
  };

  return (
    <div>
      <Head>
        <title>Shirt Site!</title>
        <meta name="description" content="A site to buy shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shirt Site!</h1>

        {
          // if user is admin, render add product button or
          // new product form depending on toggle status
          isAdmin &&
            (showProductForm ? (
              <div>
                <AddProductForm />
                <button onClick={handleProductFormToggle}>Hide New Product Form</button>
              </div>
            ) : (
              <button onClick={handleProductFormToggle}>Add New Product</button>
            ))
        }
        {allProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageId={product.imagesId}
            price={product.price}
          />
        ))}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
