import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces';
import styles from '../styles/ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, imagesId } = product;
  // listBuckets();
  // getBucket('product-images');

  const productImage = require(`../public/products-images/${id}/1.jpg`);

  const getImage = async () => {
    const response = await fetch(`/api/images/${id}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      // setImage(imageObjectURL);
    } else {
      console.error('HTTP-Error: ' + response.status);
    }
  };

  // useEffect(() => {
  //   getImage();
  // }, [id]);

  // const customImgLoader = ({ src }) => {
  //   return `${src}`;
  // };
console.log('product: ', product)

  return (
    <Link href={`/${id}`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>${price}</div>
          {productImage === 'fallback' ? (
            <div>No image</div>
          ) : (
            <Image
              // loader={customImgLoader}
              className={styles.image}
              src={productImage}
              alt="product image (replace with meaningful alt text)"
              width={'258px'}
              height={'300px'}
            />
          )}
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
