import connection from '../connection';
import { Request, Response } from 'express';
import * as QueryResults from '../../models/types/QueryResults';
import * as ApiFormats from '../../models/types/ApiFormats';

const productStylesHandler = (req: Request, res: Response) => {
  const productId = Number(req.params.id);
  connection.then((conn) => {
    if (!conn) { throw Error('Connection not established!'); }
    res.json({
      data: productId
    });
  });
};

export default productStylesHandler;
