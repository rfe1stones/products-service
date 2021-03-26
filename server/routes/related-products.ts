import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../database/types/QueryResults';
import * as ApiFormats from '../../database/types/ApiFormats';

const relatedProductsHandler = (req: Request, res: Response) => {
  let productId = Number(req.params.id);
    // when testing, use random id from second half of ids
  if (req.query && req.query.test) {
    productId = Math.floor(Math.random() * 500000) + 500000;
  }
  connection.then((conn) => {
    if (!conn) { return res.sendStatus(500); }
    const sql = `SELECT related_id FROM related_products WHERE product_id = ?`;
    conn.query(sql, [productId])
      .then((results: QueryResults.RelatedIdSet) => {
        const data: ApiFormats.RelatedIdSet = results.map((item: QueryResults.RelatedId) => {
          return item.related_id;
        });
        return res.json(data);
      })
      .catch((err) => {
        return res.json(err);
      })
  })
};

export default relatedProductsHandler;
