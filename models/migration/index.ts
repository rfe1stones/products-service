import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
import ParseCSV from './ParseCSV';
import MigrationPlan from '../types/MigrationPlan';
import { Feature, Photo, Product, RelatedProduct, Sku, Style } from '../types/TableTypes';
import * as mappers from './mappingFunctions';
import fs from 'fs';

// dotenv.config();

// mariadb.createConnection({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   port: parseInt(process.env.DB_PORT as string),
//   socketPath: process.env.DB_SOCKET_PATH,
//   database: process.env.DB_NAME,
// }).then(conn => {
//   console.log('success?');
// })
// .catch(err => {
//   console.log('error', err);
// });

const productMigration: MigrationPlan<Product> = {
  fileName: 'product.csv',
  mapper: mappers.mapToProduct,
  tableName: 'products'
};

const featureMigration: MigrationPlan<Feature> = {
  fileName: 'features.csv',
  mapper: mappers.mapToFeature,
  tableName: 'features'
};

const styleMigration: MigrationPlan<Style> = {
  fileName: 'styles.csv',
  mapper: mappers.mapToStyle,
  tableName: 'styles'
};

const photoMigration: MigrationPlan<Photo> = {
  fileName: 'photos.csv',
  mapper: mappers.mapToPhoto,
  tableName: 'style_photos'
};

const skuMigration: MigrationPlan<Sku> = {
  fileName: 'skus.csv',
  mapper: mappers.mapToSku,
  tableName: 'skus'
};

const relatedProductMigration: MigrationPlan<RelatedProduct> = {
  fileName: 'related.csv',
  mapper: mappers.mapToRelatedProduct,
  tableName: 'related_products'
};


let filePath = '/home/stephen/hr/sdc/products/data/full/product.csv';
let parser = new ParseCSV(filePath);
parser.read<Product>(mappers.mapToProduct, console.log);
