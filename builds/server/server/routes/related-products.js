"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../connection"));
var relatedProductsHandler = function (req, res) {
    var productId = Number(req.params.id);
    // when testing, use random id from second half of ids
    if (req.query && req.query.test) {
        productId = Math.floor(Math.random() * 500000) + 500000;
    }
    connection_1.default.then(function (conn) {
        if (!conn) {
            return res.sendStatus(500);
        }
        var sql = "SELECT related_id FROM related_products WHERE product_id = ?";
        conn.query(sql, [productId])
            .then(function (results) {
            var data = results.map(function (item) {
                return item.related_id;
            });
            return res.json(data);
        })
            .catch(function (err) {
            return res.json(err);
        });
    });
};
exports.default = relatedProductsHandler;
