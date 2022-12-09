import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { CartContext, ProductsContext } from '../lib/context';
import styles from '../styles/Navbar.module.css';

import Cart from './Cart';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [cartContext, setCartContext] = useContext(CartContext);
  const productsContext = useContext(ProductsContext);
  const [soldItem, setSoldItem] = useState(false);
  const cartLength = cartContext.length;

  useEffect(() => {
    const tmpCart = cartContext.filter((id) => {
      const product = productsContext.find((product) => product.id === id);
      if (!product || product.sold) {
        setSoldItem(true);
        return false;
      } else {
        return true;
      }
    });
    setCartContext(tmpCart);
  }, []);

  const handleMissingOrSoldProduct = (id: number) => {
    const tmpCart = [...cartContext];
    setCartContext(tmpCart.filter((cartId) => cartId !== id));
    setSoldItem(true);
  };

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
      <div className={styles.soldNotice}>
        One or more items in your cart have sold. It has been updated
        accordingly.
      </div>
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
