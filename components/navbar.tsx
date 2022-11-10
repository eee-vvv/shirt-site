import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';

import Cart from './Cart';

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);

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
          Cart
        </div>
      )}
    </div>
  );
};

export default Navbar;
