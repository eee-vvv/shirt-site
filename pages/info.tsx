import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Client } from 'pg';
import { handleGetUnsoldProducts } from '../db/queryHandlers';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

import styles from '../styles/info.module.css';

const Info: NextPage = () => {
  return (
    <div className="page-container">
      <p className={styles.paragraph}>
        Mary Cave shirts are hand-printed in Philadelphia, PA. If you are
        located in Philadelphia and would like to organize a local
        pickup/delivery, you can email us at{' '}
        <a className="external-link" href="mailto:marycavemerch@gmail.com">
          marycavemerch@gmail.com
        </a>{' '}
        after purchasing. If you would like to be updated about new merchandise,
        please subscribe to our newsletter or follow{' '}
        <a
          className="external-link"
          href="https://www.instagram.com/_mary_cave_/"
          target="_blank"
          rel="noreferrer"
        >
          @_mary_cave_
        </a>{' '}
        on instagram. 
      </p>
      <p className={styles.paragraph}>
        Our shirts, in an effort to reanimate second and third-hand goods, are
        often found in a less-than-perfect state. Because many of the shirts we
        use are on their second life, some imperfections in the fabric are to be
        expected. We print by hand, which also means the graphic itself is
        subject to variation; each product is unique. Please refer to the
        measurements provided on each product page for sizing.
      </p>
    </div>
  );
};

export default Info;
