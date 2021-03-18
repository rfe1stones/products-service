import { Product, Feature, Style, Photo, Sku, RelatedProduct } from '../types/TableTypes';
import * as mappers from './mappingFunctions';
import { MigrationPlan } from '../types/MigrationPlan';


export const productMigration: MigrationPlan<Product> = {
  fileName: 'product.csv',
  mapper: mappers.mapToProduct,
  query: 'INSERT INTO products (product_id, name, slogan, description, category, default_price) VALUES (?, ?, ?, ?, ?, ?)',
  toArray: (product: Product) => {
    return [
      product.product_id,
      product.name,
      product.slogan,
      product.description,
      product.category,
      product.default_price.toFixed(2)
    ];
  },
  // this targets one error specific to line 11
  lineFixer: {
    transform: (line: string) => line.slice(0, -19) + '49',
    select: (line: string) => line.slice(0, 3) === '11,'
  }
};

export const featureMigration: MigrationPlan<Feature> = {
  fileName: 'features.csv',
  mapper: mappers.mapToFeature,
  query: 'features',
  toArray: (feature: Feature) => {
    return [

    ];
  }
};

export const styleMigration: MigrationPlan<Style> = {
  fileName: 'styles.csv',
  mapper: mappers.mapToStyle,
  query: 'styles',
  toArray: (feature: Style) => {
    return [

    ];
  }
};

export const photoMigration: MigrationPlan<Photo> = {
  fileName: 'photos.csv',
  mapper: mappers.mapToPhoto,
  query: 'style_photos',
  toArray: (feature: Photo) => {
    return [

    ];
  },
  lineFixer: {
    transform: (line: string) => line + '"',
    select: (line: string) => line.charAt(line.length - 1) !== '"'
  }
};

export const skuMigration: MigrationPlan<Sku> = {
  fileName: 'skus.csv',
  mapper: mappers.mapToSku,
  query: 'skus',
  toArray: (feature: Sku) => {
    return [

    ];
  }
};

export const relatedProductMigration: MigrationPlan<RelatedProduct> = {
  fileName: 'related.csv',
  mapper: mappers.mapToRelatedProduct,
  query: 'related_products',
  toArray: (feature: RelatedProduct) => {
    return [

    ];
  }
};
