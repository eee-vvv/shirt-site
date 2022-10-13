import { Client } from 'pg'

export async function handleGetUnsoldProducts() {
  try {
    console.log('calling GET handler');
    const client = new Client();
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
