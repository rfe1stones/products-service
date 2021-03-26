import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const productStylesHandler = (req: Request, res: Response) => {
  let productId = Number(req.params.id);
  // when testing, use random id from second half of ids
  if (req.query && req.query.test) {
    productId = Math.floor(Math.random() * 500000) + 500000;
  }
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
      .then((results: QueryResults.Style[]) => {
        const data: ApiFormats.ProductWithStyles = {
          product_id: productId.toString(),
          results: []
        };
        data.results = results.map((style: QueryResults.Style) => {
          let thumbnailsStrings = style.thumbnails.split(',');
          let photosStrings = style.photos.split(',');
          let skusStrings = style.skus.split(';');
          let photos: ApiFormats.PhotoPair[] = thumbnailsStrings.map((thumb, index) => {
            return {
              thumbnail_url: thumb,
              url: photosStrings[index]
            };
          });
          let skuData: ApiFormats.SkusRecord = {};
          skusStrings.forEach((skuString) => {
            let fields = skuString.split(',');
            let [id, size, quantity] = fields;
            let stock: ApiFormats.SkuData = {
              quantity: Number(quantity),
              size: size
            };
            skuData[id] = stock;
          });
          return {
            style_id: style.style_id,
            name: style.name,
            original_price: style.original_price.toFixed(2),
            sale_price: style.sale_price ? style.sale_price.toFixed(2) : null,
            "default?": style.default_style ? true : false,
            photos: photos,
            skus: skuData
          };
        });
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });

  });
};

export default productStylesHandler;
