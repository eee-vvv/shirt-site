import { Client } from 'pg'
import clientSecrets from './dbSecrets'
import type { Product } from '../interfaces';


export async function handleGetUnsoldProducts() {
  try {
    console.log('calling GET handler');
    const client = new Client(clientSecrets());
    await client.connect();
    const products = await client.query(`
        SELECT *
        FROM product
        WHERE sold = false;`);
    return products.rows;
  } catch (e) {
    console.log(e);
  }
}

export async function handleGetProduct(id: number): Promise<Product|null> {
  try {
    const client = new Client(clientSecrets());
    await client.connect();
    const res = await client.query(
      `
      SELECT *
      FROM product
      WHERE id = $1;`,
      [id]
    );
    return res.rows[0]
  } catch (e) {
    console.error('error in /api/product/[id] handleGet method: ', e);
    return null
  }
}
