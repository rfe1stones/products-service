"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatedProductMigration = exports.skuMigration = exports.photoMigration = exports.styleMigration = exports.featureMigration = exports.productMigration = void 0;
var mappers = __importStar(require("./mappingFunctions"));
exports.productMigration = {
    fileName: 'product.csv',
    mapper: mappers.mapToProduct,
    query: 'INSERT INTO products (name, slogan, description, category, default_price) VALUES (?, ?, ?, ?, ?)',
    toArray: function (product) {
        return [
            // product.product_id,
            product.name,
            product.slogan,
            product.description,
            product.category,
            product.default_price.toFixed(2)
        ];
    },
    // this targets one error specific to line 11
    lineFixer: {
        transform: function (line) { return line.slice(0, -19) + '49'; },
        select: function (line) { return line.slice(0, 3) === '11,'; }
    }
};
exports.featureMigration = {
    fileName: 'features.csv',
    mapper: mappers.mapToFeature,
    query: 'INSERT INTO features (feature_id, product_id, feature, value) VALUES (?, ?, ?, ?)',
    toArray: function (feature) {
        return [
            feature.feature_id,
            feature.product_id,
            feature.feature,
            feature.value
        ];
    }
};
exports.styleMigration = {
    fileName: 'styles.csv',
    mapper: mappers.mapToStyle,
    query: 'INSERT INTO styles (style_id, product_id, name, original_price, sale_price, default_style) VALUES (?, ?, ?, ?, ?, ?)',
    toArray: function (style) {
        return [
            style.style_id,
            style.product_id,
            style.name,
            style.original_price,
            style.sale_price,
            style.default_style
        ];
    }
};
exports.photoMigration = {
    fileName: 'photos.csv',
    mapper: mappers.mapToPhoto,
    query: 'INSERT INTO photos (photo_id, style_id, thumbnail_url, url) VALUES (?, ?, ?, ?)',
    toArray: function (photo) {
        return [
            photo.photo_id,
            photo.style_id,
            photo.thumbnail_url,
            photo.url
        ];
    },
    lineFixer: {
        transform: function (line) { return line + '"'; },
        select: function (line) { return line.charAt(line.length - 1) !== '"'; },
        skip: function (line) { return line.substring(0, 6) === '357,51'; }
    }
};
exports.skuMigration = {
    fileName: 'skus.csv',
    mapper: mappers.mapToSku,
    query: 'INSERT INTO skus (sku_id, style_id, quantity, size) VALUES (?, ?, ?, ?)',
    toArray: function (sku) {
        return [
            sku.sku_id,
            sku.style_id,
            sku.quantity,
            sku.size
        ];
    }
};
exports.relatedProductMigration = {
    fileName: 'related.csv',
    mapper: mappers.mapToRelatedProduct,
    query: 'INSERT INTO related_products (id, product_id, related_id) VALUES (?, ?, ?)',
    toArray: function (rp) {
        return [
            rp.id,
            rp.product_id,
            rp.related_id
        ];
    }
};
