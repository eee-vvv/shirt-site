import Link from 'next/link';
import React from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
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
      <div className={styles.cartThumbnail}>
        Cart
      </div>
    </div>
  );
};

export default Navbar;
