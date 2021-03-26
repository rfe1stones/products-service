import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const listProducts = (req: Request, res: Response) => {
  connection.then((conn) => {
    if (!conn) { throw Error('Connection not established!'); }
    const sql = `
      SELECT product_id as id, name, slogan, description, category, default_price FROM products WHERE product_id > ? LIMIT ?
    `;
    // during testing the page will be selected randomly from the latter half of the results
    const defaultPage = req.query.test ? Math.floor(Math.random() * 50000) + 50000 : 1;
    const count = req.query && req.query.count ? Number(req.query.count) : 10;
    const page = req.query && req.query.page ? Number(req.query.page) : defaultPage;
    const start = count * (page - 1);
    conn.query(sql, [start, count])
      .then((results: QueryResults.Product[]) => {
        let apiFormatted: ApiFormats.Product[] = results.map(
          (result: QueryResults.Product) => {
          return {
            ...result,
            default_price: result.default_price.toFixed(2)
          };
        });
        res.json(apiFormatted);
      })
      .catch((err) => {
        res.json(err);
      });
  })
};

export default listProducts;
