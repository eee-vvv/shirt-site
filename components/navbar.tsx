import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <a>Products</a>
      </Link>
      <Link href={`/about`}>
        <a>About</a>
      </Link>
    </nav>
  );
};

export default Navbar;
