import express, { Router, Request, Response } from 'express';
import singleProductHandler from './single-product';

const productsRouter: Router = express.Router();

productsRouter.get('/:id', singleProductHandler);

// router.get('/:id/styles', )

export default productsRouter;