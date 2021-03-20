import express, { Router, Request, Response } from 'express';
import singleProductHandler from './single-product';
import productStylesHandler from './product-styles';

const productsRouter: Router = express.Router();

productsRouter.get('/:id', singleProductHandler);

productsRouter.get('/:id/styles', productStylesHandler);

export default productsRouter;