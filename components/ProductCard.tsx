import Link from 'next/link';
import React from 'react';
import { Product } from '../interfaces';
import styles from '../styles/ProductCard.module.css';

type ProductCardProps = {
  product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  const { id, name, price} = product;
  return (
    <Link href={`/${id}`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.name}>{name}</div>
          <div>${price}</div>
          <img src="https://img.ssensemedia.com/images/b_white,c_lpad,g_center,h_1412,w_940/c_scale,h_960/f_auto,dpr_2.0/222565F521004_1/gramicci-brown-tapered-loose-pants.jpg" className={styles.image}></img>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
