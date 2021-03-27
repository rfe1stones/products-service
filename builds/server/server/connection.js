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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mariadb_1 = __importDefault(require("mariadb"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
if (process.env.DB_PORT === undefined) {
    throw new Error('.env file must contain DB_PORT value');
}
if (process.env.DB_USER === undefined) {
    throw new Error('.env file must contain DB_USER value');
}
if (process.env.DB_PASS === undefined) {
    throw new Error('.env file must contain DB_PASS value');
}
if (process.env.DB_NAME === undefined) {
    throw new Error('.env file must contain DB_NAME value');
}
var connection_config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME
};
if (process.env.DB_SOCKET_PATH && process.env.DB_SOCKET_PATH !== '') {
    connection_config['socketPath'] = process.env.DB_SOCKET_PATH;
}
if (process.env.DB_HOST !== undefined) {
    connection_config['host'] = process.env.DB_HOST;
}
var connection = mariadb_1.default.createConnection(connection_config)
    .catch(function (err) {
    console.log(err);
});
exports.default = connection;
