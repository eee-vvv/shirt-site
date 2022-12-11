import type { NextApiRequest, NextApiResponse } from 'next';
import {
  handleGetUnsoldProducts,
  handlePostProduct,
} from '../../db/queryHandlers';

import { Product, isProduct, isProductJSON } from '../../interfaces';
import { createProduct } from '../../lib/stripe';

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
      handleGetUnsoldProducts()
        .then((products) => {
          if (!products) {
            res.status(500).json({ error: 'failed to get products from db' });
            return;
          }
          res.status(200).json({ products: products });
        })
        .catch((e) => console.log(e));
      break;
    case 'POST':
      let postProduct = {
        name: req.body.name,
        price: parseInt(req.body.price),
        measurements: req.body.measurements,
        description: req.body.description,
        sold: req.body.sold,
        imagesId: req.body.imagesId,
        stripepriceid: '',
        stripeproductid: '',
      };
      if (!isProduct(req.body)) {
        console.log(req.body);
        console.log('JSON not a product');
        res.status(400).json({ error: 'JSON sent to db not a product' });
        break;
      }

      const stripeProduct = await createProduct(
        postProduct.name,
        postProduct.price * 100
      );

      if (!stripeProduct) {
        throw 'Stripe product creation failed. please try again.';
      }

      postProduct.stripepriceid = stripeProduct.default_price.id;
      postProduct.stripeproductid = stripeProduct.id;
      const product = await handlePostProduct(postProduct);

      if (!product) {
        console.log('error 500');
        res.status(500).json({ error: 'product not found' });
        return;
      }
      res.status(200).json({ products: [product] });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
