import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const singleProductHandler = (req: Request, res: Response) => {
  let productId = Number(req.params.id);
  if (req.query && req.query.test) {
    productId = Math.floor(Math.random() * 500000) + 500000;
  }
  connection.then((conn) => {
    if (!conn) { throw Error('Connection not established'); }
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
      .then((results: QueryResults.SingleProduct[]) => {
        if (results && results.length > 0) {
          const product: ApiFormats.SingleProduct = {
            id: results[0].id,
            name: results[0].name,
            slogan: results[0].slogan,
            category: results[0].category,
            description: results[0].description,
            default_price: results[0].default_price.toFixed(2),
            features: []
          };
          results.forEach((result: QueryResults.SingleProduct) => {
            if (result.feature !== null) {
              product.features.push({
                feature: result.feature,
                value: result.value
              });
            }
          });
          return res.json(product);
        }
        res.sendStatus(404);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};

export default singleProductHandler;