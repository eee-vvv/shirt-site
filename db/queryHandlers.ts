import { Client, QueryResult } from 'pg';
import type { Product, NewProduct } from '../interfaces';
import { useRouter } from 'next/router';

async function clientConnect(): Promise<Client | Error> {
  try {
    const client = new Client();
    await client.connect();
    return client;
  } catch (e: any) {
    return e;
  }
}

export async function handleGetUnsoldProducts(): Promise<Product[] | null> {
  try {
    const client = await clientConnect();
    if (client instanceof Error) {
      throw client;
    }
    const products = await client.query(`
        SELECT id, name, price, measurements, description, sold, imagesId, stripepriceid, stripeproductid
        FROM product
        WHERE sold = false;`);
    return products.rows;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function handleGetProduct(id: number): Promise<Product | null> {
  try {
    const client = await clientConnect();
    if (client instanceof Error) {
      throw client;
    }
    const res = await client.query(
      `
      SELECT id, name, price, measurements, description, sold, imagesId, stripepriceid, stripeproductid
      FROM product
      WHERE id = $1;`,
      [id]
    );
    return res.rows[0];
  } catch (e) {
    console.error('error in /api/product/[id] handleGet method: ', e);
    return null;
  }
}

export async function handleDeleteProduct(id: number): Promise<number | null> {
  try {
    const client = await clientConnect();
    if (client instanceof Error) {
      throw client;
    }
    const res = await client.query(
      `
      DELETE FROM product
      WHERE id = $1;`,
      [id]
    );
    return res.rowCount;
  } catch (e) {
    console.error('error in /api/product/[id] handlePost method: ', e);
    return null;
  }
}

export async function handlePostProduct(
  p: NewProduct
): Promise<Product | null> {
  try {
    const client = await clientConnect();
    if (client instanceof Error) {
      throw client;
    }
    let values = [
      p.name,
      p.price,
      p.measurements,
      p.description,
      p.sold,
      p.imagesId,
      p.stripepriceid === '' ? null : p.stripepriceid,
      p.stripeproductid === '' ? null : p.stripeproductid,
    ];
    const res = await client.query(
      `INSERT INTO product (
        name,
        price,
        measurements,
        description,
        sold,
        imagesId,
        stripepriceid,
        stripeproductid
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        ;`,
      values
    );
    return res.rows[0];
  } catch (e) {
    console.error('error in /api/product/id handlePost method: ', e);
    return null;
  }
}

export async function handleEditProduct(p: Product): Promise<Product | null> {
  try {
    const client = await clientConnect();
    if (client instanceof Error) {
      throw client;
    }
    let values = [
      p.id,
      p.name,
      p.price,
      p.measurements,
      p.description,
      p.sold,
      p.imagesId,
      p.stripeproductid,
      p.stripepriceid,
    ];
    const res = await client.query(
      `UPDATE product
    SET
    name = $2,
    price = $3,
    measurements = $4,
    description = $5,
    sold = $6,
    imagesId = $7,
    stripeproductid = $8,
    stripepriceid = $9
    WHERE id = $1
    RETURNING *
    ;`,
      values
    );
    return res.rows[0];
  } catch (e) {
    console.error('error in /api/product/id handleEdit method: ', e);
    return null;
  }
}
