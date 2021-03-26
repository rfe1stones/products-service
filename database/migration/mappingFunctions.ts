import { Feature, Photo, Product, RelatedProduct, Sku, Style } from '../types/TableTypes';

const mapToProduct = function(array: any[]): Product {
  return {
    product_id: array[0],
    name: array[1],
    slogan: array[2],
    description: array[3],
    category: array[4],
    default_price: array[5]
  };
};

const mapToFeature = function(array: any[]): Feature {
  return {
    feature_id: array[0],
    product_id: array[1],
    feature: array[2],
    value: array[3]
  };
};

const mapToStyle = function(array: any[]): Style {
  return {
    style_id: array[0],
    product_id: array[1],
    name: array[2],
    original_price: array[4],
    sale_price: array[3],
    default_style: array[5]
  };
};

const mapToPhoto = function(array: any[]): Photo {
  return {
    photo_id: array[0],
    style_id: array[1],
    thumbnail_url: array[3],
    url: array[2]
  };
};

const mapToSku = function(array: any[]): Sku {
  return {
    sku_id: array[0],
    style_id: array[1],
    quantity: array[3],
    size: array[2]
  };
};

const mapToRelatedProduct = function(array: any[]): RelatedProduct {
  return {
    id: array[0],
    product_id: array[1],
    related_id: array[2]
  };
};

export {
  mapToProduct,
  mapToFeature,
  mapToStyle,
  mapToPhoto,
  mapToSku,
  mapToRelatedProduct
}
