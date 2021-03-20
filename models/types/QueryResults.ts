export interface SingleProduct {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number,
  feature: string,
  value: string
}

export interface Product {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number
}

export interface Style {
  style_id: number,
  name: string,
  original_price: number,
  sale_price: number,
  default_style: number,
  thumbnails: string,
  photos: string,
  skus: string
}
