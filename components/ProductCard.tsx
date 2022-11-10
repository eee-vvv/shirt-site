import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Product } from '../interfaces';
import styles from '../styles/ProductCard.module.css';

// temporary
import image1 from '../public/fakeshirts/1.jpg';
import image2 from '../public/fakeshirts/2.jpg';
import image3 from '../public/fakeshirts/3.jpg';
import image4 from '../public/fakeshirts/4.jpg';
import image5 from '../public/fakeshirts/5.jpg';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, imagesId } = product;

  let productImage;

  // temporary
  switch (id) {
    case 1:
      productImage = image1;
      break;
    case 2:
      productImage = image2;
      break;
    case 3:
      productImage = image3;
      break;
    case 4:
      productImage = image4;
      break;
    case 5:
      productImage = image5;
      break;
    default:
      productImage = image1;
  }

  return (
    <Link href={`/${id}`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.name}>{name}</div>
          <div>${price}</div>
          <Image
            src={productImage}
            alt="product image (replace with meaningful alt text)"
          />
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
