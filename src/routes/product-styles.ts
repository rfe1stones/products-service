import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const productStylesHandler = (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  connection.then((conn) => {
    if (!conn) { throw Error('Connection not established!'); }
    const sql = `
      SELECT
        s.style_id,
        s.name,
        s.original_price,
        s.sale_price,
        s.default_style,
        GROUP_CONCAT(sp.thumbnail_url) as thumbnails,
        GROUP_CONCAT(sp.url) as photos,
        GROUP_CONCAT(sk.sku_id, ',', sk.size,',', sk.quantity SEPARATOR ';') as skus
      FROM styles s
        LEFT JOIN style_photos sp
          ON s.style_id = sp.style_id
        LEFT JOIN skus sk
          ON s.style_id = sk.style_id
        WHERE s.product_id = ?
        GROUP BY s.style_id
    `;
    conn.query(sql, [productId])
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });

  });
};

export default productStylesHandler;
