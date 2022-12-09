import Navbar from './navbar';
import Footer from './footer';
import React from 'react';
import Logo from './Logo';
import CheckoutStatusHandler from './CheckoutStatusHandler';

import { Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Toaster />
      <CheckoutStatusHandler />
      <Navbar />
      <Logo />
      <main>{children}</main>
      <Footer />
    </>
  );
}
