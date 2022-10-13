const { Client } = require('pg');
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  products: Array<object>;
};

export default function allProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      handleGet()
        .then((products) => {
          res.status(200).json({ products: products });
        })
        .catch((e) => console.log(e));
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet() {
  try {
    console.log('calling GET handler');
    const client = new Client();
    await client.connect();
    const products = await client.query(`
        SELECT *
        FROM product
        WHERE sold = false;`);
    console.log(products.rows);
    return products.rows;
  } catch (e) {
    console.log(e);
  }
}
