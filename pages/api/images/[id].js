import stream from 'stream';
import { promisify } from 'util';
import { getMainProductImage } from '../../../lib/supabase';
const fs = require('fs');
import path from 'path'

const pipeline = promisify(stream.pipeline);

export default async function imageRequestHandler(req, res) {
  const { query, method, body } = req;

  // body: all: true or false

  if (typeof query.id != 'string') {
    res.status(400);
    return;
  }

  const id = parseInt(query.id);

  switch (req.method) {
    case 'GET':
      try {
        console.log('in GET')
        const dir = path.resolve('./public/products-images', query.id)
        const files = fs.readdirSync(dir);
        res.status(200).json({ fileNames: files });
      } catch (e) {
        res.status(400).send(`Error: ${e}`);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
