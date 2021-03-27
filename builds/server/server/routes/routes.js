"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var single_product_1 = __importDefault(require("./single-product"));
var product_styles_1 = __importDefault(require("./product-styles"));
var list_products_1 = __importDefault(require("./list-products"));
var related_products_1 = __importDefault(require("./related-products"));
var productsRouter = express_1.default.Router();
productsRouter.get('/', list_products_1.default);
productsRouter.get('/:id', single_product_1.default);
productsRouter.get('/:id/styles', product_styles_1.default);
productsRouter.get('/:id/related', related_products_1.default);
exports.default = productsRouter;
