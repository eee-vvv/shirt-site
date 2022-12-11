import stream from 'stream';
import { promisify } from 'util';
import { getMainProductImage } from '../../../lib/supabase';

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
      let data;
      if (body.all) {
        // data = handleGetAll(id);
        // if (data.error) {
        //   res.status(400).send('Error fetching image. It may not exist.');
        //   return;
        // } else {
        //   data.arrayBuffer().then((buf) => {
        //     res.send(Buffer.from(buf));
        //   });
        // }
      } else {
        data = await handleGetPrimary(id);
        if (data.error) {
          res.status(400).send('Error fetching image. It may not exist.');
          return;
        } else {
          res.setHeader('Content-Type', 'image/jpeg');
          res.status(200).send(data.arrayBuffer());
          return;
        }
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const handleGetPrimary = async (productId) => {
  const data = await getMainProductImage(productId);
  return data;
};

const handleGetAll = async (productId) => {
  const data = await getMainProductImage(productId);
  return data;
};
