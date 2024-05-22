/*
 * Title: Product Interface
 * Description: interface for the product
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import { Document } from 'mongoose';
export interface TVariant {
  type: string;
  value: string;
}

export interface TInventory {
  quantity: number;
  inStock: boolean;
}
export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
}

export type TProduct = IProduct & Document;
