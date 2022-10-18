import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Client } from 'pg';
import { handleGetUnsoldProducts } from '../db/queryHandlers';

import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';

import styles from '../styles/Home.module.css'

const Info: NextPage = () => {
  return (
    <div className="page-container">
      <h2>info page</h2>
    </div>
  )
}

export default Info
