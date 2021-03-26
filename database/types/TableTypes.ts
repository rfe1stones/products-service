export interface Product {
  product_id?: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

export interface Feature {
  feature_id: number,
  product_id: number,
  feature: string,
  value: string
}

export interface Style {
  style_id: number,
  product_id: number,
  name: string,
  original_price: number,
  sale_price: number,
  default_style: number
}

export interface Photo {
  photo_id: number,
  style_id: number,
  thumbnail_url: string,
  url: string
}

export interface Sku {
  sku_id: number,
  style_id: number,
  quantity: number,
  size: string
}

export interface RelatedProduct {
  id: number,
  product_id: number,
  related_id: number
}
