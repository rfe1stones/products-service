import mongoose from 'mongoose';
const { Schema } = mongoose;

const featureSchema = new Schema({
  feature: String,
  value: String
});

const skuSchema = new Schema({
  sku: Number,
  quantity: Number,
  size: Number
});

const styleSchema = new Schema({
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: Boolean,
  skus: [skuSchema]
});

const productSchema = new Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  features: [featureSchema],
  styles: [styleSchema]
});
