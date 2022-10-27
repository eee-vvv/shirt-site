import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGetUnsoldProducts, handlePostProduct } from '../../db/queryHandlers'

import { Product, isProduct, isProductJSON } from '../../interfaces'

type Data = {
  products: Array<Product>
};

export default function allProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      handleGetUnsoldProducts()
        .then((products) => {
          if (!products) {
            res.status(500)
            return
          }
          res.status(200).json({ products: products });
        })
        .catch((e) => console.log(e));
      break;
    case 'POST':
      let postProduct: Product
      if (isProductJSON(req.body)){
        postProduct = {
          name: req.body.name,
          price: parseInt(req.body.price),
          measurements: req.body.measurements,
          description: req.body.description,
          sold: req.body.sold === 'true',
          imagesId: req.body.imagesId
        }
      } else {
        res.status(400)
        break
      }
      handlePostProduct(postProduct)
        .then((product) => {
          if (!product) {
            res.status(500)
            return 
          }
          res.status(200).json({ products: [product] });
        }
        )
      break
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

/*
curl -H "Content-Type: application/json" -X POST -d '{"name":"POST_TEST","price":"123","measurements":"POST_TEST","description":"POST_TEST","sold":"false",imagesId:"POST_TEST"}' http://localhost:3000/api/products
*/