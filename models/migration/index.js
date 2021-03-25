"use strict";
exports.__esModule = true;
var mariadb = require("mariadb");
var dotenv = require("dotenv");
var ParseCSV_1 = require("./ParseCSV");
var migrations = require("./migrations");
var path = require("path");
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
})["catch"](function (err) {
    console.log('error', err);
});
function runMigration(plan, connection) {
    var _a;
    var filePath = path.join(data_dir, plan.fileName);
    var lineFixer = (_a = plan.lineFixer) !== null && _a !== void 0 ? _a : undefined;
    var parser = new ParseCSV_1["default"](filePath, lineFixer);
    parser.read(plan.mapper, function (data, resume) {
        var arrays = [];
        for (var i = 0; i < data.length; i++) {
            arrays.push(plan.toArray(data[i]));
        }
        connection.batch(plan.query, arrays)
            .then(function (result) {
            console.log(result);
            resume();
        })["catch"](function (err) {
            console.log(err);
        });
    });
}
