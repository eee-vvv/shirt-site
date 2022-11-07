import React, { useState } from 'react';
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
      {showEdit ? (
        <EditProductForm product={product} setShowEdit={setShowEdit} />
      ) : (
        <ProductInfo product={product} />
      )}
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

type EditProductFormProps = {
  product: Product;
  setShowEdit: Function;
};

function EditProductForm({ product, setShowEdit }: EditProductFormProps) {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  console.log('edited product: ', editedProduct);

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    let val: any = target.value;

    if (target.name === 'sold') {
      val = target.value === 'true';
    }

    setEditedProduct((prevProduct: Product) => {
      return { ...prevProduct, [target.name]: val };
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('submitting!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Product</h2>
      <div>
        <input
          name="name"
          onChange={handleChange}
          value={editedProduct.name}
          type="text"
        />
      </div>
      <div>
        <input
          name="price"
          onChange={handleChange}
          value={editedProduct.price}
          type="number"
        />
      </div>
      <div>
        <input
          name="description"
          onChange={handleChange}
          value={editedProduct.description}
          type="text"
        />
      </div>
      <div>
        <input
          name="measurements"
          onChange={handleChange}
          value={editedProduct.measurements}
          type="text"
        />
      </div>
      <div>
        <label>Sold</label>
        <select value={`${editedProduct.sold}`} name="sold" onChange={handleChange}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <button>Submit Changes</button>
    </form>
  );
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
