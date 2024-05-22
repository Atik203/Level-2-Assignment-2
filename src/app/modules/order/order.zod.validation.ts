import { z } from 'zod';

export const orderValidationSchemaZod = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  productId: z.string().nonempty({ message: 'Product ID is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be an integer greater than 0' }),
});
