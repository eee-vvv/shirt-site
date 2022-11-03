import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { allProducts } from '../lib/db';
import { handleGetProduct } from '../db/queryHandlers';
import type { Product } from '../interfaces/index';

type Props = {
  data: Product | null;
};

const ProductPage: NextPage<Props> = ({ data }: Props) => {
  const product = data;

  const [showEdit, setShowEdit] = useState(false);

  if (product == null) {
    return <div>product not found</div>;
  }

  return (
    <div>
      <ToggleEditButton showEdit={showEdit} setShowEdit={setShowEdit} />
      {showEdit ? <EditProductForm /> : <ProductInfo product={product} />}
    </div>
  );
};

type ToggleEditButtonProps = {
  showEdit: Boolean;
  setShowEdit: Function;
};

function ToggleEditButton({ showEdit, setShowEdit }: ToggleEditButtonProps) {
  const toggleShowEdit = () => {
    setShowEdit((prev: Boolean) => !prev);
  };

  return (
    <button onClick={toggleShowEdit}>{showEdit ? 'X' : 'Edit Product'}</button>
  );
}

type ProductInfoProps = {
  product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="page-container">
      <h2>{product.name}</h2>
      <div>image: {product.imagesId}</div>
      <div>
        <ul>
          <li>
            <span>{product.price}</span>
            <span>{product.measurements}</span>
          </li>
          <li>{product.description}</li>
        </ul>
      </div>
    </div>
  );
}

type EditProductFormProps = {};

function EditProductForm() {
  return <div>Edit</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id;
  if (typeof id != 'string') {
    return { props: { data: null } };
  }
  const id_int = parseInt(id);
  const product = await handleGetProduct(id_int);
  return { props: { data: product } };
};

export default ProductPage;
