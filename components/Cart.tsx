import { MouseEventHandler, useContext } from 'react';
import { Product } from '../interfaces';
import { CartContext, ProductsContext } from '../lib/context';
import styles from '../styles/Cart.module.css';
import RemoveFromCartButton from './RemoveFromCartButton';

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>Cart</div>
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
        <div>cart is empty.. add something!</div>
      )}
      <button onClick={toggle}>Close</button>
      {notEmpty && <button>Check Out</button>}
    </div>
  );
};

const CartShirt = ({ product }: CartShirtProps) => {
  return (
    <div className={styles.row}>
      <RemoveFromCartButton id={product.id} />
      <div>IMG</div>
      <div>{product.name}</div>
      <div>${product.price}</div>
    </div>
  );
};

export default Cart;
