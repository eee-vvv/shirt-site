import type { NextApiRequest, NextApiResponse } from 'next';
import { handleGetUnsoldProducts } from '../../db/queryHandlers'

import type { Product } from '../../interfaces'

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

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
