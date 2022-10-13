import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { allProducts } from '../lib/db'



const ProductPage: NextPage = () => {

    const router = useRouter()
    const {id} = router.query

    if (typeof(id) != 'string'){
        return <div>bad url param</div>
    }

    const product = allProducts.find(p => p.id == parseInt(id))
    if (!product){
        return <div>product not found in db</div>
    }

    return (
        <div className="page-container">
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

export default ProductPage
