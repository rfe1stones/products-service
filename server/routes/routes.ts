import express, { Router, Request, Response } from 'express';
import singleProductHandler from './single-product';
import productStylesHandler from './product-styles';
import listProducts from './list-products';
import relatedProductsHandler from './related-products';

const productsRouter: Router = express.Router();

productsRouter.get('/', listProducts);

productsRouter.get('/:id', singleProductHandler);

productsRouter.get('/:id/styles', productStylesHandler);

productsRouter.get('/:id/related', relatedProductsHandler);

export default productsRouter;