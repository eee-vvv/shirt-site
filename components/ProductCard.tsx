import Link from 'next/link';
import React from 'react';
import styles from '../styles/ProductCard.module.css';

type Props = {
  id: number;
  imageId: string;
  price: number;
  name: string;
};

const ProductCard = ({ id, imageId, price, name }: Props) => {
  return (
    <Link href={`/${id}`}>
      <a>
        <div className={styles.productCard}>
          <h2>{name}</h2>
          <img src="https://img.ssensemedia.com/images/b_white,c_lpad,g_center,h_1412,w_940/c_scale,h_960/f_auto,dpr_2.0/222565F521004_1/gramicci-brown-tapered-loose-pants.jpg" className={styles.image}></img>
          <div>${price}</div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
