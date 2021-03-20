export interface QuerySingleProduct {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: number,
  feature: string,
  value: string
}

export interface APIFeature {
  feature: string,
  value: string
}

export interface APISingleProduct {
  id: number,
  name: string,
  slogan: string,
  description: string,
  category: string,
  default_price: string,
  features: APIFeature[]
}
