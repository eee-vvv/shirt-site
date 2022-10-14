import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { allProducts } from '../lib/db'
import { handleGetProduct } from '../db/queryHandlers';
import { Product } from '../interfaces/index'

type Props = {
    data: Product|null;
  };

const ProductPage: NextPage<Props> = ({ data }: Props) => {

    const product = data

    if (product == null){
        return (<div>product not found</div>)
    }

    // if (typeof(id) != 'string'){
    //     return <div>bad url param</div>
    // }

    // const product = allProducts.find(p => p.id == parseInt(id))
    // if (!product){
    //     return <div>product not found in db</div>
    // }

    return ( 
        <div>
            <h2>{product.name}</h2>
            <div>image: {product.imagesId}</div>
            <div>
                <ul>
                    <li>
                    <span>{product.price}</span>
                    <span>{product.measurements}</span>
                    </li>
                    <li>
                        {product.description}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id
    if (typeof id != 'string'){
        return {props: {data: null}}
    }
    const id_int = parseInt(id)
    const product = await handleGetProduct(id_int)
    return { props: { data: product }}
  };

export default ProductPage
