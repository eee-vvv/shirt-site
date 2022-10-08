import React from 'react';

type Props = {
  id: number;
  imageId: string;
  price: number;
  name: string;
};

const ProductCard = ({ id, imageId, price, name }: Props) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>${price}</div>
    </div>
  );
};

export default ProductCard;
