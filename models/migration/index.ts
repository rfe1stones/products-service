import mariadb from 'mariadb';
import * as dotenv from 'dotenv';
import ParseCSV from './ParseCSV';
import { MigrationPlan } from '../types/MigrationPlan';
import { Feature, Photo, Product, RelatedProduct, Sku, Style } from '../types/TableTypes';
import * as mappers from './mappingFunctions';
import path from 'path';

dotenv.config();

const data_dir = process.env.MIGRATION_DIR || '';

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
  tableName: 'products',
  // this targets one error specific to line 11
  lineFixer: {
    transform: (line: string) => line.slice(0, -19) + '49',
    select: (line: string, number: number) => number === 11
  }
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
  tableName: 'style_photos',
  lineFixer: {
    transform: (line: string) => line + '"',
    select: (line: string) => line.charAt(line.length - 1) !== '"'
  }
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

function runMigration<T>(plan: MigrationPlan<T>) {
  let filePath = path.join(data_dir, plan.fileName);
  let lineFixer = plan.lineFixer ?? undefined;
  let parser = new ParseCSV(filePath, lineFixer);
  parser.read<T>(plan.mapper, console.log);
}

// runMigration<Product>(productMigration);
// runMigration<Feature>(featureMigration);
// runMigration<Style>(styleMigration);
// runMigration<Photo>(photoMigration);
// runMigration<Sku>(skuMigration);
// runMigration<RelatedProduct>(relatedProductMigration);
