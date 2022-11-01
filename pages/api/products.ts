import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetUnsoldProducts,
  handlePostProduct,
} from '../../db/queryHandlers';

import { Product, isProduct, isProductJSON } from '../../interfaces';

type Data = {
  products?: Array<Product>;
  error?: string;
};

export default async function allProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      // handleGetUnsoldProducts()
      //   .then((products) => {
      //     if (!products) {
      //       res.status(500).json({ error: 'failed to get products from db' });
      //       return;
      //     }
      //     res.status(200).json({ products: products });
      //   })
      //   .catch((e) => console.log(e));
      break;
    case 'POST':
      let postProduct = {
        name: req.body.name,
        price: parseInt(req.body.price),
        measurements: req.body.measurements,
        description: req.body.description,
        sold: req.body.sold,
        imagesId: req.body.imagesId,
      };
      if (!isProduct(req.body)){  
        console.log(req.body)
        console.log('JSON not a product');
        res.status(400).json({ error: 'JSON sent to db not a product' });
        break;
      }
      const product = await handlePostProduct(postProduct)
      if (!product) {
        console.log('error 500')
        res.status(500).json({ error: 'product not found' });
        return;
      }
      console.log('from db:', product)
      res.status(200).json({ products: [product] });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}

/*
curl -H "Content-Type: application/json" -X POST -d '{"name":"POST_TEST","price":"123","measurements":"POST_TEST","description":"POST_TEST","sold":"false",imagesId:"POST_TEST"}' http://localhost:3000/api/products
*/
