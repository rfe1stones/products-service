"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../connection"));
var singleProductHandler = function (req, res) {
    var productId = Number(req.params.id);
    // when testing, use random id from second half of ids
    if (req.query && req.query.test) {
        productId = Math.floor(Math.random() * 500000) + 500000;
    }
    connection_1.default.then(function (conn) {
        if (!conn) {
            throw Error('Connection not established');
        }
        var sql = "\n      SELECT\n        p.product_id as id, p.name, p.slogan, p.description, p.category, p.default_price,\n        f.feature, f.value\n      FROM products p\n      LEFT JOIN features f\n      ON p.product_id = f.product_id\n      WHERE p.product_id = ?\n    ";
        conn.query(sql, [productId])
            .then(function (results) {
            if (results && results.length > 0) {
                var product_1 = {
                    id: results[0].id,
                    name: results[0].name,
                    slogan: results[0].slogan,
                    category: results[0].category,
                    description: results[0].description,
                    default_price: results[0].default_price.toFixed(2),
                    features: []
                };
                results.forEach(function (result) {
                    if (result.feature !== null) {
                        product_1.features.push({
                            feature: result.feature,
                            value: result.value
                        });
                    }
                });
                return res.json(product_1);
            }
            res.sendStatus(404);
        })
            .catch(function (err) {
            res.json(err);
        });
    });
};
exports.default = singleProductHandler;
