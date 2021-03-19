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
    conn.query('SELECT * FROM products WHERE product_id = ?', [productId])
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

export default router;