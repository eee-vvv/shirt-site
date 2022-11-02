import React from 'react';
import { useState } from 'react';
import type { Product } from '../interfaces/index'

// TODO: two different product types (JSON vs actual data types on fields)
// 2 ) replace below type declaration with import

type JSONProduct = {
  name: string;
  price: string;
  description: string;
  measurements: string;
  imagesId: string;
};

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '0',
    description: '',
    measurements: '',
    imagesId: 'xxx',
  });

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const tempProduct = { ...product };
    if (target.name === 'price' && isNaN(parseInt(target.value)) && target.value != ''){
      console.log(target.value)
      tempProduct[target.name as keyof JSONProduct] = '';
      alert('please enter a number')
    } else {
      tempProduct[target.name as keyof JSONProduct] = target.value;
    }
    setProduct(tempProduct);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    // TODO: add validateProduct
    e.preventDefault();
    console.log('submitting!');
    const productToSubmit = {
      ...product,
      price: parseInt(product.price),
      sold: false
    }
    const newProductRes = postNewProductToDatabase(productToSubmit);
    console.log('new product response in handleSubmit: ', newProductRes);
  };

  const postNewProductToDatabase = async (product: Product) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const result = await response.json();
    return result.data;
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
          <input
            name="description"
            onChange={handleChange}
            value={product.description}
            type="text"
          />
        </div>
        <div>
          <label>Measurements</label>
          <input
            name="measurements"
            onChange={handleChange}
            value={product.measurements}
            type="text"
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
