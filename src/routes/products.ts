import mariadb, { Connection } from 'mariadb';
import express, { Router, Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const connection = mariadb.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string),
  socketPath: process.env.DB_SOCKET_PATH,
  database: process.env.DB_NAME
}).catch((err) => {
  console.log(err);
});

const router: Router = express.Router();

router.get('/:id', (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  connection.then((conn) => {
    if (!conn) {
      throw Error('Connection not established');
    }
    const sql = `
      SELECT
        p.product_id as id, p.name, p.slogan, p.description, p.category, p.default_price,
        f.feature, f.value
      FROM products p
      LEFT JOIN features f
      ON p.product_id = f.product_id
      WHERE p.product_id = ?
    `;
    conn.query(sql, [productId])
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

export default router;
