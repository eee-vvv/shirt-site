import Navbar from './navbar'
import Footer from './footer'
import React from 'react';


type LayoutProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
