import React, { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { allProducts } from '../lib/db';
import { handleGetProduct } from '../db/queryHandlers';
import type { Product } from '../interfaces/index';
import styles from '../styles/ProductPage.module.css';

import productPic from '../public/fakeshirts/1.jpg';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';
import AddToCartButton from '../components/AddToCartButton';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

type Props = {
  data: Product | null;
};
// TODO: refactor to pull products from context instead of db
const ProductPage: NextPage<Props> = ({ data }: Props) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const product = data;

  const [showEdit, setShowEdit] = useState(false);

  if (product == null) {
    return <div>product not found</div>;
  }

  return (
    <div>
      {isAuthenticated && (
        <ToggleEditButton showEdit={showEdit} setShowEdit={setShowEdit} />
      )}
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

// TODO: carousel for multiple images

function ProductInfo({ product }: ProductInfoProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  useEffect(() => {
    getFileNames();
  }, [product.id]);

  const getFileNames = async () => {
    const response = await fetch(`/api/images/${product.id}`, {
      method: 'GET',
    });

    if (response.status === 200) {
      const result = await response.json();
      setFileNames(result.fileNames);
    }
  };

  return (
    <div className="page-container">
      <h2>{product.name}</h2>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Carousel showStatus={false}>
            {fileNames.map((fileName, idx) => {
              return (
                <div key={idx}>
                  <Image
                    src={`/products-images/${product.id}/${fileName}`}
                    alt="todo"
                    width="343px"
                    height="400px"
                  />
                </div>
              );
            })}
          </Carousel>
          <div className={styles.buttonGroup}>
            <div className={styles.price}>${product.price}</div>
            <AddToCartButton id={product.id} buttonContent="Add to Cart" />
          </div>
        </div>
        <div className={styles.informationContainer}>
          <div className={styles.description}>{product.description}</div>
          <div className={styles.measurements}>{product.measurements}</div>
        </div>
      </div>
    </div>
  );
}

type EditProductFormProps = {
  product: Product;
  setShowEdit: Function;
};

function EditProductForm({ product, setShowEdit }: EditProductFormProps) {
  const router = useRouter();
  const [editedProduct, setEditedProduct] = useState({ ...product });

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

  const editProductInDatabase = async (editedProduct: Product) => {
    const response = await fetch(`/api/product/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedProduct),
    });
    const result = await response.json();
    return result;
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const editedProductRes = editProductInDatabase(editedProduct)
      .then((product) => {
        if (product.message === 'product edited') {
          router.reload();
        } else {
          console.log('something went wrong...');
        }
      })
      .catch((e) => {
        console.log('something went wrong (catch) --> ', e);
      });
    setShowEdit((prev: Boolean) => !prev);
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
        <textarea
          name="description"
          onChange={handleChange}
          value={editedProduct.description}
        />
      </div>
      <div>
        <textarea
          name="measurements"
          onChange={handleChange}
          value={editedProduct.measurements}
        />
      </div>
      <div>
        <label>Sold</label>
        <select
          value={`${editedProduct.sold}`}
          name="sold"
          onChange={handleChange}
        >
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
