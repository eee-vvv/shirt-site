import Link from "next/link";
import React from "react";
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <a className={styles.navLink}>Products</a>
      </Link>
      <Link href={`/info`}>
        <a className={styles.navLink}>About</a>
      </Link>
    </nav>
  );
};

export default Navbar;
