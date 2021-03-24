import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
import ParseCSV from './ParseCSV';
import { MigrationPlan } from '../types/MigrationPlan';
import { Feature, Photo, Product, RelatedProduct, Sku, Style } from '../types/TableTypes';
import * as migrations from './migrations';
import * as mappers from './mappingFunctions';
import path from 'path';
import DatabaseConfig from '../types/DatabaseConfig';

dotenv.config();

const data_dir = process.env.MIGRATION_DIR || '';

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

let connection_config: DatabaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME
};

if (process.env.DB_SOCKET_PATH && process.env.DB_SOCKET_PATH !== '') {
  connection_config['socketPath'] = process.env.DB_SOCKET_PATH;
}


mariadb.createConnection(connection_config)
  .then(connection => {
  // connection established
  runMigration<Product>(migrations.productMigration, connection);
  // runMigration<Feature>(migrations.featureMigration, connection);
  // runMigration<Style>(migrations.styleMigration, connection);
  // runMigration<Photo>(migrations.photoMigration, connection);
  // runMigration<Sku>(migrations.skuMigration, connection);
  // runMigration<RelatedProduct>(migrations.relatedProductMigration, connection);
})
.catch(err => {
  console.log('error', err);
});

function runMigration<T>(
  plan: MigrationPlan<T>,
  connection: mariadb.Connection
) {
  let filePath = path.join(data_dir, plan.fileName);
  let lineFixer = plan.lineFixer ?? undefined;
  let parser = new ParseCSV(filePath, lineFixer);
  parser.read<T>(plan.mapper, (data: T[], resume) => {
    let arrays = [];
    for (let i = 0; i < data.length; i++) {
      arrays.push(plan.toArray(data[i]));
    }
    connection.batch(plan.query, arrays)
      .then((result) => {
        console.log(result);
        resume();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
