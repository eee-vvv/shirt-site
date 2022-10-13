const { Client } = require('pg');
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
  price: number;
  measurements: string;
  description: string;
  sold: boolean;
  imagesId: string;
};

export default function singleProductHandler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
    case 'GET':
      handleGet(id).then((product) => {
        res.status(200).json({ ...product });
      });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

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
