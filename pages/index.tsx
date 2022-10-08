import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import ProductCard from '../components/ProductCard';

import { allProducts } from '../lib/db';

const Home: NextPage = () => {
  console.log('all shirts: ', allProducts);
  return (
    <div>
      <Head>
        <title>Shirt Site!</title>
        <meta name="description" content="A site to buy shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shirt Site!</h1>
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
