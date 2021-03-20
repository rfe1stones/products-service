import express, { Router, Request, Response } from 'express';
import singleProductHandler from './single-product';
import productStylesHandler from './product-styles';
import listProducts from './list-products';

const productsRouter: Router = express.Router();

productsRouter.get('/', listProducts);

productsRouter.get('/:id', singleProductHandler);

productsRouter.get('/:id/styles', productStylesHandler);

export default productsRouter;