import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NewProduct, JSONProduct } from '../interfaces/index';

// TODO: alt text

// temporary
const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const AddProductForm = () => {
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    price: '0',
    description: '',
    measurements: '',
    imagesId: `${getRandom(1, 5)}`,
  });

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const tempProduct = { ...product };
    if (
      target.name === 'price' &&
      isNaN(parseInt(target.value)) &&
      target.value != ''
    ) {
      tempProduct[target.name as keyof JSONProduct] = '';
      alert('please enter a number');
    } else {
      tempProduct[target.name as keyof JSONProduct] = target.value;
    }
    setProduct(tempProduct);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    // TODO: add validateProduct
    e.preventDefault();
    const productToSubmit = {
      ...product,
      price: parseInt(product.price),
      sold: false,
    };

    const newProductRes = postNewProductToDatabase(productToSubmit)
      //TODO: flesh out error handling below
      .then((product) => {
        if (product.id) {
          router.reload();
        } else {
          console.log('something went wrong...');
        }
      })
      .catch((e) => {
        console.log('something went wrong (CATCH)...');
      });
  };

  const postNewProductToDatabase = async (product: NewProduct) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const result = await response.json();
    console.log('result in postNewProduct --> ', result);
    return result.products[0];
  };

  return (
    <div style={{ border: '1px solid black' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={product.name}
            type="text"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            name="price"
            onChange={handleChange}
            value={product.price}
            type="text"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={product.description}
          />
        </div>
        <div>
          <label>Measurements</label>
          <textarea
            name="measurements"
            onChange={handleChange}
            value={product.measurements}
          />
        </div>
        <div>
          <label>Upload Images</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddProductForm;
