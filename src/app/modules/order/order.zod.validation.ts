/*
 * Title: Order Zod Validation
 * Description: zod validation schema for the order module
 * Author: Md. Atikur Rahaman
 * Date: 22-05-2024
 */

import { z } from 'zod';

export const orderValidationSchemaZod = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  productId: z.string().nonempty({ message: 'Product ID is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be an integer greater than 0' }),
});
