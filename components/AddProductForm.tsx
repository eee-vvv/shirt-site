import React from 'react';
import { useState } from 'react';

type Product = {
  name: string;
  price: string;
  description: string;
  measurements: string;
};

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '0',
    description: '',
    measurements: '',
  });

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const tempProduct = { ...product };
    tempProduct[target.name as keyof Product] = target.value;
    setProduct(tempProduct);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('submitting!');
  };

  const postNewProductToDatabase = () => {

  }

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
            type="number"
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
