/*
 * Title: Product Zod Validation
 * Description: zod validation schema for the product module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */
import { z } from 'zod';

export const variantValidationSchema = z.object({
  type: z.string().min(1, { message: 'Type cannot be empty' }),
  value: z.string().min(1, { message: 'Value cannot be empty' }),
});

export const productValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }),
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  price: z.number().min(0, { message: 'Price cannot be negative' }),
  category: z.string().min(1, { message: 'Category cannot be empty' }),
  tags: z.array(z.string().min(1, { message: 'Each tag cannot be empty' })),
  variants: z.array(variantValidationSchema),
  inventory: z.object({
    quantity: z.number().min(0, { message: 'Quantity cannot be negative' }),
    inStock: z.boolean(),
  }),
});
