import { Client } from 'pg'
import { Product } from '../../../interfaces'
import { handleDeleteProduct } from '../../../db/queryHandlers';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function singleProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<Product|{message:String}>
) {
  const {
    query,
    method,
  } = req;

  // TODO: more robust error handling

  if (typeof(query.id) != 'string') {
    res.status(400)
    return
  }

  const id = parseInt(query.id)

  switch (method) {
    case 'GET': // TODO: change to async await syntax
      handleGet(id).then((product) => {
        res.status(200).json({ ...product });
      });
      break;
    case 'DELETE':
      const productsDeleted = await handleDeleteProduct(id)
      if (productsDeleted){
        res.status(200).json({message: `product deleted`})
      } else {
        res.status(400).json({message: `product with id# ${id} not in database`})
      }
      break
    default:
      res.setHeader('Allow', ['GET','DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// TODO: delete redundant code and move this to query handlers
async function handleGet(id: number) {
  try {
    const client = new Client();
    await client.connect();
    const res = await client.query(
      `
      SELECT *
      FROM product
      WHERE ProductID = $1;`,
      [id]
    );
    return res.rows[0]
  } catch (e) {
    console.error('error in /api/product/[id] handleGet method: ', e);
  }
}
