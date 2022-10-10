import Link from 'next/link';
import React from 'react';

type Props = {
  id: number;
  imageId: string;
  price: number;
  name: string;
};

const ProductCard = ({ id, imageId, price, name }: Props) => {
  return (
    <Link href={`/${id}`} >
      <a>
        <div>
          <h2>{name}</h2>
          <div>${price}</div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
