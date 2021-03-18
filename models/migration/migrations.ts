import { Product, Feature, Style, Photo, Sku, RelatedProduct } from '../types/TableTypes';
import * as mappers from './mappingFunctions';
import { MigrationPlan } from '../types/MigrationPlan';


export const productMigration: MigrationPlan<Product> = {
  fileName: 'product.csv',
  mapper: mappers.mapToProduct,
  query: 'INSERT INTO products (name, slogan, description, category, default_price) VALUES (?, ?, ?, ?, ?)',
  toArray: (product: Product) => {
    return [
      // product.product_id,
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
  query: 'INSERT INTO features (feature_id, product_id, feature, value) VALUES (?, ?, ?, ?)',
  toArray: (feature: Feature) => {
    return [
      feature.feature_id,
      feature.product_id,
      feature.feature,
      feature.value
    ];
  }
};

export const styleMigration: MigrationPlan<Style> = {
  fileName: 'styles.csv',
  mapper: mappers.mapToStyle,
  query: 'INSERT INTO styles (style_id, product_id, name, original_price, sale_price, default_style) VALUES (?, ?, ?, ?, ?, ?)',
  toArray: (style: Style) => {
    return [
      style.style_id,
      style.product_id,
      style.name,
      style.original_price,
      style.sale_price,
      style.default_style
    ];
  }
};

export const photoMigration: MigrationPlan<Photo> = {
  fileName: 'photos.csv',
  mapper: mappers.mapToPhoto,
  query: 'INSERT INTO style_photos (photo_id, style_id, thumbnail_url, url) VALUES (?, ?, ?, ?)',
  toArray: (photo: Photo) => {
    return [
      photo.photo_id,
      photo.style_id,
      photo.thumbnail_url,
      photo.url
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
  query: 'INSERT INTO skus (sku_id, style_id, quantity, size) VALUES (?, ?, ?, ?)',
  toArray: (sku: Sku) => {
    return [
      sku.sku_id,
      sku.style_id,
      sku.quantity,
      sku.size
    ];
  }
};

export const relatedProductMigration: MigrationPlan<RelatedProduct> = {
  fileName: 'related.csv',
  mapper: mappers.mapToRelatedProduct,
  query: 'INSERT INTO related_products (id, product_id, related_id) VALUES (?, ?, ?)',
  toArray: (rp: RelatedProduct) => {
    return [
      rp.id,
      rp.product_id,
      rp.related_id
    ];
  }
};
