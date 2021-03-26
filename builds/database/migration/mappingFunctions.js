"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToRelatedProduct = exports.mapToSku = exports.mapToPhoto = exports.mapToStyle = exports.mapToFeature = exports.mapToProduct = void 0;
var mapToProduct = function (array) {
    return {
        product_id: array[0],
        name: array[1],
        slogan: array[2],
        description: array[3],
        category: array[4],
        default_price: array[5]
    };
};
exports.mapToProduct = mapToProduct;
var mapToFeature = function (array) {
    return {
        feature_id: array[0],
        product_id: array[1],
        feature: array[2],
        value: array[3]
    };
};
exports.mapToFeature = mapToFeature;
var mapToStyle = function (array) {
    return {
        style_id: array[0],
        product_id: array[1],
        name: array[2],
        original_price: array[4],
        sale_price: array[3],
        default_style: array[5]
    };
};
exports.mapToStyle = mapToStyle;
var mapToPhoto = function (array) {
    return {
        photo_id: array[0],
        style_id: array[1],
        thumbnail_url: array[3],
        url: array[2]
    };
};
exports.mapToPhoto = mapToPhoto;
var mapToSku = function (array) {
    return {
        sku_id: array[0],
        style_id: array[1],
        quantity: array[3],
        size: array[2]
    };
};
exports.mapToSku = mapToSku;
var mapToRelatedProduct = function (array) {
    return {
        id: array[0],
        product_id: array[1],
        related_id: array[2]
    };
};
exports.mapToRelatedProduct = mapToRelatedProduct;
