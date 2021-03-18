import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
import ParseCSV from './ParseCSV';
import { MigrationPlan } from '../types/MigrationPlan';
import { Feature, Photo, Product, RelatedProduct, Sku, Style } from '../types/TableTypes';
import * as migrations from './migrations';
import * as mappers from './mappingFunctions';
import path from 'path';

dotenv.config();

const data_dir = process.env.MIGRATION_DIR || '';



mariadb.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT as string),
  socketPath: process.env.DB_SOCKET_PATH,
  database: process.env.DB_NAME,
}).then(connection => {
  // connection established
  runMigration<RelatedProduct>(migrations.relatedProductMigration, connection);
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
