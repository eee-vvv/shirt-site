import Navbar from './navbar'
import Footer from './footer'
import React from 'react';
import Logo from './Logo';
import CheckoutStatusHandler from './CheckoutStatusHandler';



type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <CheckoutStatusHandler />
      <Navbar />
      <Logo />
      <main>{children}</main>
      <Footer />
    </>
  )
}
