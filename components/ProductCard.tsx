import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
  console.log('pcard!');
  const { id, name, price, imagesId } = product;
  const [image, setImage] = useState('');
  // listBuckets();
  // getBucket('product-images');

  const getImage = async () => {
    console.log('in get image');
    const response = await fetch(`/api/images/${id}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const imageBlob = await response.blob();
      console.log('blob: ', imageBlob);
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImage(imageObjectURL);
    } else {
      console.log('HTTP-Error: ' + response.status);
    }
  };

  useEffect(() => {
    getImage();
  }, [id]);

  const customImgLoader = ({ src }) => {
    return `${src}`;
  };

  const productImage = image1;
  console.log(image);

  return (
    <Link href={`/${id}`}>
      <a>
        <div className={styles.productCard}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>${price}</div>
          <Image
            loader={customImgLoader}
            className={styles.image}
            src={image === '' ? productImage : image}
            alt="product image (replace with meaningful alt text)"
            width={'300px'}
            height={'300px'}
          />
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
