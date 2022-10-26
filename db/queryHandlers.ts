import { Client, QueryResult } from 'pg'
import { clientSecrets } from './dbSecrets'
import type { Product } from '../interfaces';


async function clinetConnect(): Promise<Client|Error>{
  try {
    const client = new Client(clientSecrets());
    await client.connect();
    return client
  } catch (e: any){
    return e
  }
}

export async function handleGetUnsoldProducts(): Promise<any[]|null> {
  try {
    const client = await clinetConnect()
    if (client instanceof Error){
      throw client
    }
    const products = await client.query(`
        SELECT *
        FROM product
        WHERE sold = false;`);
    return products.rows;
  } catch (e) {
    console.log(e);
    return null
  }
}

export async function handleGetProduct(id: number): Promise<Product|null> {
  try {
    const client = await clinetConnect()
    if (client instanceof Error){
      throw client
    }
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

export async function handlePostProduct(p: Product): Promise<Product|null> {
  try {
    const client = await clinetConnect()
    if (client instanceof Error){
      throw client
    }
    let values = [p.name, p.price, p.measurements, p.description, p.sold, p.imagesId]
    const res = await client.query(
        `INSERT INTO product (
        name,
        price,
        measurements,
        description,
        sold,
        imagesId
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        ;`,
        values);
      return res.rows[0]    
    } catch (e) {
    console.error('error in /api/products handlePost method: ', e);
    return null
  }
}
