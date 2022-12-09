import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { CartContext, ProductsContext } from '../lib/context';
import styles from '../styles/Navbar.module.css';
import toast from 'react-hot-toast';

import Cart from './Cart';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartContext, setCartContext] = useContext(CartContext);
  const productsContext = useContext(ProductsContext);
  const cartLength = cartContext.length;

  useEffect(() => {
    const tmpCart = cartContext.filter((id) => {
      const product = productsContext.find((product) => product.id === id);
      if (!product || product.sold) {
        toast(
          'An item from your cart has sold. It has been removed from your cart.'
        );
        return false;
      } else {
        return true;
      }
    });

    setCartContext(tmpCart);
  }, [productsContext]);

  const handleToggleCart = () => {
    setShowCart((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navContainer}>
        <Link href="/">
          <a className={styles.navLink}>Products</a>
        </Link>
        <Link href={`/info`}>
          <a className={styles.navLink}>About</a>
        </Link>
      </nav>
      {showCart ? (
        <Cart toggle={handleToggleCart} />
      ) : (
        <div className={styles.cartThumbnail} onClick={handleToggleCart}>
          Cart ({cartLength})
        </div>
      )}
    </div>
  );
};

export default Navbar;
