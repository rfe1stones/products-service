export interface FeaturePair {
  feature: string,
  value: string
}

export interface SingleProduct {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: string,
  features: FeaturePair[]
}

export interface PhotoPair {
  thumbnail_url: string,
  url: string
}

export interface SkuData {
  quantity: number,
  size: string
}

export type SkusRecord = Record<string, SkuData>;

export interface SingleStyle {
  style_id: number,
  name: string,
  original_price: string,
  sale_price: string,
  'default?': boolean,
  photos: PhotoPair[],
  skus: SkusRecord
}

export interface ProductWithStyles {
  product_id: string,
  results: SingleStyle[]
}
