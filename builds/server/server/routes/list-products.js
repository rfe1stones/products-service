"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../connection"));
var listProducts = function (req, res) {
    connection_1.default.then(function (conn) {
        if (!conn) {
            throw Error('Connection not established!');
        }
        var sql = "\n      SELECT product_id as id, name, slogan, description, category, default_price FROM products WHERE product_id > ? LIMIT ?\n    ";
        // during testing the page will be selected randomly from the latter half of the results
        var defaultPage = req.query.test ? Math.floor(Math.random() * 50000) + 50000 : 1;
        var count = req.query && req.query.count ? Number(req.query.count) : 10;
        var page = req.query && req.query.page ? Number(req.query.page) : defaultPage;
        var start = count * (page - 1);
        conn.query(sql, [start, count])
            .then(function (results) {
            var apiFormatted = results.map(function (result) {
                return __assign(__assign({}, result), { default_price: result.default_price.toFixed(2) });
            });
            res.json(apiFormatted);
        })
            .catch(function (err) {
            res.json(err);
        });
    });
};
exports.default = listProducts;
