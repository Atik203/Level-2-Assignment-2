/*
 * Title: Product Model
 * Description: mongoose Product model for the product module.
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
import { model, Schema } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

export const variantSchema = new Schema<TVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

export const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantSchema],
  inventory: inventorySchema,
});

export const Product = model<TProduct>('Product', productSchema);
