import { useContext } from 'react';
import { Product } from '../interfaces';
import { CartContext, ProductsContext } from '../lib/context';
import styles from '../styles/Cart.module.css'

type CartShirtProps = {
  product: Product
}

const Cart = () => {
  const [cartContext, setCartContext] = useContext(CartContext);
  const productsContext = useContext(ProductsContext);
  return (
    <div className={styles.container}>
      <div className={styles.header}>Cart</div>
      <div className={styles.shirtList}>
        {cartContext.map((id) => {
          const product = productsContext.find((product) => product.id === id);
          console.log(`product ${id}:`)
          console.log(product)

          if (!product) return <li>Product not found...</li>

          return <CartShirt key={product.id} product={product} />
        })}
      </div>
    </div>
  );
};

const CartShirt = ({ product }: CartShirtProps) => {
  return (
    <div className={styles.row}>
      <button>X</button>
      <div>IMG</div>
      <div>{product.name}</div>
      <div>${product.price}</div>
    </div>
  )
}

export default Cart;
