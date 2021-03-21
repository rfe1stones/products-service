import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const relatedProductsHandler = (req: Request, res: Response) => {
  const productId = Number(req.params.id);
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
