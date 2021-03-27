"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../connection"));
var productStylesHandler = function (req, res) {
    var productId = Number(req.params.id);
    // when testing, use random id from second half of ids
    if (req.query && req.query.test) {
        productId = Math.floor(Math.random() * 500000) + 500000;
    }
    connection_1.default.then(function (conn) {
        if (!conn) {
            throw Error('Connection not established!');
        }
        var sql = "\n      SELECT\n        s.style_id,\n        s.name,\n        s.original_price,\n        s.sale_price,\n        s.default_style,\n        GROUP_CONCAT(sp.thumbnail_url) as thumbnails,\n        GROUP_CONCAT(sp.url) as photos,\n        GROUP_CONCAT(sk.sku_id, ',', sk.size,',', sk.quantity SEPARATOR ';') as skus\n      FROM styles s\n        LEFT JOIN photos sp\n          ON s.style_id = sp.style_id\n        LEFT JOIN skus sk\n          ON s.style_id = sk.style_id\n        WHERE s.product_id = ?\n        GROUP BY s.style_id\n    ";
        conn.query(sql, [productId])
            .then(function (results) {
            var data = {
                product_id: productId.toString(),
                results: []
            };
            data.results = results.map(function (style) {
                var thumbnailsStrings = style.thumbnails.split(',');
                var photosStrings = style.photos.split(',');
                var skusStrings = style.skus.split(';');
                var photos = thumbnailsStrings.map(function (thumb, index) {
                    return {
                        thumbnail_url: thumb,
                        url: photosStrings[index]
                    };
                });
                var skuData = {};
                skusStrings.forEach(function (skuString) {
                    var fields = skuString.split(',');
                    var id = fields[0], size = fields[1], quantity = fields[2];
                    var stock = {
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
            .catch(function (err) {
            res.json(err);
        });
    });
};
exports.default = productStylesHandler;
