import Navbar from './navbar'
import Footer from './footer'
import React from 'react';
import Logo from './Logo';


type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Logo />
      <main>{children}</main>
      <Footer />
    </>
  )
}
