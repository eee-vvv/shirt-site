import { MouseEventHandler, useContext } from 'react';
import { Product } from '../interfaces';
import { CartContext, ProductsContext } from '../lib/context';
import styles from '../styles/Cart.module.css';
import RemoveFromCartButton from './RemoveFromCartButton';

import productPic from '../public/fakeshirts/1.jpg';
import Image from 'next/image';

// TODO: way of notifying user something has sold so it doesn't
// feel like a bug

// TODO: prevent "product not found bug...."

type Props = {
  toggle: MouseEventHandler;
};

type CartShirtProps = {
  product: Product;
};

const Cart = ({ toggle }: Props) => {
  const [cartContext, setCartContext] = useContext(CartContext);
  const productsContext = useContext(ProductsContext);

  const totalPrice = cartContext.reduce((sum, currentId) => {
    const product = productsContext.find((product) => product.id === currentId);
    if (!product) return sum;
    return sum + product.price;
  }, 0);

  const notEmpty = cartContext.length > 0;

  const handleCheckOut = () => {
    console.log('checking out!');
  };

  return (
    <div className={styles.container}>
      {notEmpty ? (
        <div className={styles.shirtList}>
          {cartContext.map((id) => {
            const product = productsContext.find(
              (product) => product.id === id
            );
            console.log(`product ${id}:`);
            console.log(product);

            if (!product) return <li>Product not found...</li>;

            return <CartShirt key={product.id} product={product} />;
          })}
          <div>Total: ${totalPrice}</div>
        </div>
      ) : (
        <div>Cart is empty..add something!</div>
      )}
      <button onClick={toggle}>Close</button>
      {notEmpty && <button onClick={handleCheckOut}>Check Out</button>}
    </div>
  );
};

const CartShirt = ({ product }: CartShirtProps) => {
  return (
    <div className={styles.row}>
      <RemoveFromCartButton id={product.id} />
      {/* <Image src={productPic} alt="TODO" width="20px" height="20px" /> */}
      <div>{product.name}</div>
      <div>${product.price}</div>
    </div>
  );
};

export default Cart;
