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
var mariadb = __importStar(require("mariadb"));
var dotenv = __importStar(require("dotenv"));
var ParseCSV_1 = __importDefault(require("./migration/ParseCSV"));
var migrations = __importStar(require("./migration/migrations"));
var path = __importStar(require("path"));
// import process from 'process';
dotenv.config();
var data_dir = process.env.MIGRATION_DIR || '';
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
var table;
if (process.argv.length == 2) {
    table = '';
}
else {
    table = process.argv[2];
}
mariadb.createConnection(connection_config)
    .then(function (connection) {
    // connection established
    switch (table) {
        case 'products':
            runMigration(migrations.productMigration, connection);
            break;
        case 'features':
            runMigration(migrations.featureMigration, connection);
            break;
        case 'styles':
            runMigration(migrations.styleMigration, connection);
            break;
        case 'photos':
            runMigration(migrations.photoMigration, connection);
            break;
        case 'skus':
            runMigration(migrations.skuMigration, connection);
            break;
        case 'related':
            runMigration(migrations.relatedProductMigration, connection);
            break;
        default:
            console.log('Usage:');
            console.log('npm run migrate --db=products');
            var options = ['products', 'features', 'styles', 'photos', 'skus', 'related'];
            console.log('Options:');
            options.forEach(function (name) {
                console.log(name);
            });
            process.exit(0);
    }
})
    .catch(function (err) {
    console.log('error', err);
});
function runMigration(plan, connection) {
    var _a;
    var filePath = path.join(data_dir, plan.fileName);
    var lineFixer = (_a = plan.lineFixer) !== null && _a !== void 0 ? _a : undefined;
    var parser = new ParseCSV_1.default(filePath, lineFixer);
    parser.read(plan.mapper, function (data, resume) {
        var arrays = [];
        for (var i = 0; i < data.length; i++) {
            arrays.push(plan.toArray(data[i]));
        }
        connection.batch(plan.query, arrays)
            .then(function (result) {
            console.log(result);
            resume();
        })
            .catch(function (err) {
            console.log(err);
        });
    });
}
